from django.contrib import admin
from forum.models import Thread, Category, Reply
# Register your models here.



class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'pub_date')

class ThreadAdmin(admin.ModelAdmin):
    list_display = ('title', 'author_id', 'category', 'pub_date')

class ReplyAdmin(admin.ModelAdmin):
    list_display = ('post', 'author_id', 'category', 'pub_date')


admin.site.register(Thread, ThreadAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Reply, ReplyAdmin)