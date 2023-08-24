from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    tel = models.CharField(max_length=8)
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)