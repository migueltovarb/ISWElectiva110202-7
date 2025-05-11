from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Informe

class InformeAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.informe = Informe.objects.create(nombre='Informe de prueba')

    def test_listar_informes(self):
        response = self.client.get('/api/informe/informes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_crear_informe(self):
        response = self.client.post('/api/informe/informes/', {'nombre': 'Informe nuevo'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_detalle_informe(self):
        response = self.client.get(f'/api/informe/informes/{self.informe.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_actualizar_informe(self):
        response = self.client.put(f'/api/informe/informes/{self.informe.id}/', {'nombre': 'Informe actualizado'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_eliminar_informe(self):
        response = self.client.delete(f'/api/informe/informes/{self.informe.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
