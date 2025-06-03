from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from GestionProductos.models import Producto
from .models import Stock
from .serializers import StockSerializer

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
            return Response(
                {"error": "Producto no tiene stock registrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StockSerializer(stock_obj, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)