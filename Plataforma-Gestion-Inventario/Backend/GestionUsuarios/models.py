from django.db import models

# Create your models here.
class RolUsuario(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
    
class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    rol = models.ForeignKey(RolUsuario, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.nombre
    