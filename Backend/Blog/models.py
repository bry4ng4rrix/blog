from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from django.db.models.signals import post_save
from datetime import time



# Create your models here.




class UserManager(BaseUserManager):
    def _create_user(self,username,email,password,is_active,is_staff,is_superuser,**extra_fields):
        now = timezone.now()
        if not username:
            raise ValueError('Username Vide')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email,is_active=is_active,is_staff=is_staff,is_superuser=is_superuser,date_joined=now,**extra_fields)
        user.set_password(password)
        user.save(using= self._db)
        return user

    def create_user(self,username,email,password, **extra_fields):
        return self._create_user(username, email, password,is_active=True,is_staff=False,is_superuser=False,**extra_fields)
    def create_superuser(self,username,email,password,**extra_fields):
        user = self._create_user(username,email,password,is_active=True,is_staff=True,is_superuser=True,**extra_fields)
        user.save(using=self.db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50 ,unique=True)
    email = models.EmailField(max_length=50 ,unique=True)
    first_name = models.CharField(max_length=50 ,unique=False)
    last_name = models.CharField(max_length=50 ,unique=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now()) 
    def __str__(self):
        return self.username
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name','last_name']


class blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    titre = models.CharField( max_length=50)
    description = models.CharField(max_length=250)
    date_post = models.DateField(auto_now_add=True)