# Generated by Django 3.1 on 2021-03-25 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voucher', '0010_auto_20210322_1505'),
    ]

    operations = [
        migrations.AddField(
            model_name='voucher',
            name='email_list',
            field=models.FileField(blank=True, null=True, upload_to='emails'),
        ),
    ]
