from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Usuario, RolUsuario
from .serializers import UsuarioSerializer, RolUsuarioSerializer
# Create your views here.

class UsuarioListCreateAPIView(APIView):
    def get(self,request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UsuarioSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UsuarioDetailAPIView(APIView):
    def get_object(self,pk):
        try:
            return Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return None
    
    def get(self,request,pk):
        usuario = self.get_object(pk)
        if usuario is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)
    
    def put(self, request,pk):
        usuario = self.get_object(pk)
        if usuario is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UsuarioSerializer(usuario,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        usuario = self.get_object(pk)
        if usuario is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class RolUsuarioListAPIView(APIView):
    def get(self,request):
        roles = RolUsuario.objects.all()
        serializer = RolUsuarioSerializer(roles, many=True)
        return Response(serializer.data)
    