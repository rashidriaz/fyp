# Generated by Django 3.2.18 on 2023-04-08 04:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_auto_20230407_1325'),
    ]

    operations = [
        migrations.CreateModel(
            name='CampaignSample',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('brandmanager', models.CharField(max_length=100)),
                ('cost', models.IntegerField()),
            ],
        ),
    ]
