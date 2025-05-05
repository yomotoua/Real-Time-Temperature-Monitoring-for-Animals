from django.db import models

class Animal(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class TemperatureReading(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='readings')
    temperature = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.animal} - {self.temperature}°C at {self.created_at}"
