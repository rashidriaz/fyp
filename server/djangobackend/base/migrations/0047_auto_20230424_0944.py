# Generated by Django 3.2.18 on 2023-04-24 04:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0046_auto_20230424_0943'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newcampaign',
            name='created',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='newcampaign',
            name='updated',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]