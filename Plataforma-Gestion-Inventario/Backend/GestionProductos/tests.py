from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from GestionProductos.models import Producto, CategoriaProducto
from GestionProductos.serializers import ProductoSerializer, CategoriaProductoSerializer
from django.urls import reverse

# Tests para los Modelos

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
        self.assertEqual(str(self.producto), "Laptop")  # Verificar que el str() del Producto devuelve el nombre correcto

    def test_producto_stock(self):
        self.assertEqual(self.producto.stock, 10)  # Verificar que el stock del producto es el correcto

    def test_producto_precio(self):
        self.assertEqual(self.producto.precio, 1500)  # Verificar que el precio es correcto

class CategoriaProductoModelTest(TestCase):
    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")

    def test_categoria_str(self):
        self.assertEqual(str(self.categoria), "Electrónica")  # Verificar que el str() de la categoría devuelve el nombre correcto


# Tests para los Serializers

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
        self.assertTrue(serializer.is_valid())  # Verificar que los datos son válidos

    def test_producto_serializer_invalid(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['nombre'] = ""  # Hacer inválido el nombre
        serializer = ProductoSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())  # Verificar que los datos no son válidos

class CategoriaProductoSerializerTest(APITestCase):
    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")
        self.serializer_data = {
            "nombre": "Muebles"
        }

    def test_categoria_serializer_valid(self):
        serializer = CategoriaProductoSerializer(data=self.serializer_data)
        self.assertTrue(serializer.is_valid())  # Verificar que los datos son válidos

    def test_categoria_serializer_invalid(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['nombre'] = ""  # Hacer inválido el nombre
        serializer = CategoriaProductoSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())  # Verificar que los datos no son válidos


# Tests para las Vistas

class ProductoAPITestCase(APITestCase):
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

    def test_create_producto(self):
        url = reverse('producto-list-create')
        data = {
            "nombre": "Tablet",
            "categoria_id": self.categoria.id,
            "precio": 1200,
            "descripcion": "Tablet de última generación",
            "stock": 5,
            "umbral_minimo": 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)  # Verificar que se crea correctamente

    def test_get_producto(self):
        url = reverse('producto-detail', args=[self.producto.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # Verificar que la respuesta es 200

    def test_get_producto_not_found(self):
        url = reverse('producto-detail', args=[9999])  # Producto no existente
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)  # Verificar que devuelve 404

    def test_update_producto(self):
        url = reverse('producto-detail', args=[self.producto.id])
        data = {
            "nombre": "Laptop Pro",
            "categoria_id": self.categoria.id,
            "precio": 1800,
            "descripcion": "Laptop Pro de gama alta",
            "stock": 5,
            "umbral_minimo": 1
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # Verificar que la actualización es exitosa

    def test_delete_producto(self):
        url = reverse('producto-detail', args=[self.producto.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)  # Verificar que la eliminación es exitosa

    def test_create_producto_invalid_data(self):
        url = reverse('producto-list-create')
        data = {
            "nombre": "",  # Nombre vacío
            "categoria_id": self.categoria.id,
            "precio": 1200,
            "descripcion": "Tablet de última generación",
            "stock": 5,
            "umbral_minimo": 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)  # Verificar que retorna error 400 por nombre vacío


class CategoriaProductoAPITestCase(APITestCase):
    def setUp(self):
        self.categoria = CategoriaProducto.objects.create(nombre="Electrónica")
        self.serializer_data = {
            "nombre": "Muebles"
        }

    def test_create_categoria(self):
        url = reverse('categoria-list-create')
        response = self.client.post(url, self.serializer_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)  # Verificar que se crea correctamente

    def test_get_categoria(self):
        url = reverse('categoria-detail', args=[self.categoria.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # Verificar que la respuesta es 200

    def test_get_categoria_not_found(self):
        url = reverse('categoria-detail', args=[9999])  # Categoría no existente
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)  # Verificar que devuelve 404

    def test_update_categoria(self):
        url = reverse('categoria-detail', args=[self.categoria.id])
        data = {
            "nombre": "Hogar"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # Verificar que la actualización es exitosa

    def test_delete_categoria(self):
        url = reverse('categoria-detail', args=[self.categoria.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)  # Verificar que la eliminación es exitosa
