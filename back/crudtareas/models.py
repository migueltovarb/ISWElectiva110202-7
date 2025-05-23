from django.db import models

# Create your models here.
class RegistroTareas(models.Model):
    codigo = models.IntegerField(blank=True, default=0)
    nombre = models.CharField(blank=True, max_length=200)
    descripcion = models.CharField(blank=True, max_length=400)
    
    def __str__(self):
        return self.nombre 
    
class ListaTareas(models.Model):
    codigo = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE, related_name="codigo_tarea")
    nombre_tarea = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE, related_name="nombre_tarea")
    descripcion_tarea = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE, related_name="descripcion_tarea")


class ActualizacionTareas(models.Model):
    tarea = models.ForeignKey(RegistroTareas,on_delete=models.CASCADE,related_name="actualizaciones")
    nombre_actualizado = models.CharField(max_length=200, blank=True)
    descripcion_actualizado = models.CharField(max_length=400,blank=True)
    
class EliminarTareas(models.Model):
    tarea = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE,related_name="eliminaciones")
    fecha_eliminacion = models.DateField(auto_now_add=True)
    