from django.db import models
from author.models import AuthorUser

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, blank=True, default='No title given')

class Post(models.Model):
    author_id = models.ForeignKey(AuthorUser, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    body = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField()

    # class Meta:
        # abstract = True

class Thread(Post):
    title = models.CharField(max_length=100, blank=True, default='No title given')

class Reply(Post):
    post = models.ForeignKey(Post, related_name='+', on_delete=models.CASCADE)