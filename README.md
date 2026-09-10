# Dental Clinic Django Website

## Local setup

```bash
python -m venv .venv
# Windows:
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open: http://127.0.0.1:8000/

Create an admin account:

```bash
python manage.py createsuperuser
```

Admin: http://127.0.0.1:8000/admin/

## Important production settings

Set these environment variables before hosting:

- `DJANGO_SECRET_KEY` = a long random secret
- `DJANGO_DEBUG=False`
- `DJANGO_ALLOWED_HOSTS=your-domain.com,www.your-domain.com`

Run:

```bash
python manage.py collectstatic
python manage.py check --deploy
```

Appointments are intentionally kept private: patients submit appointments through the website, while clinic staff manage them through Django Admin.

## Professional appointment notifications

The appointment system now collects a **WhatsApp/mobile number** and stores optional patient notes. When an admin changes an appointment from Pending to **Confirmed** or **Cancelled**, the system:

1. Sends the patient an email through Gmail SMTP.
2. Sends a WhatsApp Business Cloud API template message when Meta WhatsApp credentials are configured.
3. Records the WhatsApp notification time/error in Django Admin.
4. Provides an **Open WhatsApp chat** fallback link in the appointment admin page.
5. Sends the clinic an email when a new appointment request is submitted.

### WhatsApp setup

Automatic WhatsApp messages require a Meta WhatsApp Business/Cloud API setup and an approved message template. Create templates matching these variable positions:

`{{1}} patient name, {{2}} service, {{3}} dentist, {{4}} date, {{5}} time`

Then fill these values in `.env`:

```text
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_API_VERSION=v23.0
WHATSAPP_TEMPLATE_LANGUAGE=en_US
WHATSAPP_CONFIRM_TEMPLATE=dental_appointment_confirmed
WHATSAPP_CANCEL_TEMPLATE=dental_appointment_cancelled
```

For Gmail, use a Gmail **App Password**, not the normal account password:

```text
EMAIL_HOST_USER=your-clinic-email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
CLINIC_ADMIN_EMAIL=your-clinic-email@gmail.com
```

### Run after updating

```bash
python manage.py migrate
python manage.py runserver
```

The site uses a modern navy/teal clinical theme with responsive mobile layouts, touch-friendly appointment controls, live slot availability, improved admin appointment filtering, notification status tracking, and a WhatsApp contact shortcut.
