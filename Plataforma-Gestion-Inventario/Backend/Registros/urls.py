from django.urls import path
from .views import MovimientoStockListCreateAPIView

urlpatterns = [
    path('movimientos/', MovimientoStockListCreateAPIView.as_view(), name='movimiento-list-create'),
]