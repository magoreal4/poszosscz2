from django.urls import path
from . import views

app_name = 'mapa'

urlpatterns = [
    path("mapa/", views.MapaPage.as_view(), name="mapa"),
    path("mapa-admin/", views.MapaAdminPage.as_view(), name="mapa-admin"),
    path("api/cliente/list", views.ClienteListApiView.as_view()),
    path('api/cliente/create/', views.ClienteCreateApiView.as_view()),
]
