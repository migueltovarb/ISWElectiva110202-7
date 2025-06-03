from rest_framework import serializers
from .models import RolUsuario, Usuario

class RolUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolUsuario
        fields = '__all__'
        
class UsuarioSerializer(serializers.ModelSerializer):
    rol = RolUsuarioSerializer(read_only=True)
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=RolUsuario.objects.all(),
        source='rol',
        write_only=True
    )
    
    class Meta:
        model = Usuario
        fields = ['id','nombre','correo','contrasena','rol','rol_id']
        extra_kwargs = {'contrasena':{'write_only':True}}
        
        def create(self, validated_data):
            return Usuario.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance