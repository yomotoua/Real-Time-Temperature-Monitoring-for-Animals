import random
import threading
from time import sleep
from django.db.models import Q
from rest_framework import generics
from .models import TemperatureReading, Animal
from .serializers import TemperatureReadingSerializer, AlertSerializer, AnimalSerializer

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
        if instance.temperature > 39 or instance.temperature < 36:
            print(f"Alert: Temperature out of range for {instance.animal}: {instance.temperature}°C")
        return instance

class AlertListAPIView(generics.ListAPIView):
    serializer_class = AlertSerializer

    def get_queryset(self):
        return TemperatureReading.objects.filter(Q(temperature__gt=39) | Q(temperature__lt=36))

class AnimalListAPIView(generics.ListAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class TemperatureReadingListAPIView(generics.ListAPIView):
    """
    GET: List all temperature readings for a specific animal.
    """
    serializer_class = TemperatureReadingSerializer

    def get_queryset(self):
        animal_id = self.kwargs['animal_id']
        return TemperatureReading.objects.filter(animal_id=animal_id).order_by('-created_at')
