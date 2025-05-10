from django.urls import path
from .views import TemperatureReadingCreateAPIView, AlertListAPIView, TemperatureReadingListAPIView, AnimalListAPIView

urlpatterns = [
    path('temperature/', TemperatureReadingCreateAPIView.as_view(), name='temperature'),
    path('temperatures/', TemperatureReadingListAPIView.as_view(), name='temperature-list'),
    path('alerts/', AlertListAPIView.as_view(), name='alerts'),
    path('animals/', AnimalListAPIView.as_view(), name='animal-list'),
    path('temperatures/<int:animal_id>/', TemperatureReadingListAPIView.as_view(), name='animal-temperatures'),  # For specific animal temperatures
]
