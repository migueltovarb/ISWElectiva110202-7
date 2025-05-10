from rest_framework.test import APITestCase
from rest_framework import status
from .models import Producto, CategoriaProducto

class ProductoAPITestCase(APITestCase):

    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")
        self.producto = Producto.objects.create(
            nombre="Laptop",
            categoria=self.categoria,
            precio=1500,
            descripcion="Laptop de alta gama"
        )

    def test_create_producto(self):
        url = "/api/producto/productos/"
        data = {
            "nombre": "Tablet",
            "categoria": self.categoria.id,
            "precio": 1200,
            "descripcion": "Tablet de última generación"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Producto.objects.count(), 2)

    def test_get_productos(self):
        url = "/api/producto/productos/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_producto_detail(self):
        url = f"/api/producto/productos/{self.producto.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nombre'], self.producto.nombre)

    def test_update_producto(self):
        url = f"/api/producto/productos/{self.producto.id}/"
        data = {
            "nombre": "Laptop Pro",
            "categoria": self.categoria.id,
            "precio": 1800,
            "descripcion": "Laptop Pro de gama alta"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.producto.refresh_from_db()
        self.assertEqual(self.producto.nombre, "Laptop Pro")

    def test_delete_producto(self):
        url = f"/api/producto/productos/{self.producto.id}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Producto.objects.count(), 0)
