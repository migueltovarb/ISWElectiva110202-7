from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RegistroTareas,ListaTareas,ActualizacionTareas,EliminarTareas
from .serializers import RegistroTareasSerializer,ListaTareasSerializer,ActualizacionTareasSerializer,EliminacionTareasSerializers
# Create your views here.

class CrudTareasAPIView(APIView):
    def get(self,request,pk):
        ListaTareas = self.get_object(pk)
        if ListaTareas is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ListaTareasSerializer(ListaTareas)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = RegistroTareasSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,pk):
        ActualizacionTareas = self.get_object(pk)
        if ActualizacionTareas is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ActualizacionTareasSerializer(ActualizacionTareas)
        if serializer.is_valid():
            serializer.save()
    
    def delete(self,request,pk):
        EliminarTareas = self.get_object(pk)
        if EliminarTareas is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        EliminarTareas.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
