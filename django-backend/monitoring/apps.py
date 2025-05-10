from django.apps import AppConfig

class MonitoringConfig(AppConfig):
    name = 'monitoring'

    def ready(self):
        from .views import start_temperature_generation
        start_temperature_generation()
