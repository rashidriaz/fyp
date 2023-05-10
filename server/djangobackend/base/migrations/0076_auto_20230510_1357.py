# Generated by Django 3.2.18 on 2023-05-10 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0075_auto_20230510_1354'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Fashion', 'Fashion'), ('Music', 'Music'), ('Food', 'Food'), ('Health', 'Health'), ('Gaming', 'Gaming'), ('Dance', 'Dance'), ('Entertainment', 'Entertainment'), ('Family', 'Family'), ('Kids', 'Kids'), ('Other', 'Other')], max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name='influencer',
            name='interests',
        ),
        migrations.AddField(
            model_name='influencer',
            name='interests',
            field=models.ManyToManyField(default='Other', to='base.Interest'),
        ),
    ]
