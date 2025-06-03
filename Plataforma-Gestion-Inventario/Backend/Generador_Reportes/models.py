from django.db import models
from GestionReportes.models import Informe
# Create your models here.

class ConfiguracionReporte(models.Model):
    informe = models.ForeignKey(Informe, on_delete=models.CASCADE)
    incluir_stock = models.BooleanField(default=True)
    incluir_movimientos = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Configuración de {self.informe}"
    