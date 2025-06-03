from rest_framework import serializers
from .models import CategoriaProducto,Producto

class CategoriaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProducto
        fields = '__all__'
        
class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaProductoSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset = CategoriaProducto.objects.all(),
        source='categoria',
        write_only=True
    )
    
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'umbral_minimo', 'categoria', 'categoria_id']

