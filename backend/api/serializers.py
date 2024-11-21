from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["c_id", "email", "password", "firstname", "lastname", "tel"]
        extra_kwargs = {"paswword": {"write_only": True}}

    