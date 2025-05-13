from django.urls import path
from .views import UsuarioListCreateAPIView, UsuarioDetailAPIView,RolUsuarioListAPIView

urlpatterns = [
    path('usuarios/', UsuarioListCreateAPIView.as_view(), name='usuario-list-create'),
    path('usuarios/<int:pk>/', UsuarioDetailAPIView.as_view(), name='usuario-detail'),
    path('roles/',RolUsuarioListAPIView.as_view(), name='rolusuario-list')
]
