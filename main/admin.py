from django.contrib import admin
from django.utils.html import format_html
from .models import Service, Case, ContactMessage, Dentist, Testimonial, Appointment
from .notifications import notify_patient_status_change, whatsapp_click_to_chat_url


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'short_description', 'image')
    search_fields = ('title', 'description')
    list_per_page = 20

    @admin.display(description='Description')
    def short_description(self, obj):
        return obj.description[:70] + ('…' if len(obj.description) > 70 else '')


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ('title', 'short_description', 'image')
    search_fields = ('title', 'description')

    @admin.display(description='Description')
    def short_description(self, obj):
        return obj.description[:70] + ('…' if len(obj.description) > 70 else '')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('created_at',)
    readonly_fields = ('created_at',)


@admin.register(Dentist)
class DentistAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialization', 'experience_years', 'twitter', 'facebook', 'linkedin', 'instagram')
    search_fields = ('name', 'specialization', 'bio')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name', 'review')
    list_filter = ('created_at',)
    readonly_fields = ('created_at',)


@admin.action(description='Mark selected appointments as Confirmed + notify patient')
def confirm_appointments(modeladmin, request, queryset):
    count = 0
    for obj in queryset.exclude(status='Confirmed'):
        obj.status = 'Confirmed'
        obj.save(update_fields=['status'])
        notify_patient_status_change(obj, 'Confirmed')
        count += 1
    modeladmin.message_user(request, f'{count} appointment(s) confirmed and notification workflow started.')


@admin.action(description='Mark selected appointments as Cancelled + notify patient')
def cancel_appointments(modeladmin, request, queryset):
    count = 0
    for obj in queryset.exclude(status='Cancelled'):
        obj.status = 'Cancelled'
        obj.save(update_fields=['status'])
        notify_patient_status_change(obj, 'Cancelled')
        count += 1
    modeladmin.message_user(request, f'{count} appointment(s) cancelled and notification workflow started.')


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'phone_display', 'service', 'dentist', 'appointment_date',
        'appointment_time', 'status', 'notification_status',
    )
    list_filter = ('status', 'dentist', 'service', 'appointment_date')
    search_fields = ('name', 'email', 'phone', 'service', 'dentist', 'notes')
    ordering = ('-appointment_date', '-appointment_time')
    list_editable = ('status',)
    date_hierarchy = 'appointment_date'
    actions = (confirm_appointments, cancel_appointments)
    readonly_fields = ('created_at', 'whatsapp_notification_sent_at', 'whatsapp_notification_error', 'whatsapp_link')
    fieldsets = (
        ('Patient', {'fields': ('name', 'email', 'phone', 'notes')}),
        ('Appointment', {'fields': ('service', 'dentist', 'appointment_date', 'appointment_time', 'status')}),
        ('Notifications', {'fields': ('whatsapp_link', 'whatsapp_notification_sent_at', 'whatsapp_notification_error', 'created_at')}),
    )

    @admin.display(description='WhatsApp')
    def phone_display(self, obj):
        if not obj.phone:
            return '—'
        url = whatsapp_click_to_chat_url(obj)
        return format_html('<a href="{}" target="_blank" rel="noopener">{}</a>', url, obj.phone) if url else obj.phone

    @admin.display(description='Notifications')
    def notification_status(self, obj):
        if obj.whatsapp_notification_sent_at:
            return format_html('<span style="color:#16803a;font-weight:600">✓ WhatsApp sent</span>')
        if obj.whatsapp_notification_error:
            return format_html('<span style="color:#b42318;font-weight:600">⚠ WhatsApp pending</span>')
        return '—'

    @admin.display(description='Patient WhatsApp link')
    def whatsapp_link(self, obj):
        url = whatsapp_click_to_chat_url(obj)
        if not url:
            return 'Add a valid patient WhatsApp number first.'
        return format_html('<a href="{}" target="_blank" rel="noopener" style="font-weight:700">Open WhatsApp chat →</a>', url)

    def save_model(self, request, obj, form, change):
        old_status = None
        if change:
            try:
                old_status = Appointment.objects.get(pk=obj.pk).status
            except Appointment.DoesNotExist:
                pass

        super().save_model(request, obj, form, change)

        if change and old_status != obj.status and obj.status in {'Confirmed', 'Cancelled'}:
            results = notify_patient_status_change(obj, obj.status)
            self.message_user(request, f'Appointment updated: {"; ".join(results)}.')
