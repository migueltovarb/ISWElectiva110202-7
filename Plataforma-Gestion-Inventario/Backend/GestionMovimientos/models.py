from django.db import models
from GestionProductos.models import Producto
from GestionUsuarios.models import Usuario 
# Create your models here.
class MovimientoStock(models.Model):
    TIPO_CHOICES = [
        ('entrada','Entrada'),
        ('salida','Salida'),
    ]
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='movimientos')
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    fecha = models.DateTimeField(auto_now_add=True)
    cantidad = models.IntegerField()
    tipo = models.CharField(max_length=10,choices=TIPO_CHOICES)
    ubicacion = models.CharField(max_length=100, blank=True)
    codigo = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return f"{self.producto.nombre} | {self.usuario} | {self.fecha:%Y-%m-%d %H:%M}"
    
class ActualizarStock(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    stock_minimo = models.IntegerField()
    umbral_minimo = models.IntegerField()
    fecha = models.DateTimeField(auto_now=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.producto.nombre} - Cantidad: {self.cantidad}"