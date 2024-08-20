from django.db import models

# Create your models here.
from django.db import models

class SchoolProject(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='school_projects/')

class HackathonProject(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='hackathon_projects/')