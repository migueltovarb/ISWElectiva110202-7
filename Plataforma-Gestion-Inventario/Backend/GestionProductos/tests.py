from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Producto, CategoriaProducto
from .serializers import ProductoSerializer, CategoriaProductoSerializer

class ProductoModelTest(TestCase):
    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")
        self.producto = Producto.objects.create(
            nombre="Laptop",
            categoria=self.categoria,
            precio=1500,
            descripcion="Laptop de alta gama",
            stock=10,
            umbral_minimo=2
        )

    def test_producto_str(self):
        self.assertEqual(str(self.producto), "Laptop")

    def test_producto_stock(self):
        self.assertEqual(self.producto.stock, 10)

    def test_producto_precio(self):
        self.assertEqual(self.producto.precio, 1500)

class CategoriaProductoModelTest(TestCase):
    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")

    def test_categoria_str(self):
        self.assertEqual(str(self.categoria), "Electrónica")

class ProductoSerializerTest(APITestCase):
    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")
        self.producto = Producto.objects.create(
            nombre="Laptop",
            categoria=self.categoria,
            precio=1500,
            descripcion="Laptop de alta gama",
            stock=10,
            umbral_minimo=2
        )
        self.serializer_data = {
            "nombre": "Tablet",
            "categoria_id": self.categoria.id,
            "precio": 1200,
            "descripcion": "Tablet de última generación",
            "stock": 5,
            "umbral_minimo": 1
        }

    def test_producto_serializer_valid(self):
        serializer = ProductoSerializer(data=self.serializer_data)
        self.assertTrue(serializer.is_valid())

    def test_producto_serializer_invalid(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['nombre'] = ""
        serializer = ProductoSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())

class CategoriaProductoSerializerTest(APITestCase):
    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")
        self.serializer_data = {
            "nombre": "Muebles"
        }

    def test_categoria_serializer_valid(self):
        serializer = CategoriaProductoSerializer(data=self.serializer_data)
        self.assertTrue(serializer.is_valid())

    def test_categoria_serializer_invalid(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['nombre'] = ""
        serializer = CategoriaProductoSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())

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
            "categoria_id": self.categoria.id,
            "precio": 1200,
            "descripcion": "Tablet de última generación"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Producto.objects.count(), 2)

    def test_create_producto_missing_categoria(self):
        url = "/api/producto/productos/"
        data = {
            "nombre": "Tablet",
            "precio": 1200,
            "descripcion": "Falta la categoría"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('categoria_id', response.data)

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

    def test_get_nonexistent_producto(self):
        url = f"/api/producto/productos/9999/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_producto(self):
        url = f"/api/producto/productos/{self.producto.id}/"
        data = {
            "nombre": "Laptop Pro",
            "categoria_id": self.categoria.id,
            "precio": 1800,
            "descripcion": "Laptop Pro de gama alta"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.producto.refresh_from_db()
        self.assertEqual(self.producto.nombre, "Laptop Pro")

    def test_update_producto_invalid_data(self):
        url = f"/api/producto/productos/{self.producto.id}/"
        data = {
            "nombre": "",
            "categoria_id": self.categoria.id,
            "precio": -100,
            "descripcion": "Error intencional"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_nonexistent_producto(self):
        url = f"/api/producto/productos/9999/"
        data = {
            "nombre": "No Existe",
            "categoria_id": self.categoria.id,
            "precio": 1000,
            "descripcion": "Debe fallar"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_producto(self):
        url = f"/api/producto/productos/{self.producto.id}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Producto.objects.count(), 0)

    def test_delete_nonexistent_producto(self):
        url = f"/api/producto/productos/9999/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class CategoriaProductoAPITestCase(APITestCase):
    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")
        self.serializer_data = {
            "nombre": "Muebles"
        }

    def test_create_categoria(self):
        url = reverse('categoria-list-create')
        response = self.client.post(url, self.serializer_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_categoria(self):
        url = reverse('categoria-detail', args=[self.categoria.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_categoria_not_found(self):
        url = reverse('categoria-detail', args=[9999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_categoria(self):
        url = reverse('categoria-detail', args=[self.categoria.id])
        data = {
            "nombre": "Hogar"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_categoria(self):
        url = reverse('categoria-detail', args=[self.categoria.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
