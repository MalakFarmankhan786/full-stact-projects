from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username=None
    email = models.EmailField(unique=True)
    resetToken = models.CharField(max_length=1000,blank=True,null=True)
    resetTokenExpiration = models.CharField(max_length=1000,blank=True,null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
