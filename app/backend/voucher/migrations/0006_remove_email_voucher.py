# Generated by Django 3.1.2 on 2021-04-11 15:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('voucher', '0005_auto_20210409_2130'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='email',
            name='voucher',
        ),
    ]
