from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from GestionUsuarios.models import Usuario, RolUsuario

class UsuarioAPITestCase(APITestCase):
    def setUp(self):
        self.rol = RolUsuario.objects.create(nombre="Administrador")
        self.usuario = Usuario.objects.create(
            nombre="Juan Pérez",
            correo="juan@example.com",
            contrasena="secreta123",
            rol=self.rol
        )

    def test_listar_usuarios(self):
        url = reverse('usuario-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_crear_usuario(self):
        url = reverse('usuario-list-create')
        data = {
            "nombre": "Ana López",
            "correo": "ana@example.com",
            "contrasena": "password456",
            "rol_id": self.rol.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nombre'], "Ana López")

    def test_obtener_usuario(self):
        url = reverse('usuario-detail', args=[self.usuario.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nombre'], "Juan Pérez")

    def test_actualizar_usuario(self):
        url = reverse('usuario-detail', args=[self.usuario.id])
        data = {
            "nombre": "Juan Actualizado",
            "correo": "juan_actualizado@example.com",
            "contrasena": "nueva123",
            "rol_id": self.rol.id
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nombre'], "Juan Actualizado")

    def test_eliminar_usuario(self):
        url = reverse('usuario-detail', args=[self.usuario.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class RolUsuarioTestCase(APITestCase):
    def test_crear_rol_usuario(self):
        rol = RolUsuario.objects.create(nombre="Operador")
        self.assertEqual(rol.nombre, "Operador")