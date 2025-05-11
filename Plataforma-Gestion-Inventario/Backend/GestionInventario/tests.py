from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Inventario

class InventarioAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.inventario = Inventario.objects.create(nombre='Item A', cantidad=100)

    def test_listar_inventario(self):
        response = self.client.get('/api/inventario/inventario/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_crear_inventario(self):
        response = self.client.post('/api/inventario/inventario/', {'nombre': 'Item B', 'cantidad': 50})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_detalle_inventario(self):
        response = self.client.get(f'/api/inventario/inventario/{self.inventario.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_actualizar_inventario(self):
        response = self.client.put(f'/api/inventario/inventario/{self.inventario.id}/', {'nombre': 'Item A+', 'cantidad': 120})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_eliminar_inventario(self):
        response = self.client.delete(f'/api/inventario/inventario/{self.inventario.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
