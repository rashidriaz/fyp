from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from .manager import CustomUserManager
from django.utils.timezone import now
import datetime
import uuid

# Create your models here.
 
class User(AbstractBaseUser, PermissionsMixin):
    # Admin = 1
    # PRAgency = 2
    # BrandManager = 3

    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('PRAgency', 'PRAgency'),
        ('BrandManager', 'BrandManager')
    )
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'


  # Roles created here
    uid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4, verbose_name='Public Identifier')
    username = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    role = models.CharField(choices=ROLE_CHOICES, max_length=30, blank=True, null=True)
    date_joined = models.DateField(default=now, blank=True, null=True)
    is_active = models.BooleanField(default=True, blank=True, null=True)
    is_staff = models.BooleanField(default=True, blank=True, null=True)
    is_superuser = models.BooleanField(default=True, blank=True, null=True)
    is_deleted = models.BooleanField(default=False, blank=True, null=True)
    created_date = models.DateField(default=now, blank=True, null=True)
    modified_date = models.DateField(default=now, blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def _str_(self):
            return self.username

# class User(AbstractBaseUser, PermissionsMixin):
#     class Meta:
#         verbose_name = 'user'
#         verbose_name_plural = 'users'


#   # Roles created here
#     uid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4, verbose_name='Public Identifier')
#     username = models.CharField(max_length=30, blank=True, null=True)
#     password = models.CharField(max_length=30, blank=True, null=True)
#     email = models.EmailField(unique=True)
#     name = models.CharField(max_length=30, blank=True, null=True)
#     role = models.ForeignKey(Role, max_length=30, blank=True, null=True, on_delete=models.CASCADE)
#     date_joined = models.DateField(default=now, blank=True, null=True)
#     is_active = models.BooleanField(default=True, blank=True, null=True)
#     is_staff = models.BooleanField(default=True, blank=True, null=True)
#     is_superuser = models.BooleanField(default=True, blank=True, null=True)
#     is_deleted = models.BooleanField(default=False, blank=True, null=True)
#     created_date = models.DateField(default=now, blank=True, null=True)
#     modified_date = models.DateField(default=now, blank=True, null=True)
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

#     objects = CustomUserManager()

#     def __str__(self):
#             return self.username
    
    # class Role(models.Model):
    # roles = [
    #     ('Admin', 'Admin'),
    #     ('PRAgency', 'PRAgency'),
    #     ('BrandManager', 'BrandManager'), 
    # ]
    # name = models.CharField(max_length=200, choices=roles)

    # def __str__(self):
    #     return str(self.name)
   
  
# from django.db import models
# from django.contrib.auth.models import AbstractUser, Group, Permission

# # Create your models here.
# class User(AbstractUser):
#     name = models.CharField(max_length=255)
#     email = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     username = models.CharField(max_length=255)

#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = []
#     groups = models.ManyToManyField(Group, related_name='admin_groups')
#     user_permissions = models.ManyToManyField(Permission, related_name='admin_user_permissions')
    