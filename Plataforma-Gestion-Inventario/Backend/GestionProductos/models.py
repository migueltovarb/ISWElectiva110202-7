from django.db import models

# Create your models here.
class CategoriaProducto(models.Model):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    categoria = models.ForeignKey(CategoriaProducto, on_delete=models.CASCADE,related_name='Productos')
    descripcion = models.CharField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=0)
    stock = models.PositiveIntegerField(default=0)
    umbral_minimo = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.nombre
    
