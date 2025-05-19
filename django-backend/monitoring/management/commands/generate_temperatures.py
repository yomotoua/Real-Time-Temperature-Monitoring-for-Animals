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

        # Start generating random temperatures every 2 seconds
        while True:
            for animal in animals:
                # Generate random temperature between 35 and 40°C
                temperature = round(random.uniform(35, 40), 1)
                
                # Create a new TemperatureReading
                TemperatureReading.objects.create(animal=animal, temperature=temperature)

                # Print the generated value (optional)
                self.stdout.write(self.style.SUCCESS(f"Generated {temperature}°C for {animal.name}"))
            
            # Wait for 2 seconds before generating the next set of temperatures
            sleep(2)
