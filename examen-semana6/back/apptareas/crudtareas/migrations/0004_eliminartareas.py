# Generated by Django 5.2.1 on 2025-06-03 04:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crudtareas', '0003_actualizaciontareas'),
    ]

    operations = [
        migrations.CreateModel(
            name='EliminarTareas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('motivo', models.CharField(blank=True)),
                ('tarea', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='eliminaciones', to='crudtareas.registrotareas')),
            ],
        ),
    ]
