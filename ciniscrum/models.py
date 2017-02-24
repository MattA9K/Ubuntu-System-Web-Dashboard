from django.db import models

# Create your models here.


# Board
# List
# Card
# Attachment
# CheckList
# CheckItem
# Comment
# Activity
# Member
# Label




class ScrumSettings(models.Model):
    color = models.CharField(max_length=50, blank=False, default='blue-grey')
    card_cover_images = models.BooleanField(default=False)
    subscribed = models.BooleanField(default=False)

    def __str__(self):
        return self.color


class ScrumLabel(models.Model):
    task_id = models.CharField(max_length=50, blank=True, default='New Note')
    name = models.CharField(max_length=50, blank=True, default='New Note')
    color = models.CharField(max_length=50, blank=True, default='New Note')
    board_pk = models.ForeignKey('ScrumBoard', related_name='labels', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ScrumMember(models.Model):
    name = models.CharField(max_length=50, blank=True, default='New Card')
    avatar = models.CharField(max_length=50, blank=True, default='New Card')
    board_pk = models.ForeignKey('ScrumBoard', related_name='members', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ScrumCard(models.Model):
    name = models.CharField(max_length=50, blank=True, default='New Card')
    description = models.CharField(max_length=250, blank=True, default='No description given.')
    subscribed = models.BooleanField(default=True)
    check_items = models.IntegerField()
    check_items_checked = models.IntegerField()
    due = models.DateTimeField(blank=True)
    board_pk = models.ForeignKey('ScrumBoard', related_name='cards', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ScrumList(models.Model):
    board_pk = models.ForeignKey('ScrumBoard', related_name='lists', on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False, default='Django Application')

    def __str__(self):
        return self.name

class ScrumBoard(models.Model):
    name = models.CharField(max_length=50, blank=True, default='New Note')
    uri = models.CharField(max_length=50, blank=True, default='New Note')
    settings = models.ForeignKey('ScrumSettings', related_name='board', on_delete=models.CASCADE)

    def __str__(self):
        return self.name