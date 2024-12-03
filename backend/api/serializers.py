from .models import Client, Staff, Message, Room
from rest_framework import serializers


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "username", "email", "password", "firstname", "lastname", "tel"]
        extra_kwargs = {"password": {"write_only": True}}


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ["s_id", "s_email", "s_password", "s_firstname", "s_lastname", "s_tel", "salary", "job_descr",
                  "date_of_joining"]
        extra_kwargs = {"password": {"write_only": True}}


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["m_id", "timestamp", "m_email", "m_firstname", "m_lastname", "m_tel", "message"]


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["r_id", "capacity", "availability", "r_cost"]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
