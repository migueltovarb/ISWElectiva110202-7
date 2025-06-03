from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import GeneradorReporte

class GeneradorReporteAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.generador = GeneradorReporte.objects.create(nombre='Generador 1')

    def test_listar_generadores(self):
        response = self.client.get('/api/generador/generadores/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_crear_generador(self):
        response = self.client.post('/api/generador/generadores/', {'nombre': 'Nuevo Generador'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_detalle_generador(self):
        response = self.client.get(f'/api/generador/generadores/{self.generador.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_actualizar_generador(self):
        response = self.client.put(f'/api/generador/generadores/{self.generador.id}/', {'nombre': 'Editado'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_eliminar_generador(self):
        response = self.client.delete(f'/api/generador/generadores/{self.generador.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
