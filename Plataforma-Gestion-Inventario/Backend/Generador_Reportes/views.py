from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import ConfiguracionReporte
from .serializers import ConfiguracionReporteSerializer

# Create your views here.
class ConfiguracionReporteListCreateAPIView(APIView):
    def get(self, request):
        generadores = ConfiguracionReporte.objects.all()
        serializer = ConfiguracionReporteSerializer(generadores, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ConfiguracionReporteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConfiguracionReporteDetailAPIView(APIView):
    def get(self, request, pk):
        generador = get_object_or_404(ConfiguracionReporte, pk=pk)
        serializer = ConfiguracionReporteSerializer(generador)
        return Response(serializer.data)

    def put(self, request, pk):
        generador = get_object_or_404(ConfiguracionReporte, pk=pk)
        serializer = ConfiguracionReporteDetailAPIView(generador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        generador = get_object_or_404(ConfiguracionReporte, pk=pk)
        generador.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)