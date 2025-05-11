from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Stock
from .serializers import StockSerializer

class StockUpdateView(APIView):
    def put(self, request, pk):
        try:
            stock_obj = Stock.objects.get(producto_id=pk)
        except Stock.DoesNotExist:
            return Response({"error": "Producto no tiene stock registrado"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = StockSerializer(stock_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)