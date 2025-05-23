from rest_framework import serializers
from .models import TemperatureReading, Animal

class TemperatureReadingSerializer(serializers.ModelSerializer):
    animal_name = serializers.CharField(write_only=True)
    animal = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = TemperatureReading
        fields = ['id', 'animal', 'animal_name', 'temperature', 'created_at']
        read_only_fields = ['id', 'created_at', 'animal']

    def create(self, validated_data):
        animal_name = validated_data.pop('animal_name')
        animal, created = Animal.objects.get_or_create(name=animal_name)
        reading = TemperatureReading.objects.create(animal=animal, **validated_data)
        return reading

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = ['id', 'name']

class AlertSerializer(serializers.ModelSerializer):
    animal = serializers.StringRelatedField()

    class Meta:
        model = TemperatureReading
        fields = ['id', 'animal', 'temperature', 'created_at']
