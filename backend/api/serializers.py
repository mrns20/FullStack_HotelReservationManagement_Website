from rest_framework import serializers
from .models import Client
from django.contrib.auth.models import User

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["c_id", "email", "password", "firstname", "lastname", "tel"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
         print(validated_data)
         client = Client.objects.create_user(**validated_data)
         return client