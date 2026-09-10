# Generated manually to add an index supporting fast double-booking checks.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_remove_appointment_created_at_and_more'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='appointment',
            index=models.Index(fields=['appointment_date', 'appointment_time', 'dentist'], name='main_appoi_appoin_1a2b3c_idx'),
        ),
    ]
