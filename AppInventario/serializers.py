from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from AppInventario.models import Usuario, Producto, Stock, NotificacionStock, MovimientoInventario, Devolucion,TransferenciaInventario, InventarioObsoletos, Almacen

User = get_user_model()

class GroupSerializer(serializers.ModelSerializer):
    permissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Permission.objects.all())
    
    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions']

class UserSerializer(serializers.ModelSerializer):
    groups = serializers.PrimaryKeyRelatedField(many=True, queryset=Group.objects.all())
    token = serializers.CharField(write_only=True, required=False)  

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'groups', 'token']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    contraseña = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data['email'].strip().lower()
        pwd = data['contraseña']

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Usuario con ese email no existe.")

        if getattr(user, 'contraseña', None):
            if user.contraseña != pwd:
                raise serializers.ValidationError("Contraseña incorrecta.")
        else:
            if not user.check_password(pwd):
                raise serializers.ValidationError("Contraseña incorrecta.")

        token, _ = Token.objects.get_or_create(user=user)

        return {
            'usuario': user,
            'token': token.key
        }


class AssignUserGroupsSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    groups = serializers.PrimaryKeyRelatedField(many=True, queryset=Group.objects.all())

    def validate_user_id(self, value):
        try:
            Usuario.objects.get(pk=value)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Usuario no encontrado.")
        return value


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'codigo', 'categoria', 'cantidad', 'precio']

class StockSerializer(serializers.ModelSerializer):
    nueva_cantidad = serializers.IntegerField(write_only=True)

    class Meta:
        model = Stock
        fields = ['cantidad', 'umbral_minimo', 'nueva_cantidad', 'fecha_actualizacion']

    def validate_nueva_cantidad(self, value):
        if value < 0:
            raise serializers.ValidationError("La nueva cantidad no puede ser negativa.")
        return value

    def update(self, instance, validated_data):
        delta = validated_data.pop('nueva_cantidad', 0)
        new_total = instance.cantidad + delta
        if new_total < 0:
            raise serializers.ValidationError("La cantidad resultante no puede ser negativa.")
        instance.cantidad = new_total
        instance.save()
        return instance

class NotificacionStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificacionStock
        fields = ['id', 'nombre_producto', 'stock_actual', 'umbral_configurado', 'estado']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email', 'contraseña']
        extra_kwargs = {'contraseña': {'write_only': True}}

class MovimientoInventarioSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source="producto.nombre", read_only=True)
    
    class Meta:
        model = MovimientoInventario
        fields = ['id', 'producto', 'producto_nombre', 'tipo_movimiento', 'cantidad', 'fecha']

class DevolucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devolucion
        fields = ['id', 'producto', 'cantidad', 'motivo', 'reincorpora', 'fecha', 'usuario']
        read_only_fields = ['fecha', 'usuario']

class ConsumoInternoSerializer(serializers.ModelSerializer):
    usuario = serializers.ReadOnlyField(source='usuario.username')
    tipo_movimiento = serializers.HiddenField(default='salida')
    
    class Meta:
        model = MovimientoInventario
        fields = ['id','producto','cantidad','tipo_movimiento','motivo','usuario','fecha']
      
    
class AlmacenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Almacen
        fields = ['id', 'nombre', 'ubicacion']  
    
class TransferenciaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')
    origen_nombre = serializers.ReadOnlyField(source='origen.nombre')
    destino_nombre = serializers.ReadOnlyField(source='destino.nombre')
    usuario = serializers.ReadOnlyField(source='usuario.username')

    class Meta:
        model = TransferenciaInventario
        fields = ['id', 'producto', 'producto_nombre', 'cantidad', 'origen', 'origen_nombre', 'destino', 'destino_nombre', 'usuario', 'fecha', 'confirmada']

class InventarioObsoletosSerializer(serializers.ModelSerializer):
    producto_codigo = serializers.ReadOnlyField(source='producto.codigo')
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')
    marcado_por = serializers.ReadOnlyField(source='marcado_por.username')

    class Meta:
        model = InventarioObsoletos
        fields = ['id', 'producto', 'producto_codigo', 'producto_nombre', 'estado', 'fecha_marcado', 'marcado_por', 'revertido', 'fecha_revertido']