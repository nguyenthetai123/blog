from django.db import models

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=40)
    email = models.EmailField(max_length=40)
    message = models.TextField(max_length=400)

    def __str__(self):
        return (self.name)