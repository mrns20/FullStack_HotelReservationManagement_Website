# Generated by Django 5.1.3 on 2024-11-21 21:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_client_chk_password_client_is_staff_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='client',
            name='is_superuser',
        ),
    ]
