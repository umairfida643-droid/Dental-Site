from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('main', '0009_rename_main_appoi_appoin_1a2b3c_idx_main_appoin_appoint_3054b0_idx'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=30),
        ),
        migrations.AddField(
            model_name='appointment',
            name='notes',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='appointment',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='whatsapp_notification_sent_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='whatsapp_notification_error',
            field=models.TextField(blank=True, default=''),
        ),
    ]
