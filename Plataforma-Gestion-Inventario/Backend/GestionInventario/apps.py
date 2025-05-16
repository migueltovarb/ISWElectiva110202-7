from django.apps import AppConfig


class GestioninventarioConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'GestionInventario'


class AppInventarioConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'AppInventario'
    
    def ready(self):
        import GestionInventario.signals