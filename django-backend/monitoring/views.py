import random
import threading
from time import sleep
from django.db.models import Q
from rest_framework import generics
from .models import TemperatureReading, Animal
from .serializers import TemperatureReadingSerializer, AlertSerializer, AnimalSerializer
from rest_framework.generics import ListAPIView
from .models import TemperatureReading
from .serializers import TemperatureReadingSerializer

def generate_random_temperatures():
    while True:
        animals = Animal.objects.all()
        for animal in animals:
            temperature = round(random.uniform(35, 40), 1)
            
            TemperatureReading.objects.create(animal=animal, temperature=temperature)

            print(f"Generated {temperature}°C for {animal.name}")

        sleep(2)

def start_temperature_generation():
    threading.Thread(target=generate_random_temperatures, daemon=True).start()

class TemperatureReadingCreateAPIView(generics.CreateAPIView):
    queryset = TemperatureReading.objects.all()
    serializer_class = TemperatureReadingSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        if instance.temperature > 39.7 or instance.temperature < 35.2:
            print(f"Alert: Temperature out of range for {instance.animal}: {instance.temperature}°C")
        return instance

class AlertListAPIView(generics.ListAPIView):
    serializer_class = AlertSerializer

    def get_queryset(self):
        return TemperatureReading.objects.filter(
            Q(temperature__gt=39.7) | Q(temperature__lt=35.2)
        ).order_by('-created_at')[:50] 

class AnimalListAPIView(generics.ListAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class TemperatureReadingListAPIView(ListAPIView):
    serializer_class = TemperatureReadingSerializer

    def get_queryset(self):
        # Only return the latest temperature reading per animal
        from django.db.models import Max, Q

        latest_per_animal = (
            TemperatureReading.objects
            .values('animal')
            .annotate(latest_time=Max('created_at'))
        )

        filters = Q()
        for entry in latest_per_animal:
            filters |= Q(animal=entry['animal'], created_at=entry['latest_time'])

        return TemperatureReading.objects.filter(filters)



