from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RegistroTareas,ListaTareas,ActualizacionTareas,EliminarTareas
from .serializers import RegistroTareasSerializer,ListaTareasSerializer,ActualizacionTareasSerializer,EliminacionTareasSerializers
# Create your views here.

class CrudTareasAPIView(APIView):
    def get(self, request, pk=None):
        if pk is None:
            qs = RegistroTareas.objects.all()
            serializer = RegistroTareasSerializer(qs, many=True)
            return Response(serializer.data)
        try:
            tarea = RegistroTareas.objects.get(pk=pk)
        except RegistroTareas.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RegistroTareasSerializer(tarea)
        return Response(serializer.data)

    def post(self, request):
        serializer = RegistroTareasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            tarea = RegistroTareas.objects.get(pk=pk)
        except RegistroTareas.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RegistroTareasSerializer(tarea, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            tarea = RegistroTareas.objects.get(pk=pk)
        except RegistroTareas.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        tarea.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)