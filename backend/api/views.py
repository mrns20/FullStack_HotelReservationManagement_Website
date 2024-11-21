from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import ClientSerializer
from .models import Client
from django.contrib.auth.models import User

class CreateClientView(generics.CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]
   
    def create(self, validated_data):
         print(validated_data)
         client = User.objects.create_user(**validated_data)
         return client
    

