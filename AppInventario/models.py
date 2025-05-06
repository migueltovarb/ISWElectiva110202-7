from django.db import models
from django.conf import settings
from django.utils import timezone
# Create your models here.

class Producto(models.Model):
    nombre    = models.CharField(max_length=255)
    codigo    = models.CharField(max_length=50, unique=True)
    categoria = models.CharField(max_length=100)
    cantidad  = models.PositiveIntegerField()
    precio    = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.nombre} ({self.codigo})"

class Stock(models.Model):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name="stock")
    cantidad = models.PositiveIntegerField(default=0)
    umbral_minimo = models.PositiveIntegerField(default=5)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def actualizar_stock(self, delta):
        new_total = self.cantidad + delta
        if new_total < 0:
            raise ValueError("La cantidad resultante no puede ser negativa.")
        self.cantidad = new_total
        self.save()
        if self.cantidad < self.umbral_minimo:
            # La lógica para generar notificación se maneja en HU003 o en señales.
            return f"¡Alerta! El stock de {self.producto.nombre} está por debajo del umbral mínimo."
        return f"Stock actualizado correctamente. Nueva cantidad: {self.cantidad}"


class NotificacionStock(models.Model):
    nombre_producto = models.CharField(max_length=255)
    stock_actual = models.PositiveIntegerField()
    umbral_configurado = models.PositiveIntegerField()
    estado = models.BooleanField(default=True) 
    def __str__(self):
        return f"{self.nombre_producto} - {'Alerta' if self.estado else 'Normal'}"


class Usuario(models.Model):
    nombre = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=128)  

    def __str__(self):
        return self.nombre
    
class MovimientoInventario(models.Model):
    MOVIMIENTO_CHOICES = [
        ('Entrada', 'Entrada'),
        ('Salida', 'Salida')
    ]
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    tipo_movimiento = models.CharField(max_length=20, choices=MOVIMIENTO_CHOICES)
    cantidad = models.PositiveIntegerField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.producto.nombre} - {self.tipo_movimiento} - {self.cantidad}"

class Devolucion(models.Model):
    producto = models.ForeignKey('Producto', on_delete=models.PROTECT)
    cantidad = models.PositiveIntegerField()
    motivo = models.TextField()
    reincorpora = models.BooleanField(default=True)
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Devolución {self.producto.nombre} x{self.cantidad}"  
    

class Almacen(models.Model):
    nombre = models.CharField(max_length=100,unique=True)
    ubicacion = models.CharField(max_length=255,blank=True)
    
    def __str__(self):
        return self.nombre
    
class TransferenciaInventario(models.Model):
    producto = models.ForeignKey('Producto',on_delete=models.PROTECT)
    cantidad = models.PositiveBigIntegerField()
    origen = models.ForeignKey(Almacen, on_delete=models.PROTECT, related_name='transferencias_origen')
    destino = models.ForeignKey(Almacen, on_delete=models.PROTECT, related_name='transferencias_destino')
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    fecha = models.DateTimeField(auto_now_add=True)
    confirmada = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-fecha']
    
    def clean(self):
        stock_origen = self.origen.stock_set.filter(producto=self.producto).first()
        if not stock_origen or stock_origen.cantidad < self.cantidad:
            from django.core.exceptions import ValidationError
            raise ValidationError("Cantidad supera stock disponible en almacén de origen.")

    def __str__(self):
        return f"{self.producto.nombre} {self.cantidad} de {self.origen} a {self.destino}"
class InventarioObsoletos(models.Model):
    ESTADO_CHOICES = [
        ('Descontinuado', 'Descontinuado'),
        ('Obsoleto', 'Obsoleto'),
    ]
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='obsoletos')
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES)
    fecha_marcado = models.DateTimeField(default=timezone.now)
    marcado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    revertido = models.BooleanField(default=False)
    fecha_revertido = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-fecha_marcado']

    def revertir(self):
        if self.revertido:
            return
        self.revertido = True
        self.fecha_revertido = timezone.now()
        self.save()

    def __str__(self):
        status = 'Revertido' if self.revertido else self.estado
        return f"{self.producto.codigo} - {status}"
