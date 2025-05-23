from rest_framework import serializers
from .models import RegistroTareas,ListaTareas,ActualizacionTareas,EliminarTareas

class RegistroTareasSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroTareas
        fields = ['codigo','nombre','descripcion','estado']
        
class ListaTareasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListaTareas
        fields = ['codigo','nombre_tarea','descripcion_tarea','estado_tarea']
        
class ActualizacionTareasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActualizacionTareas
        fields = ['tarea','codigo_actualizado','nombre_actualizado','descripcion_actualizado','estado_actualizado']

class EliminacionTareasSerializers(serializers.ModelSerializer):
    class Meta:
        model = EliminarTareas
        fields = ['tarea','motivo']        
