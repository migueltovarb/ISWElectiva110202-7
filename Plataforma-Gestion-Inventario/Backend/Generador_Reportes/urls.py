from django.urls import path
from .views import ConfiguracionReporteListCreateAPIView, ConfiguracionReporteDetailAPIView

urlpatterns = [
    path('configuraciones/', ConfiguracionReporteListCreateAPIView.as_view(), name='configuracion-list-create'),
    path('configuraciones/<int:pk>/', ConfiguracionReporteDetailAPIView.as_view(), name='configuracion-detail'),
]
