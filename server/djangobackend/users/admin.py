from django.contrib import admin
from .models import UserAccount, InvitedUsers

# Register your models here.
admin.site.register(UserAccount)
admin.site.register(InvitedUsers)

