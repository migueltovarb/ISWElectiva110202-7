from django.urls import path
from .views import CrudTareasAPIView

urlpatterns = [
    path('tareas/',CrudTareasAPIView.as_view(),name="registrar-tarea"),
    path('tareas/<int:pk>',CrudTareasAPIView.as_view(),name="lista-tareas")

]