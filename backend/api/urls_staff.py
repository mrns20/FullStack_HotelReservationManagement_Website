from django.urls import path
from .views import (
    StaffListCreateView,
)
from .views_staff import staff_login, staff_dashboard, delete_booking


urlpatterns = [
    path('', StaffListCreateView.as_view(), name='staff-list-create'),
    path('login/', staff_login, name='staff_login'),
    path('dashboard/', staff_dashboard, name='staff_dashboard'),
    path('delete-booking/<int:booking_id>/', delete_booking, name='delete_booking'),
]
