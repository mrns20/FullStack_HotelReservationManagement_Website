from django.urls import path
from .views import CheckAvailabilityView, ModifyReservationView

urlpatterns = [
    path('check-availability/', CheckAvailabilityView.as_view(), name='check-availability'),
    path('modify-reservation/', ModifyReservationView.as_view(), name='modify-reservation'),
    ]