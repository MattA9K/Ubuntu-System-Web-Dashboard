from django.db import models

# Create your models here.

COLORS = (
    ('Red', 'md-red-200-bg'),
    ('Pink', 'md-pink-200-bg'),
    ('Purple', 'md-purple-200-bg'),
    ('Deep Purple', 'md-deep-purple-200-bg'),
    ('Indigo', 'md-indigo-200-bg'),
    ('Blue', 'md-blue-200-bg'),
    ('Light-Blue', 'md-light-blue-200-bg'),
    ('Cyan', 'md-cyan-200-bg'),
    ('Teal', 'md-teal-200-bg'),
    ('Green', 'md-green-200-bg'),
    ('Light-Green', 'md-light-green-200-bg'),
    ('Lime', 'md-lime-200-bg'),
    ('Yellow', 'md-yellow-200-bg'),
    ('Amber', 'md-amber-200-bg'),
    ('Orange', 'md-orange-200-bg'),
    ('Deep-Orange', 'md-deep-orange-200-bg'),
    ('Brown', 'md-brown-200-bg'),
    ('Grey', 'md-grey-200-bg'),
    ('Blue-Grey', 'md-blue-grey-200-bg'),
)

class Note(models.Model):
    title = models.CharField(max_length=50, blank=True, default='New Note')
    description = models.CharField(max_length=200, blank=True, default='md-yellow-200-bg')
    archive = models.BooleanField(default=False)
    image = models.ImageField(upload_to='static/', blank=True)
    color = models.CharField(choices=COLORS, max_length=50, blank='false', default='')
    time = models.DateTimeField(auto_now_add=True)
    reminder = models.DateTimeField(auto_now_add=False, blank=True)

    def __str__(self):
        return self.title

class ChecklistItem(models.Model):
    checked = models.BooleanField(default=False)
    title = models.CharField(max_length=200, blank=True, default='')
    note = models.ForeignKey('Note', related_name='checklist', on_delete=models.CASCADE)

    def __str__(self):
        return self.title