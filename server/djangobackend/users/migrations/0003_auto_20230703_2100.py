# Generated by Django 3.2.19 on 2023-07-03 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20230701_1255'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='influencer',
            name='user',
        ),
        migrations.AddField(
            model_name='influencer',
            name='email',
            field=models.EmailField(blank=True, default='', max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='name',
            field=models.CharField(blank=True, default='', max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='username',
            field=models.CharField(default='', max_length=20),
        ),
    ]
