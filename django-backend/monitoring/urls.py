from django.urls import path
from .views import TemperatureReadingCreateAPIView, AlertListAPIView

urlpatterns = [
    path('temperature/', TemperatureReadingCreateAPIView.as_view(), name='temperature'),
    path('alerts/', AlertListAPIView.as_view(), name='alerts'),
]
