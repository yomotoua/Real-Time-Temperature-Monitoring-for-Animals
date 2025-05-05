from django.db.models import Q
from rest_framework import generics
from .models import TemperatureReading
from .serializers import TemperatureReadingSerializer, AlertSerializer

class TemperatureReadingCreateAPIView(generics.CreateAPIView):
    queryset = TemperatureReading.objects.all()
    serializer_class = TemperatureReadingSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        # Trigger alert if temperature is out of the 36°C to 39°C range
        if instance.temperature > 39 or instance.temperature < 36:
            print(f"Alert: Temperature out of range for {instance.animal}: {instance.temperature}°C")
        return instance

class AlertListAPIView(generics.ListAPIView):
    serializer_class = AlertSerializer

    def get_queryset(self):
        return TemperatureReading.objects.filter(Q(temperature__gt=39) | Q(temperature__lt=36))
