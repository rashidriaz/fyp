# Generated by Django 3.2.18 on 2023-05-22 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0107_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='user', max_length=255, unique=True),
        ),
    ]
