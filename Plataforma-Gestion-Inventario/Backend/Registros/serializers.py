from rest_framework import serializers
from GestionProductos.models import Producto
from GestionUsuarios.models import Usuario
from .models import TipoMovimiento, EstadoEjecucion, MovimientoStock
from GestionProductos.serializers import ProductoSerializer
from GestionUsuarios.serializers import UsuarioSerializer

class TipoMovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoMovimiento
        fields = '__all__'
        
class EstadoEjecucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoEjecucion
        fields = '__all__'
        
class MovimientoStockSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())
    tipo_movimiento = serializers.PrimaryKeyRelatedField(queryset=TipoMovimiento.objects.all())
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    estado = serializers.PrimaryKeyRelatedField(queryset=EstadoEjecucion.objects.all())

    class Meta:
        model = MovimientoStock
        fields = '__all__'