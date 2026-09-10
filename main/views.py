import datetime

from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.utils import timezone

from .forms import AppointmentForm, ContactForm, TestimonialForm
from .models import (
    APPOINTMENT_SLOT_MINUTES,
    CLINIC_CLOSE_TIME,
    CLINIC_OPEN_TIME,
    Appointment,
    Case,
    ContactMessage,
    Dentist,
    Service,
    Testimonial,
)


def index(request):
    return render(request, 'index.html', {
        'services': Service.objects.all(),
        'dentists': Dentist.objects.all(),
        'cases': Case.objects.all(),
        'testimonials': Testimonial.objects.all(),
    })


def about(request):
    return render(request, 'about.html')


def services(request):
    return render(request, 'service.html', {'services': Service.objects.all()})


def cases(request):
    return render(request, 'cases.html', {'cases': Case.objects.all()})


def contact(request):
    success = False
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            success = True
            form = ContactForm()
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form, 'success': success})


def team(request):
    return render(request, 'team.html', {'dentists': Dentist.objects.all()})


def testimonial(request):
    if request.method == 'POST':
        form = TestimonialForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('testimonial')
    else:
        form = TestimonialForm()
    testimonials = Testimonial.objects.all().order_by('-created_at')
    return render(request, 'testimonial.html', {'form': form, 'testimonials': testimonials})


def appointment(request):
    services_qs = Service.objects.all()
    dentists_qs = Dentist.objects.all()

    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            appointment_obj = form.save()
            try:
                send_mail(
                    subject=f'New appointment request — {appointment_obj.name}',
                    message=(
                        f'Patient: {appointment_obj.name}\n'
                        f'Email: {appointment_obj.email}\n'
                        f'WhatsApp: {appointment_obj.phone}\n'
                        f'Service: {appointment_obj.service}\n'
                        f'Dentist: {appointment_obj.dentist}\n'
                        f'Date: {appointment_obj.appointment_date:%A, %d %B %Y}\n'
                        f'Time: {appointment_obj.appointment_time:%I:%M %p}\n'
                        f'Notes: {appointment_obj.notes or "—"}\n\n'
                        'Please open Django Admin and set this appointment to Confirmed or Cancelled.'
                    ),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CLINIC_ADMIN_EMAIL],
                    fail_silently=True,
                )
            except Exception:
                pass

            messages.success(
                request,
                'Appointment request received! The clinic will review it and send your confirmation by email and WhatsApp.'
            )
            return redirect('appointment')
    else:
        form = AppointmentForm()

    return render(request, 'appointment.html', {
        'form': form,
        'services': services_qs,
        'dentists': dentists_qs,
        'clinic_open': CLINIC_OPEN_TIME.strftime('%H:%M'),
        'clinic_close': CLINIC_CLOSE_TIME.strftime('%H:%M'),
        'slot_minutes': APPOINTMENT_SLOT_MINUTES,
        'today': timezone.localdate().isoformat(),
    })


def booked_slots(request):
    """Return booked slots for a selected date and dentist."""
    date_str = request.GET.get('date')
    dentist = request.GET.get('dentist')
    if not date_str or not dentist:
        return JsonResponse({'booked': []})

    try:
        appointment_date = datetime.date.fromisoformat(date_str)
    except ValueError:
        return JsonResponse({'booked': []})

    times = (
        Appointment.objects
        .filter(appointment_date=appointment_date, dentist=dentist)
        .exclude(status='Cancelled')
        .values_list('appointment_time', flat=True)
    )
    return JsonResponse({'booked': [t.strftime('%H:%M') for t in times]})
