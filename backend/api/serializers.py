from .models import Client, Staff
from rest_framework import serializers


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["c_id", "email", "password", "firstname", "lastname", "tel"]
        extra_kwargs = {"password": {"write_only": True}}


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ["s_id", "s_email", "s_password", "s_firstname", "s_lastname", "s_tel", "salary", "job_descr",
                  "date_of_joining"]
        extra_kwargs = {"password": {"write_only": True}}


