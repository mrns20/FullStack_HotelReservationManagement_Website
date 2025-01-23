# Επίπεδο Data Access
# - Επικοινωνεί με τα models
# - Χειρίζεται τη ΒΔ

from .models import Client, Staff, Message, Room, Booking, Payment
from injector import inject


class ClientRepository:
    @inject
    def __init__(self):
        pass

    def get_by_username(self, username):  # χρειάζεται για το Booking
        return Client.objects.get(username=username)

    def get_all_clients(self):
        return Client.objects.all()

    def create_client(self, data):
        return Client.objects.create(**data)


class StaffRepository:
    @inject
    def __init__(self):
        pass

    def get_all_staff(self):
        return Staff.objects.all()

    def create_staff(self, data):
        return Staff.objects.create(**data)


class MessageRepository:
    @inject
    def __init__(self):
        pass

    def get_all_messages(self):
        return Message.objects.all()

    def create_message(self, data):
        return Message.objects.create(**data)


class RoomRepository:
    @inject
    def __init__(self):
        pass

    def get_all(self):
        return Room.objects.all()

    def get_by_id(self, r_id):
        return Room.objects.get(r_id=r_id)

    def get_available_rooms(self, capacity, arrival, departure):  # χρειάζεται για το Booking
        rooms = Room.objects.filter(capacity__gte=capacity, availability='yes')

        available_rooms = []
        for room in rooms:
            bookings = Booking.objects.filter(
                room=room,
                arrival__lt=departure,
                departure__gt=arrival
            )
            if not bookings.exists():
                available_rooms.append(room)

        return available_rooms


class BookingRepository:
    @inject
    def __init__(self):
        pass

    def create_booking(self, data):
        return Booking.objects.create(**data)

    def get_bookings_by_room_and_date(self, room, arrival, departure):
        return Booking.objects.filter(
            room=room,
            arrival__lte=departure,
            departure__gte=arrival
        )

    # χρειάζεται στην PaymentPage.tsx
    def get_last_booking(self):
        return Booking.objects.latest('b_id')


class PaymentRepository:
    @inject
    def __init__(self):
        pass

    def create_payment(self, data):
        payment = Payment.objects.create(**data)
        return payment

    def get_all_payments(self):
        return Payment.objects.all()

    def get_payment_by_id(self, p_id):
        return Payment.objects.get(p_id=p_id)
