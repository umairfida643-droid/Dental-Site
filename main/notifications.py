import json
import logging
from urllib import request as urlrequest
from urllib.error import HTTPError, URLError

from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone

logger = logging.getLogger(__name__)


def appointment_details(appt):
    date_str = appt.appointment_date.strftime('%A, %d %B %Y')
    time_str = appt.appointment_time.strftime('%I:%M %p')
    return date_str, time_str


def send_appointment_email(appt, status):
    date_str, time_str = appointment_details(appt)

    if status == 'Confirmed':
        subject = 'Your Dental Bites Appointment is Confirmed'
        message = (
            f'Hi {appt.name},\n\n'
            'Good news! Your Dental Bites appointment has been confirmed.\n\n'
            'Appointment Details\n'
            '----------------------------\n'
            f'Service: {appt.service}\n'
            f'Dentist: {appt.dentist}\n'
            f'Date: {date_str}\n'
            f'Time: {time_str}\n\n'
            'Please arrive 10 minutes before your appointment.\n\n'
            'If you need to reschedule, please contact the clinic.\n\n'
            'Thank you for choosing Dental Bites.\n'
            '— Dental Bites'
        )
    elif status == 'Cancelled':
        subject = 'Your Dental Bites Appointment has been Cancelled'
        message = (
            f'Hi {appt.name},\n\n'
            'We are sorry to inform you that your Dental Bites appointment has been cancelled.\n\n'
            'Appointment Details\n'
            '----------------------------\n'
            f'Service: {appt.service}\n'
            f'Dentist: {appt.dentist}\n'
            f'Date: {date_str}\n'
            f'Time: {time_str}\n\n'
            'Please contact the clinic if you would like to choose another time.\n\n'
            '— Dental Bites'
        )
    else:
        return False

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[appt.email],
        fail_silently=False,
    )
    return True


def _normalise_phone(phone):
    if not phone:
        return ''
    digits = ''.join(ch for ch in phone if ch.isdigit())
    if digits.startswith('00'):
        digits = digits[2:]
    # Pakistan-friendly convenience: 0300... -> 92300...
    if digits.startswith('0') and len(digits) == 11:
        digits = '92' + digits[1:]
    return digits


def whatsapp_click_to_chat_url(appt, status='Confirmed'):
    phone = _normalise_phone(appt.phone)
    if not phone:
        return ''
    date_str, time_str = appointment_details(appt)
    if status == 'Confirmed':
        text = (
            f'Hello {appt.name}, your Dental Bites appointment is confirmed. '
            f'Service: {appt.service}. Dentist: {appt.dentist}. '
            f'Date: {date_str}. Time: {time_str}. Please arrive 10 minutes early. '
            'Thank you!'
        )
    else:
        text = (
            f'Hello {appt.name}, your Dental Bites appointment on {date_str} at {time_str} '
            'has been cancelled. Please contact us to reschedule.'
        )
    from urllib.parse import quote
    return f'https://wa.me/{phone}?text={quote(text)}'


def send_whatsapp_template(appt, template_name, status='Confirmed'):
    """Send a WhatsApp Business Cloud API template message.

    Meta requires an approved template for business-initiated messages outside
    the 24-hour customer-service window. If API credentials/template are not
    configured, return False so the admin can use the generated click-to-chat link.
    """
    token = getattr(settings, 'WHATSAPP_ACCESS_TOKEN', '')
    phone_number_id = getattr(settings, 'WHATSAPP_PHONE_NUMBER_ID', '')
    api_version = getattr(settings, 'WHATSAPP_API_VERSION', 'v23.0')
    language = getattr(settings, 'WHATSAPP_TEMPLATE_LANGUAGE', 'en_US')

    phone = _normalise_phone(appt.phone)
    if not all([token, phone_number_id, template_name, phone]):
        return False, 'WhatsApp Cloud API is not fully configured or the patient phone number is missing.'

    date_str, time_str = appointment_details(appt)
    status_label = 'confirmed' if status == 'Confirmed' else 'cancelled'
    # Template expected variables: {{1}} name, {{2}} service, {{3}} dentist,
    # {{4}} date, {{5}} time. Configure the same variable order in Meta.
    payload = {
        'messaging_product': 'whatsapp',
        'to': phone,
        'type': 'template',
        'template': {
            'name': template_name,
            'language': {'code': language},
            'components': [
                {
                    'type': 'body',
                    'parameters': [
                        {'type': 'text', 'text': appt.name},
                        {'type': 'text', 'text': str(appt.service)},
                        {'type': 'text', 'text': str(appt.dentist)},
                        {'type': 'text', 'text': date_str},
                        {'type': 'text', 'text': time_str},
                    ],
                }
            ],
        },
    }

    endpoint = f'https://graph.facebook.com/{api_version}/{phone_number_id}/messages'
    data = json.dumps(payload).encode('utf-8')
    req = urlrequest.Request(
        endpoint,
        data=data,
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    try:
        with urlrequest.urlopen(req, timeout=15) as response:
            if 200 <= response.status < 300:
                return True, 'WhatsApp notification sent successfully.'
            return False, f'WhatsApp API returned HTTP {response.status}.'
    except HTTPError as exc:
        body = exc.read().decode('utf-8', errors='replace')
        logger.exception('WhatsApp API error')
        return False, f'WhatsApp API error: {body[:300]}'
    except URLError as exc:
        logger.exception('WhatsApp network error')
        return False, f'WhatsApp connection error: {exc.reason}'
    except Exception as exc:
        logger.exception('Unexpected WhatsApp error')
        return False, f'WhatsApp error: {exc}'


def notify_patient_status_change(appt, status):
    """Send email + WhatsApp and return human-readable results."""
    results = []

    try:
        send_appointment_email(appt, status)
        results.append('email sent')
    except Exception as exc:
        logger.exception('Appointment email failed')
        results.append(f'email failed: {exc}')

    template = (
        getattr(settings, 'WHATSAPP_CONFIRM_TEMPLATE', '')
        if status == 'Confirmed'
        else getattr(settings, 'WHATSAPP_CANCEL_TEMPLATE', '')
    )
    ok, detail = send_whatsapp_template(appt, template, status)
    if ok:
        appt.whatsapp_notification_sent_at = timezone.now()
        appt.whatsapp_notification_error = ''
        appt.save(update_fields=['whatsapp_notification_sent_at', 'whatsapp_notification_error'])
        results.append('WhatsApp sent')
    else:
        appt.whatsapp_notification_error = detail
        appt.save(update_fields=['whatsapp_notification_error'])
        results.append(detail)

    return results
