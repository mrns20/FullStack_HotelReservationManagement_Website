# Generated by Django 5.1.3 on 2024-11-24 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_client_date_joined_client_first_name_client_groups_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='client',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='client',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='client',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='client',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='client',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='client',
            name='last_login',
        ),
        migrations.RemoveField(
            model_name='client',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='client',
            name='user_permissions',
        ),
    ]
