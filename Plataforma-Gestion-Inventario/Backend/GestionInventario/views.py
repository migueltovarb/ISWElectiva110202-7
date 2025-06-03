from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Inventario
from .serializers import InventarioSerializer
# Create your views here.


class InventarioListCreateAPIView(APIView):
    def get(self, request):
        inventarios = Inventario.objects.all()
        serializer = InventarioSerializer(inventarios, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = InventarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InventarioDetailAPIView(APIView):
    def get(self, request, pk):
        inventario = get_object_or_404(Inventario, pk=pk)
        serializer = InventarioSerializer(inventario)
        return Response(serializer.data)

    def put(self, request, pk):
        inventario = get_object_or_404(Inventario, pk=pk)
        serializer = InventarioSerializer(inventario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        inventario = get_object_or_404(Inventario, pk=pk)
        inventario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)