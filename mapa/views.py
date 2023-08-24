from django.shortcuts import render

from django.views.generic import TemplateView

from django.http import JsonResponse
from .models import Cliente
from .serializers import ClienteGet, ClientePost
from rest_framework.generics import ListAPIView, CreateAPIView

class MapaPage(TemplateView):
    template_name = 'mapa/mapa.html'

class MapaAdminPage(TemplateView):
    template_name = 'mapa/mapa-admin.html'
    
class ClienteListApiView(ListAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteGet
    
class ClienteCreateApiView(CreateAPIView):
    serializer_class = ClientePost