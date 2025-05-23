from django.db import models

# Create your models here.
class RegistroTareas(models.Model):
    codigo = models.IntegerField(blank=True, default=0)
    nombre = models.CharField(blank=True, max_length=200)
    descripcion = models.CharField(blank=True, max_length=400)

 