from django.urls import path
from .views import (
    ProductoListCreateAPIView, ProductoDetailAPIView,
    CategoriaProductoDetailAPIView, CategoriaProductoListCreateAPIView, StockUpdateView
)

urlpatterns = [
    path('productos/',ProductoListCreateAPIView.as_view(), name='producto-list-create'),
    path('productos/<int:pk>/',ProductoDetailAPIView.as_view(),name='producto-detail'),
    
    path('categorias/',CategoriaProductoListCreateAPIView.as_view(),name='categoria-list-create'),
    path('categorias/<int:pk>/',CategoriaProductoDetailAPIView.as_view(), name='categoria-detail'),
    
    path('actualizar/<int:pk>/', StockUpdateView.as_view(),name='stock-update'),

]
