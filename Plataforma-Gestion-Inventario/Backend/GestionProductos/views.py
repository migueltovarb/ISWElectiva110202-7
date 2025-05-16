from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Producto, CategoriaProducto
from .serializers import ProductoSerializer, CategoriaProductoSerializer

# Create your views here.
class ProductoListCreateAPIView(APIView):
    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductoDetailAPIView(APIView):
    def get_object(self,pk):
        try:
            return Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return None
    
    def get(self,request,pk):
        producto = self.get_object(pk)
        if producto is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)
    
    def put(self,request,pk):
        producto = self.get_object(pk)
        if producto is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
    def delete(self,request,pk):
        producto = self.get_object(pk)
        if producto is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CategoriaProductoListCreateAPIView(APIView):
    def get(self, pk):
        try:
            return CategoriaProducto.objects.get(pk=pk)
        except CategoriaProducto.DoesNotExist:
            return None
    
    def post(self,request):
        serializer = CategoriaProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoriaProductoDetailAPIView(APIView):
    def get_object(self,pk):
        try:
            return Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return None
    
    def get(self,request,pk):
        categoria = self.get_object(pk)
        if categoria is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CategoriaProductoSerializer(categoria)
        return Response(serializer.data)
    
    def put(self,request,pk):
        categoria = self.get_object(pk)
        if categoria is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CategoriaProductoSerializer(categoria)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        categoria = self.get_object(pk)
        if categoria is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        categoria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)