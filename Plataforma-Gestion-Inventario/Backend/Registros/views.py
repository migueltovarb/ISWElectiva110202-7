from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from GestionReportes.serializers import InformeSerializer
from GestionReportes.models import Informe
from GestionProductos.models import Producto
from GestionProductos.serializers import ProductoSerializer

# Create your views here.
class InformeListCreateAPIView(APIView):
    def get(self,request):
        informes = Informe.objects.all()
        serializer = InformeSerializer(informes, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = InformeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InformeDetailAPIView(APIView):
    def get(self, request, pk):
        informe = get_object_or_404(Informe, pk=pk)
        serializer = InformeSerializer(informe)
        return Response(serializer.data)

    def put(self, request, pk):
        informe = get_object_or_404(Informe, pk=pk)
        serializer = InformeSerializer(informe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        informe = get_object_or_404(Informe, pk=pk)
        informe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)