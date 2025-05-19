from django.urls import path
from .views import (
    TemperatureReadingCreateAPIView,
    AlertListAPIView,
    TemperatureReadingListAPIView,
    AnimalListAPIView,
    TemperatureByAnimalAPIView,  
)

urlpatterns = [
    path('temperature/', TemperatureReadingCreateAPIView.as_view(), name='temperature'),
    path('temperatures/', TemperatureReadingListAPIView.as_view(), name='temperature-list'),
    path('temperatures/<str:animal_name>/', TemperatureByAnimalAPIView.as_view(), name='animal-temperatures-by-name'),
    path('alerts/', AlertListAPIView.as_view(), name='alerts'),
    path('animals/', AnimalListAPIView.as_view(), name='animal-list'),
]
