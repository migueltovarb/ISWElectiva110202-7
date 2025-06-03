from django.db import models
from GestionProductos.models import Producto
# Create your models here.

class Inventario(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad_disponible = models.PositiveIntegerField()
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.producto.nombre} - {self.cantidad_disponible} unidades"