from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from GestionProductos.models import Producto
from .models import MovimientoStock, ActualizarStock
from .serializers import MovimientoStockSerializer, ActualizarStockSerializer
from django.shortcuts import get_object_or_404

# Create your views here.

class MovimientoStockDetailAPIView(APIView):
    def get_object(self, producto_id):
        return get_object_or_404(MovimientoStock, producto_id=producto_id)

    def get(self, request, producto_id):
        movimiento = self.get_object(producto_id)
        serializer = MovimientoStockSerializer(movimiento)
        return Response(serializer.data)

    def put(self, request, producto_id):
        movimiento = self.get_object(producto_id)
        serializer = MovimientoStockSerializer(movimiento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, producto_id):
        movimiento = self.get_object(producto_id)
        movimiento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ActualizarStockPorProductoAPIView(APIView):
    def get(self, request, producto_id=None, *args, **kwargs):
        if producto_id is not None:
            try:
                stock_obj = ActualizarStock.objects.get(producto_id=producto_id)
            except ActualizarStock.DoesNotExist:
                return Response(
                    {"error": "Producto no tiene stock registrado"},
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = ActualizarStockSerializer(stock_obj)
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

    def put(self, request, producto_id):
        try:
            stock_obj = ActualizarStock.objects.get(producto__id=producto_id)
        except ActualizarStock.DoesNotExist:
            return Response(
                {"error": "Producto no tiene stock registrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ActualizarStockSerializer(stock_obj, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MovimientoStockListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self,request):
        movimientos = MovimientoStock.objects.all().order_by('-fecha')
        serializer = MovimientoStockSerializer(movimientos, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = MovimientoStockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    