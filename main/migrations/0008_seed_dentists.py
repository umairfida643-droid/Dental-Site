from django.db import migrations


def seed_dentists(apps, schema_editor):
    Dentist = apps.get_model('main', 'Dentist')

    # Enrich the existing dentists with a short bio + years of experience,
    # and correct Dr. Noor's photo to her own uploaded image.
    updates = {
        'Dr. Hafeez Ur Rehman': {
            'bio': 'Specialises in dental implants and root canal treatment, '
                   'combining precision with a gentle, patient-first approach.',
            'experience_years': 10,
        },
        'Dr. Noor Fatima Khan': {
            'bio': 'Focused on cosmetic and preventive dentistry, helping patients '
                   'achieve healthy, confident smiles with modern techniques.',
            'experience_years': 7,
            'image': 'dentists/noor.jpg',
        },
    }
    for name, fields in updates.items():
        Dentist.objects.filter(name=name).update(**fields)

    # Add a couple of additional team members so the Dentist page reflects a
    # fuller clinic team. These are placeholders — please edit their details,
    # photos, and credentials via Django Admin to match your real staff.
    sample_dentists = [
        {
            'name': 'Dr. Ayesha Malik',
            'specialization': 'General & Family Dentistry',
            'image': 'dentists/team-3.jpg',
            'bio': 'Provides comprehensive family dental care, from routine '
                   'checkups to fillings, for patients of all ages.',
            'experience_years': 6,
        },
        {
            'name': 'Dr. Bilal Ahmed',
            'specialization': 'Orthodontics & Aligners',
            'image': 'dentists/team-4.jpg',
            'bio': 'Helps patients straighten their smile with braces and clear '
                   'aligners, tailored to each patient\'s bite and goals.',
            'experience_years': 8,
        },
    ]
    for data in sample_dentists:
        Dentist.objects.get_or_create(name=data['name'], defaults=data)


def noop_reverse(apps, schema_editor):
    # Data seed is intentionally left in place on rollback.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_dentist_bio_dentist_experience_years'),
    ]

    operations = [
        migrations.RunPython(seed_dentists, noop_reverse),
    ]
