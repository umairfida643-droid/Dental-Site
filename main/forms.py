from django import forms
from .models import ContactMessage,Testimonial

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control border-0 bg-light px-4', 'placeholder': 'Your Name', 'style': 'height:55px;'}),
            'email': forms.EmailInput(attrs={'class': 'form-control border-0 bg-light px-4', 'placeholder': 'Your Email', 'style': 'height:55px;'}),
            'subject': forms.TextInput(attrs={'class': 'form-control border-0 bg-light px-4', 'placeholder': 'Subject', 'style': 'height:55px;'}),
            'message': forms.Textarea(attrs={'class': 'form-control border-0 bg-light px-4 py-3', 'placeholder': 'Message', 'rows': 5}),
        }
class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['name', 'review', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Your Name'}),
            'review': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Your Review', 'rows': 3}),
        }
import datetime
from django import forms
from django.utils import timezone
from .models import Appointment, CLINIC_OPEN_TIME, CLINIC_CLOSE_TIME, APPOINTMENT_SLOT_MINUTES


class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['service', 'dentist', 'name', 'email', 'phone', 'appointment_date', 'appointment_time', 'notes']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['phone'].required = True
        self.fields['phone'].widget.attrs.update({
            'placeholder': 'WhatsApp number (e.g. +92 300 1234567)',
            'autocomplete': 'tel',
            'inputmode': 'tel',
        })
        self.fields['notes'].widget.attrs.update({
            'placeholder': 'Optional: reason for visit, symptoms or special request',
            'rows': 3,
        })

    def clean_phone(self):
        phone = self.cleaned_data.get('phone', '').strip()
        digits = ''.join(ch for ch in phone if ch.isdigit())
        if len(digits) < 10 or len(digits) > 15:
            raise forms.ValidationError('Please enter a valid WhatsApp/mobile number with country code.')
        return phone

    def clean_appointment_date(self):
        appointment_date = self.cleaned_data['appointment_date']
        if appointment_date < timezone.localdate():
            raise forms.ValidationError("You can't book an appointment in the past. Please choose today or a future date.")
        return appointment_date

    def clean_appointment_time(self):
        appointment_time = self.cleaned_data['appointment_time']
        if not (CLINIC_OPEN_TIME <= appointment_time < CLINIC_CLOSE_TIME):
            raise forms.ValidationError(
                f"We're only open from {CLINIC_OPEN_TIME.strftime('%I:%M %p')} to "
                f"{CLINIC_CLOSE_TIME.strftime('%I:%M %p')}. Please pick a time within our clinic hours."
            )
        # Keep bookings aligned to the slot grid (e.g. every 15 minutes).
        total_minutes = appointment_time.hour * 60 + appointment_time.minute
        if total_minutes % APPOINTMENT_SLOT_MINUTES != 0:
            raise forms.ValidationError("Please select a valid appointment slot.")
        return appointment_time

    def clean(self):
        cleaned_data = super().clean()
        appointment_date = cleaned_data.get('appointment_date')
        appointment_time = cleaned_data.get('appointment_time')
        dentist = cleaned_data.get('dentist')

        if appointment_date and appointment_time and dentist:
            # Reject same date/time/dentist double-booking so two patients can't
            # be scheduled with the same dentist at the same time.
            conflict_qs = Appointment.objects.filter(
                appointment_date=appointment_date,
                appointment_time=appointment_time,
                dentist=dentist,
            ).exclude(status='Cancelled')

            if self.instance and self.instance.pk:
                conflict_qs = conflict_qs.exclude(pk=self.instance.pk)

            if conflict_qs.exists():
                raise forms.ValidationError(
                    "That time slot is already booked with this dentist. Please choose another time."
                )

        return cleaned_data