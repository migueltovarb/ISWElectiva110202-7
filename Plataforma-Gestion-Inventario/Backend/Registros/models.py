from django.db import models
from GestionProductos.models import Producto
from GestionUsuarios.models import Usuario
# Create your models here.

class TipoMovimiento(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
    
class EstadoEjecucion(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
    
class MovimientoStock(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    estado = models.ForeignKey(EstadoEjecucion, on_delete=models.SET_NULL, null=True)
    tipo_movimiento = models.ForeignKey(TipoMovimiento, on_delete=models.SET_NULL, null=True)  # <--- AGREGAR ESTO

    def __str__(self):
        return f"{self.tipo_movimiento} - {self.producto} ({self.cantidad})"
    
