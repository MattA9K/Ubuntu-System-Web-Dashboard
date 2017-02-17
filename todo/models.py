# TODO_APP
from django.db import models


COLOR_CHOICES = (
    ('c1', '#388E3C'),
    ('c2', '#FF9800'),
    ('c3', '#F44336'),
    ('c4', '#9C27B0'),
    ('c5', '#0091EA'),
    ('c6', '#F44336'),
)

LABEL_CHOICES = (
    ('issue', 'Issue'),
    ('frontend', 'Frontend'),
    ('api', 'API'),
    ('backend', 'Backend'),
    ('mobile', 'Mobile'),
)
# Create your models here.

class ToDoItem(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    notes = models.TextField()
    start_date = models.DateTimeField(auto_now_add=False, blank=True)
    due_date = models.DateTimeField(auto_now_add=False, blank=True)
    completed = models.BooleanField(default=False)
    starred = models.BooleanField(default=False)
    important = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)


class ToDoTag(models.Model):
    name = models.CharField(max_length=100, blank=True, default='untitled')
    label = models.CharField(choices=COLOR_CHOICES, default='#0091EA', max_length=30)
    color = models.CharField(choices=LABEL_CHOICES, default='Backend', max_length=30)
    parent = models.ForeignKey('ToDoItem', related_name='tags', on_delete=models.CASCADE)