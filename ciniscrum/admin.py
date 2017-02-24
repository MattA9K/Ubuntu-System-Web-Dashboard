from django.contrib import admin
from ciniscrum.models import ScrumBoard, ScrumList, ScrumCard, ScrumMember, ScrumLabel, ScrumSettings

# Register your models here.
class ScrumBoardAdmin(admin.ModelAdmin):
    list_display = ('name', 'uri', 'settings')

class ScrumListAdmin(admin.ModelAdmin):
    list_display = ('name', 'board_pk')

class ScrumCardAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'subscribed', 'check_items', 'check_items_checked', 'due', 'board_pk')

class ScrumMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'avatar', 'board_pk')

class ScrumLabelAdmin(admin.ModelAdmin):
    list_display = ('task_id', 'name', 'color', 'board_pk')

class ScrumSettingsAdmin(admin.ModelAdmin):
    list_display = ('color', 'card_cover_images', 'subscribed')


admin.site.register(ScrumBoard, ScrumBoardAdmin)
admin.site.register(ScrumList, ScrumListAdmin)
admin.site.register(ScrumCard, ScrumCardAdmin)
admin.site.register(ScrumMember, ScrumMemberAdmin)
admin.site.register(ScrumLabel, ScrumLabelAdmin)
admin.site.register(ScrumSettings, ScrumSettingsAdmin)
