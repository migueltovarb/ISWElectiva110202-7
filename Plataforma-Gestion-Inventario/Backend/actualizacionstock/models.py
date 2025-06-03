from django.db import models
from GestionProductos.models import Producto
# Create your models here.

class Stock(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='stocks')
    cantidad = models.PositiveIntegerField()
    stock_minimo = models.PositiveIntegerField(default=1)
    umbral_minimo = models.IntegerField()
    
    def __str__(self):
        return f"{self.producto.nombre} - {self.cantidad} unidades"