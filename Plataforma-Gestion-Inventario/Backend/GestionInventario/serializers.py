from rest_framework import serializers
from .models import Inventario
from GestionProductos.serializers import ProductoSerializer

class InventarioSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(queryset=ProductoSerializer.Meta.model.objects.all(), source='producto',write_only=True)
    
    class Meta:
        model = Inventario
        fields = ['id', 'producto', 'producto_id', 'cantidad_disponible', 'actualizado_en']
    