# Generated by Django 5.2.1 on 2025-05-13 20:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Registros', '0002_alter_movimientostock_producto'),
    ]

    operations = [
        migrations.AddField(
            model_name='movimientostock',
            name='tipo_movimiento',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Registros.tipomovimiento'),
        ),
    ]
