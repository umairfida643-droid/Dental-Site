from django.db import models

# Create your models here.


class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='services/')
    
    def __str__(self):
        return self.title

class Case(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='cases/')
    
    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"
    

class Dentist(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    image = models.ImageField(upload_to='dentists/')
    bio = models.CharField(max_length=220, blank=True, default='')
    experience_years = models.PositiveIntegerField(default=0)
    twitter = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
    

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    review = models.TextField()
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

from django.db import models
import datetime

# Clinic operating hours and slot length used for the appointment booking filter.
CLINIC_OPEN_TIME = datetime.time(15, 0)   # 3:00 PM
CLINIC_CLOSE_TIME = datetime.time(23, 0)  # 11:00 PM
APPOINTMENT_SLOT_MINUTES = 15


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    service = models.CharField(max_length=100)
    dentist = models.CharField(max_length=100, default='Unknown')

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, default='')
    notes = models.TextField(blank=True, default='')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    whatsapp_notification_sent_at = models.DateTimeField(blank=True, null=True)
    whatsapp_notification_error = models.TextField(blank=True, default='')

    class Meta:
        indexes = [
            models.Index(fields=['appointment_date', 'appointment_time', 'dentist']),
        ]

    def __str__(self):
        return f"{self.name} - {self.service} ({self.status})"