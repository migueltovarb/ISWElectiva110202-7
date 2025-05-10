from django.urls import path
from .views import InventarioListCreateAPIView, InventarioDetailAPIView

urlpatterns = [
    path('inventario/', InventarioListCreateAPIView.as_view(), name='inventario-list-create'),
    path('inventario/<int:pk>/', InventarioDetailAPIView.as_view(), name='inventario-detail'),
]
