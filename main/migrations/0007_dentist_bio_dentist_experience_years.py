# Generated manually to add professional bio/experience fields to Dentist.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_appointment_main_appoi_appoin_1a2b3c_idx'),
    ]

    operations = [
        migrations.AddField(
            model_name='dentist',
            name='bio',
            field=models.CharField(blank=True, default='', max_length=220),
        ),
        migrations.AddField(
            model_name='dentist',
            name='experience_years',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
