from django.db import models
from GestionUsuarios.models import Usuario
# Create your models here.

class TipoInforme(models.Model):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre

class EstadoOrden(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
    
class Informe(models.Model):
    tipo = models.ForeignKey(TipoInforme, on_delete=models.CASCADE)
    generado_por = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    fecha_generacion = models.DateTimeField(auto_now_add=True)
    estado = models.ForeignKey(EstadoOrden, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"{self.tipo} - {self.fecha_generacion.strftime('%Y-%m-%d')}"
    
