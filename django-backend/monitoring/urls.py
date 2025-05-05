from django.urls import path
from .views import TemperatureReadingCreateAPIView, AlertListAPIView, TemperatureReadingListAPIView

urlpatterns = [
    path('temperature/', TemperatureReadingCreateAPIView.as_view(), name='temperature'),
    path('temperatures/', TemperatureReadingListAPIView.as_view(), name='temperature-list'),
    path('alerts/', AlertListAPIView.as_view(), name='alerts'),
]
