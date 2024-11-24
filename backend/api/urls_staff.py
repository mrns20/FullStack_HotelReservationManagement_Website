from django.urls import path
from .views import (
    StaffListCreateView,
)

urlpatterns = [
    path('', StaffListCreateView.as_view(), name='staff-list-create'),
]
