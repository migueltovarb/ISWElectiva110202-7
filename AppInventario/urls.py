from django.urls import path
from AppInventario.views import (
    ProductoCreateView, StockUpdateView, NotificacionStockView, UsuarioRegistroView,
    MovimientoInventarioView, ProductoBusquedaView, ReporteInventarioView, DevolucionView, ProductoDetailView, ConsumoInternoView, AlmacenAPIView, TransferenciaAPIView, InventarioObsoletosAPIView
)


urlpatterns = [
    path('productos/', ProductoCreateView.as_view(), name='api_productos'),
    path('productos/<str:codigo>/actualizar_stock/', StockUpdateView.as_view(), name='crud_stock'),
    path('notificaciones/', NotificacionStockView.as_view(), name='notificaciones'),
    path('notificaciones/<int:pk>/', NotificacionStockView.as_view(), name='notificacion-detalle'),
    path('usuarios/registro/', UsuarioRegistroView.as_view(), name='registro_usuario'),
    path('movimientos/', MovimientoInventarioView.as_view(), name='movimientos'),
    path('productos/busqueda/', ProductoBusquedaView.as_view(), name='busqueda_productos'),
    path('reportes/<str:formato>/', ReporteInventarioView.as_view(), name='reporte_inventario'),
    path('devoluciones/', DevolucionView.as_view(), name='devoluciones'),
    path('productos/<str:codigo>/', ProductoDetailView.as_view(), name='producto-detalle'),
    path('consumos-internos/', ConsumoInternoView.as_view(), name='consumo-interno'),
    path('almacenes/', AlmacenAPIView.as_view()),
    path('transferencias/', TransferenciaAPIView.as_view()),
    path('transferencias/<int:pk>/', TransferenciaAPIView.as_view()),
    path('obsoletos/', InventarioObsoletosAPIView.as_view()),
    path('obsoletos/<int:pk>/', InventarioObsoletosAPIView.as_view()),
    path('obsoletos/<int:pk>/revertir/', InventarioObsoletosAPIView.as_view()),
]
