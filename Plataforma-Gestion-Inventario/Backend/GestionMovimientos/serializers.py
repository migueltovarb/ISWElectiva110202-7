from rest_framework import serializers
from .models import MovimientoStock, ActualizarStock
from GestionUsuarios.serializers import UsuarioSerializer
from GestionProductos.serializers import ProductoSerializer

class MovimientoStockSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    producto = ProductoSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=MovimientoStock._meta.get_field('usuario').related_model.objects.all(),
        source='usuario',
        write_only=True
    )
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=MovimientoStock._meta.get_field('producto').related_model.objects.all(),
        source='producto',
        write_only=True
    )
    
    fecha = serializers.DateTimeField(read_only=True)
    
    class Meta: 
        model = MovimientoStock
        fields = [
          'id','producto','producto_id','cantidad','tipo',
          'ubicacion','codigo',
          'usuario','usuario_id','fecha'
        ]
     

class ActualizarStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActualizarStock
        fields = "__all__"