from django.urls import path
from .views import (
    ClientListCreateView,
)

urlpatterns = [
    path('', ClientListCreateView.as_view(), name='client-list-create'),
]
