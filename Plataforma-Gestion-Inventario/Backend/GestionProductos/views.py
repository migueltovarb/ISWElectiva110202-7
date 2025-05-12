from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Producto, CategoriaProducto, Stock
from .serializers import ProductoSerializer, CategoriaProductoSerializer,StockSerializer

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
        
class StockUpdateView(APIView):
    def get(self, request, pk=None, *args, **kwargs):
        if pk is not None:
            try:
                stock_obj = Stock.objects.get(producto_id=pk)
            except Stock.DoesNotExist:
                return Response(
                    {"error": "Producto no tiene stock registrado"},
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = StockSerializer(stock_obj)
            return Response(serializer.data, status=status.HTTP_200_OK)

        categoria_id = request.query_params.get('categoriaId')
        if categoria_id:
            productos = Producto.objects.filter(categoria_id=categoria_id)
            if productos.exists():
                return Response(
                    [p.to_dict() for p in productos],
                    status=status.HTTP_200_OK
                )
            return Response(
                {"error": "No se encontraron productos para esta categoría"},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {"error": "Falta parámetro de consulta o ID de producto"},
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, pk):
        try:
            stock_obj = Stock.objects.get(producto_id=pk)
        except Stock.DoesNotExist:
            try:
                producto = Producto.objects.get(id=pk)
            except Stock.DoesNotExist:
                return Response(
                    {"error": "Producto no tiene stock registrado"},
                    status=status.HTTP_404_NOT_FOUND
                    )
            stock_obj = Stock.objects.create(
                producto = producto,
                cantidad = request.data.get('cantidad',0),
                stock_minimo = request.data.get('stock_minimo',0),
                umbral_minimo = request.data.get('umbral_minimo',0)
            )
        serializer = StockSerializer(stock_obj, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK) 