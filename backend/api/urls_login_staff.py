from django.urls import path
from .views import (
    LoginStaffView,
)

urlpatterns = [
    path('', LoginStaffView.as_view(), name='staff-login'),
]
