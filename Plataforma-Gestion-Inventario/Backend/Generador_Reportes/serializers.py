from rest_framework import serializers
from .models import ConfiguracionReporte
from GestionReportes.serializers import InformeSerializer

class ConfiguracionReporteSerializer(serializers.ModelSerializer):
    informe = InformeSerializer(read_only=True)
    informe_id = serializers.PrimaryKeyRelatedField(queryset=InformeSerializer.Meta.model.objects.all(), source='informe', write_only=True)

    class Meta:
        model = ConfiguracionReporte
        fields = ['id', 'informe', 'informe_id', 'incluir_stock', 'incluir_movimientos']