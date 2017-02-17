from django.contrib import admin
from todo.models import ToDoItem, ToDoTag
# Register your models here.


class ToDoItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'due_date', 'completed', 'starred', 'important', 'deleted')

class ToDoTagAdmin(admin.ModelAdmin):
    list_display = ('name', 'label', 'color')



admin.site.register(ToDoItem, ToDoItemAdmin)
admin.site.register(ToDoTag, ToDoTagAdmin)
