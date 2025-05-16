from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group, Permission

@receiver(post_migrate)
def crear_roles(sender,**kwargs):
    if sender.name != 'AppInventario':
        return
    
    print("Verificando roles")
    
    admin_group = Group.objects.get_or_create(name='Administrador')
    almacen_group = Group.objects.get_or_create(name='Encargado de Almacen')
    consulta_group = Group.objects.get_or_create(name='Usuario de Consulta')
    
    permisos = Permission.objects.all()
    
    admin_group.permissions.set(permisos)
    
    almacen_perms = permisos.filter(codename__in=[
        'view_movimientostock','add_movimientostock',
        'viewproducto','change_producto'
    ])
    almacen_group.permissions.set(almacen_perms)
    
    consulta_perms = permisos.filter(codename__startswith='view_')
    consulta_group.permissions.set(consulta_perms)
    
    print("Roles verificados correctamente")
    