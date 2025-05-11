from django.urls import path
from .views import StockUpdateView

urlpatterns = [
    path('actualizar/<int:pk>/', StockUpdateView.as_view()),
]