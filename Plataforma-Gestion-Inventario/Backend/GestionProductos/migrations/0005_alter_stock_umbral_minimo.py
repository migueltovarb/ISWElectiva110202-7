# Generated by Django 5.2.1 on 2025-05-12 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionProductos', '0004_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='umbral_minimo',
            field=models.PositiveIntegerField(),
        ),
    ]
