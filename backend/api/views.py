from rest_framework import generics, status
from rest_framework.permissions import AllowAny


from .models import Client, Staff
from .serializers import (
    ClientSerializer,
    StaffSerializer,
)


class ClientListCreateView(generics.CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]


class StaffListCreateView(generics.CreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [AllowAny]

