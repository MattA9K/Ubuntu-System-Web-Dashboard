# NOTES
from rest_framework import serializers
from cininotes.models import Note, ChecklistItem


class ChecklistItemSerializer(serializers.Serializer):
    checked = serializers.BooleanField(required=False)
    title = serializers.CharField(max_length=80)
    note = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = ChecklistItem
        fields = ('title','checked','note')


class NoteSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=250)
    archive = serializers.BooleanField(required=False)
    image = serializers.ImageField(use_url=True, allow_empty_file=True)
    color = serializers.CharField(max_length=50)
    time = serializers.DateTimeField()
    reminder = serializers.DateTimeField()
    checklist = ChecklistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = ('title','description','archive','image','color','time','reminder')

