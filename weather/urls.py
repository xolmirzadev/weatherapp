from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='weather-home'),
    path('<str:city>', views.index, name='index'),
]