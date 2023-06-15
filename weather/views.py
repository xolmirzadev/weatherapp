from django.shortcuts import render
import requests
from datetime import datetime
from django.http import HttpResponse


def home(request):
    return HttpResponse('<h1>Assalomu aleykum</h1>')

def index(request, city):
    location = city
    api_key = "e8fdb90ee5665f0b87676b2dd4faeb7c"
    api_url_base = "https://api.openweathermap.org/data/2.5/weather"
    api_url = f"{api_url_base}?q={location}&appid={api_key}&units=metric"
    url = requests.get(api_url).json()

    temperatura = url['main']['temp']
    tezlik = url['wind']['speed']
    name = url['name']
    namlik = url['main']['humidity']
    situatsiya = url['weather'][0]['description']
    data = datetime.now().date()

    return render(request, 'weather/index.html', context={
        'temperatura': (temperatura),
        'tezlik': tezlik,
        'name': name,
        'namlik': namlik,
        'data': data,
        'situatsiya': situatsiya,
    })

