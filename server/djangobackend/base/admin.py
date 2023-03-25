from django.contrib import admin
from .forms import InfluencerForm
# Register your models here.
from .models import Room, Topic, Campaign, Message, Influencer, Brand

admin.site.register(Room)
admin.site.register(Topic)
admin.site.register(Message)
admin.site.register(Campaign)
admin.site.register(Influencer)
admin.site.register(Brand)