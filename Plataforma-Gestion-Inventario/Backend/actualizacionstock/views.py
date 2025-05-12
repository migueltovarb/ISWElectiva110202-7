from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from GestionProductos.models import Producto
from .models import Stock
from .serializers import StockSerializer

class StockUpdateView(APIView):
    def get(self, request, *args, **kwargs):
        categoria_id = request.query_params.get('categoriaId')

        if categoria_id:
            productos = Producto.objects.filter(categoria_id=categoria_id)
            if productos.exists():
                return Response([producto.to_dict() for producto in productos], status=status.HTTP_200_OK)
            return Response({"error": "No se encontraron productos para esta categoría"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Falta parámetro de consulta"}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            producto = Producto.objects.get(id=pk)
        except Stock.DoesNotExist:
            return Response(
                {"error": "Producto no tiene stock registrado"},
                status=status.HTTP_404_NOT_FOUND
            )
        stock_obj, created = Stock.objects.get_or_create(
            producto=producto,
            defaults={
                "cantidad": request.data.get("cantidad", 0),
                "stock_minimo": request.data.get("stock_minimo", 1)
            }
        )
        if not created:
            serializer = StockSerializer(stock_obj, data=request.data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = StockSerializer(stock_obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)