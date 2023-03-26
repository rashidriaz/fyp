# Generated by Django 4.1.7 on 2023-03-26 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_admin_admin_username_pragency_pragency_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='influencer',
            name='influencerCampaignCount',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='influencerChildrenAge',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='influencerChildrenCount',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='influencerFollowerCount',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='influencerFollowingCount',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='influencerInfluencerPostCost',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='influencerPostCount',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='influencerStoryCost',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='influencer',
            name='influencerStoryCount',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
