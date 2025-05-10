from rest_framework import serializers
from .models import TipoInforme,EstadoOrden,Informe
from GestionUsuarios.models import Usuario
from GestionUsuarios.serializers import UsuarioSerializer

class TipoInformeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoInforme
        fields = '__all__'
        
class EstadoOrdenSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoOrden
        fields = '__all__'
        
class InformeSerializer(serializers.ModelSerializer):
    tipo = TipoInformeSerializer(read_only=True)
    tipo_id = serializers.PrimaryKeyRelatedField(queryset=TipoInforme.objects.all(),source='tipo',write_only=True)
    
    generado_por = UsuarioSerializer(read_only=True)
    generado_por_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(),
        source='generado_por',
        write_only=True
    )    
    estado = EstadoOrdenSerializer(read_only=True)
    estado_id = serializers.PrimaryKeyRelatedField(queryset=EstadoOrden.objects.all(),source='estado',write_only=True)
    
    class Meta:
        model = Informe
        fields = ['id', 'tipo', 'tipo_id', 'generado_por', 'generado_por_id', 'fecha_generacion', 'estado', 'estado_id']