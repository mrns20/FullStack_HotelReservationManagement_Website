from django.urls import path
from .views import CheckAvailabilityView, ModifyReservationView, LastBookingView

urlpatterns = [
    path('check-availability/', CheckAvailabilityView.as_view(), name='check-availability'),
    path('modify-reservation/', ModifyReservationView.as_view(), name='modify-reservation'),
    path('last/', LastBookingView.as_view(), name='last-booking'),  # χρειάζεται στην PaymentPage.tsx
]