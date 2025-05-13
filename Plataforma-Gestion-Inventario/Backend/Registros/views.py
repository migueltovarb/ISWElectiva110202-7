from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MovimientoStock
from .serializers import MovimientoStockSerializer

class MovimientoStockListCreateAPIView(APIView):
    def get(self, request):
        movimientos = MovimientoStock.objects.all()
        serializer = MovimientoStockSerializer(movimientos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MovimientoStockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)