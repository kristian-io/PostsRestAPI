from django.db import models


class Post(models.Model):
    userId = models.IntegerField()
    title = models.TextField()
    body = models.TextField()
