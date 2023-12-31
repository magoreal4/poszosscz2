from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path("", views.HomePage.as_view(), name="home"),
    path("logout/", views.logout_request, name="logout"),
    path('contact/', views.contact_view, name='contact'),
]
