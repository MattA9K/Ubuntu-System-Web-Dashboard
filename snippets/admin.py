from django.contrib import admin
from snippets.models import Snippet

# Register your models here.
class SnippetAdmin(admin.ModelAdmin):
    list_display = ('title', 'language', 'owner', 'created')
    # fields = ('title', 'language', 'owner')
    # date_hierarchy = 'created'

admin.site.register(Snippet, SnippetAdmin)