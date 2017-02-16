from django.contrib import admin
from author.models import AuthorUser

# Register your models here.
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('date_registered', 'auth_user_id')

admin.site.register(AuthorUser, AuthorAdmin)