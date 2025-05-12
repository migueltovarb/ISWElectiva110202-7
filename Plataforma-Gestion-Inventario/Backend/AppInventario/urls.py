"""
URL configuration for AppInventario project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from GestionProductos import urls as GestionProductos_urls
from GestionUsuarios import urls as GestionUsuarios_urls
from Registros import urls as Registros_urls
from GestionReportes import urls as GestionReportes_urls
from GestionInventario import urls as GestionInventario_urls
from Generador_Reportes import urls as Generador_Reportes_urls
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/producto/',include(GestionProductos_urls)),
    path('api/stock/',include(GestionProductos_urls)),
    path('api/usuario/',include(GestionUsuarios_urls)),
    path('api/registro/',include(Registros_urls)),
    path('api/inventario/',include(GestionInventario_urls)),
    path('api/generador/',include(Generador_Reportes_urls)),
    path('api/informe/',include(GestionReportes_urls)),
]
