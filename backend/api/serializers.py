from rest_framework import serializers
from .models import Client, Staff, Message, Room, Booking, Payment
from injector import inject


class ClientSerializer(serializers.ModelSerializer):
    @inject
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Client
        fields = ["id", "username", "email", "password", "firstname", "lastname", "tel"]
        extra_kwargs = {"password": {"write_only": True}}


class StaffSerializer(serializers.ModelSerializer):
    @inject
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Staff
        fields = ["s_id", "s_email", "s_password", "s_firstname", "s_lastname", "s_tel", "salary", "job_descr",
                  "date_of_joining"]
        extra_kwargs = {"password": {"write_only": True}}


class MessageSerializer(serializers.ModelSerializer):
    @inject
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Message
        fields = ["m_id", "timestamp", "m_email", "m_firstname", "m_lastname", "m_tel", "message"]


class RoomSerializer(serializers.ModelSerializer):
    @inject
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Room
        fields = ["r_id", "capacity", "availability", "r_cost"]


class LoginSerializer(serializers.Serializer):
    @inject
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class BookingSerializer(serializers.ModelSerializer):
    @inject
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Booking
        fields = ["b_id", "client", "room", "arrival", "departure", "rooms_needed"]


class PaymentSerializer(serializers.ModelSerializer):
    @inject
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    # ManyToManyField
    bookings = serializers.PrimaryKeyRelatedField(queryset=Booking.objects.all(), many=True)

    class Meta:
        model = Payment
        fields = ['p_id','bookings', 'cost', 'number', 'name', 'month_year', 'CVV']
        extra_kwargs = {  # Το cost υπολογίζεται μέσω του PaymentService(και της εισόδου του client)
            'cost': {'required': False}
        }
