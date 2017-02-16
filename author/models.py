# AUTHOR
from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class AuthorUser(models.Model):
    auth_user_id = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    date_registered = models.DateTimeField(auto_now_add=True)