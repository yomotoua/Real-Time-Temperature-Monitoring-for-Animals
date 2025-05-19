import random
from time import sleep
from django.core.management.base import BaseCommand
from monitoring.models import Animal, TemperatureReading

class Command(BaseCommand):
    help = 'Generate random temperatures for animals every 2 seconds'

    def handle(self, *args, **kwargs):
        animals = Animal.objects.all()
        if not animals:
            self.stdout.write(self.style.ERROR("No animals found in the database."))
            return

        while True:
            for animal in animals:
                temperature = round(random.uniform(35, 40), 1)
                
                TemperatureReading.objects.create(animal=animal, temperature=temperature)

                self.stdout.write(self.style.SUCCESS(f"Generated {temperature}°C for {animal.name}"))
            
            sleep(2)
