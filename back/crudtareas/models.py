from django.db import models

# Create your models here.
class RegistroTareas(models.Model):
    codigo = models.IntegerField(blank=True, default=0)
    nombre = models.CharField(blank=True, max_length=200)
    descripcion = models.CharField(blank=True, max_length=400)
    estado = models.CharField(blank=True, max_length=30)
    def __str__(self):
        return "Tarea registrada:{self.nombre}" 
    
class ListaTareas(models.Model):
    codigo = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE, related_name="codigo_tarea")
    nombre_tarea = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE, related_name="nombre_tarea")
    descripcion_tarea = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE, related_name="descripcion_tarea")
    estado_tarea = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE, related_name="estado_tarea")
    def __str__(self):
        return "Lista de Tareas Obtenidas:{self.codigo}"
    
class ActualizacionTareas(models.Model):
    tarea = models.ForeignKey(RegistroTareas,on_delete=models.CASCADE,related_name="actualizaciones")
    codigo_actualizado = models.IntegerField(blank=True,default=0)
    nombre_actualizado = models.CharField(max_length=200, blank=True)
    descripcion_actualizado = models.CharField(max_length=400,blank=True)
    estado_actualizado = models.CharField(max_length=30,blank=True)
    
    def __str__(self):
        return "Tarea Actualizada:{self.tarea}"
    
class EliminarTareas(models.Model):
    tarea = models.ForeignKey(RegistroTareas, on_delete=models.CASCADE,related_name="eliminaciones")
    motivo = models.CharField(blank=True)
    
    def __str__(self):
        return "Tarea eliminada:{self.tarea}"
    
    
