# Generated by Django 4.2.4 on 2023-08-17 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tel1', models.CharField(blank=True, max_length=8, null=True, verbose_name='telefono 1')),
                ('tel2', models.CharField(blank=True, max_length=8, verbose_name='telefono 2')),
                ('name', models.CharField(blank=True, max_length=51, verbose_name='nombre')),
                ('address', models.CharField(blank=True, max_length=120, verbose_name='direccion')),
                ('cod', models.CharField(blank=True, max_length=10, null=True, verbose_name='codigo')),
                ('cost', models.PositiveIntegerField(default=0, verbose_name='precio')),
                ('service', models.CharField(choices=[('NOR', 'Normal'), ('FLE', 'Flete'), ('RRP', 'RRPP'), ('FBA', 'FB Ads'), ('ORG', 'Orgánico'), ('GOA', 'Google Ads'), ('COM', 'Combo'), ('MKP', 'Market Place'), ('OTR', 'Otro')], default='NOR', max_length=10, verbose_name='servicio')),
                ('lat', models.FloatField(max_length=10, verbose_name='latitud')),
                ('lon', models.FloatField(max_length=10, verbose_name='longitud')),
                ('status', models.CharField(choices=[('COT', 'Cotizado'), ('EJE', 'Ejecutado'), ('NEG', 'L.negra')], default='COT', max_length=3, verbose_name='estado')),
                ('user', models.CharField(choices=[('ADM', 'Administrador'), ('CLC', 'Cliente Confirma'), ('CLX', 'Cliente Cancela')], default='ADM', max_length=10, verbose_name='usuario')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='creado')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='actualizado')),
            ],
        ),
    ]
