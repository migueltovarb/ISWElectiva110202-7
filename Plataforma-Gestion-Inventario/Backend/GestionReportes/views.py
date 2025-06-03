from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Informe
from .serializers import InformeSerializer
# Create your views here.

class InformeListCreateAPIView(APIView):
    def get(self, request):
        informes = Informe.objects.all()
        serializer = InformeSerializer(informes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = InformeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InformeDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Informe.objects.get(pk=pk)
        except Informe.DoesNotExist:
            return None

    def get(self, request, pk):
        informe = self.get_object(pk)
        if not informe:
            return Response({'error': 'Informe no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = InformeSerializer(informe)
        return Response(serializer.data)

    def put(self, request, pk):
        informe = self.get_object(pk)
        if not informe:
            return Response({'error': 'Informe no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = InformeSerializer(informe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        informe = self.get_object(pk)
        if not informe:
            return Response({'error': 'Informe no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        informe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)