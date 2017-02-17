from django.contrib import admin
from cininotes.models import Note, ChecklistItem
# Register your models here.



class NoteAdmin(admin.ModelAdmin):
    list_display = ('title','archive','image','color','time')


class ChecklistItemAdmin(admin.ModelAdmin):
    list_display = ('checked','title','note')


admin.site.register(Note, NoteAdmin)
admin.site.register(ChecklistItem, ChecklistItemAdmin)


"""
class Note(models.Model):
    title = models.CharField(max_length=50, blank=True, default='New Note')
    description = models.CharField(max_length=200, blank=True, default='md-yellow-200-bg')
    archive = models.BooleanField(default=False)
    image = models.ImageField(upload_to='static/', blank=True)
    color = models.CharField(choices=COLORS, max_length=50, blank='false', default='')
    time = models.DateTimeField(auto_now_add=True)
    reminder = models.DateTimeField(auto_now_add=False, blank=True)

class ChecklistItem(models.Model):
    checked = models.BooleanField(default=False)
    title = models.CharField(max_length=200, blank=True, default='')
    note = models.ForeignKey('Note', related_name='checklist', on_delete=models.CASCADE)
"""