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
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all(), source='producto', write_only=True)
    
    tipo_movimiento = TipoMovimientoSerializer(read_only=True)
    tipo_movimiento_id = serializers.PrimaryKeyRelatedField(queryset=TipoMovimiento.objects.all(), source='tipo_movimiento', write_only=True)
    
    usuario = UsuarioSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), source='usuario', write_only=True)
    
    estado = EstadoEjecucionSerializer(read_only=True)
    estado_id = serializers.PrimaryKeyRelatedField(queryset=EstadoEjecucion.objects.all(), source='estado', write_only=True)
    
    class Meta:
       model = MovimientoStock
       fields = [
            'id', 'producto', 'producto_id',
            'tipo_movimiento', 'tipo_movimiento_id',
            'cantidad', 'fecha',
            'usuario', 'usuario_id',
            'estado', 'estado_id'
       ]