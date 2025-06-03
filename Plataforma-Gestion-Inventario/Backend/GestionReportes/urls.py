from django.urls import path
from .views import InformeListCreateAPIView, InformeDetailAPIView

urlpatterns = [
    path('informes/', InformeListCreateAPIView.as_view(), name='informe-list-create'),
    path('informes/<int:pk>/', InformeDetailAPIView.as_view(), name='informe-detail'),
]
