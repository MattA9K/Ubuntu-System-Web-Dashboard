# TODO_APP

from rest_framework import serializers
from todo.models import ToDoItem, ToDoTag





class ToDoTagSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, allow_blank=True, max_length=30)
    label = serializers.CharField(required=False, allow_blank=True, max_length=30)
    color = serializers.CharField(required=False, allow_blank=True, max_length=30)
    parent = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    def __str__(self):
        return self.name

    class Meta:
        model = ToDoItem
        fields = ('name','label','color','parent')


class ToDoItemSerializer(serializers.Serializer):
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    notes = serializers.CharField(required=False, allow_blank=True, max_length=100)
    start_date = serializers.DateTimeField()
    due_date = serializers.DateTimeField()
    completed = serializers.BooleanField()
    starred = serializers.BooleanField()
    important = serializers.BooleanField()
    deleted = serializers.BooleanField()
    tags = ToDoTagSerializer(many=True, read_only=True) #serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    def __str__(self):
        return self.title

    class Meta:
        model = ToDoItem
        fields = ('title','notes','start_date','due_date','completed','starred','important','deleted','tags')