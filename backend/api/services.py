# Επίπεδο Business Logic
# Οι υπηρεσίες(services) επεξεργάζονται τα δεδομένα και χειρίζονται την επιχειρησιακή λογική,
# πριν επιστρέψουν τα δεδομένα στο χρήστη.

from injector import inject
from .repositories import (
    ClientRepository, StaffRepository, MessageRepository,
    RoomRepository, BookingRepository, PaymentRepository
)
from .models import Client, Booking, Room


class ClientService:
    @inject
    def __init__(self, client_repository: ClientRepository):
        self.client_repository = client_repository

    def get_all_clients(self):
        return self.client_repository.get_all_clients()

    def create_client(self, data):
        return self.client_repository.create_client(data)


class StaffService:
    @inject
    def __init__(self, staff_repository: StaffRepository):
        self.staff_repository = staff_repository

    def get_all_staff(self):
        return self.staff_repository.get_all_staff()

    def create_staff(self, data):
        return self.staff_repository.create_staff(data)


class MessageService:
    @inject
    def __init__(self, message_repository: MessageRepository):
        self.message_repository = message_repository

    def get_all_messages(self):
        return self.message_repository.get_all_messages()

    def create_message(self, data):
        return self.message_repository.create_message(data)


def authenticate_client(username, password):
    try:
        # Αναζητούμε τον Client με το συγκεκριμένο username
        client = Client.objects.get(username=username)

        # Ελέγχουμε αν το password είναι σωστό
        if password == client.password:
            return client
        return None
    except Client.DoesNotExist:
        return None


class LoginService:
    @inject
    def __init__(self, client_repository: ClientRepository):
        self.client_repository = client_repository

    def authenticate(self, username, password):
        return authenticate_client(username, password)


class RoomService:
    @inject
    def __init__(self, room_repository: RoomRepository):
        self.room_repository = room_repository

    def get_all_rooms(self):
        return self.room_repository.get_all()

    def get_room_by_id(self, r_id):
        return self.room_repository.get_by_id(r_id)

    def get_available_rooms(self, capacity, arrival, departure):
        return self.room_repository.get_available_rooms(capacity, arrival, departure)


class BookingService:
    @inject
    def __init__(self, booking_repository: BookingRepository, room_repository: RoomRepository):
        self.booking_repository = booking_repository
        self.room_repository = room_repository

    def create_booking(self, client, capacity, arrival, departure, rooms_needed):
        available_rooms = self.room_repository.get_available_rooms(capacity, arrival, departure)  # !!!

        if available_rooms is None or len(available_rooms) < rooms_needed:  # έλεγχος
            return None, "Not enough rooms available"

        bookings = []
        for room in available_rooms[:rooms_needed]:
            booking_data = {
                'client': client,  # foreign-key
                'room': room,  # foreign-key
                'arrival': arrival,
                'departure': departure,
                'rooms_needed': rooms_needed  # για κρατήσεις πολλών δωματίων από έναν client(την ίδια χρονική στιγμή)
            }
            booking = self.booking_repository.create_booking(booking_data)  # !!!
            room.availability = 'no'  # Πεδίο availability του συγκεκριμένου room στον πίνακα Room: yes->no
            room.save()
            bookings.append(booking)

        return bookings, "Booking successful"


class PaymentService:
    @inject
    def __init__(self, payment_repository: PaymentRepository):
        self.payment_repository = payment_repository

    def create_payment(self, data):
        bookings = data.pop('bookings')
        print(f"Bookings: {bookings}")  # Postman Testing

        total_cost = 0
        for b_id in bookings:
            booking_instance = Booking.objects.get(b_id=b_id)
            num_days = (booking_instance.departure - booking_instance.arrival).days
            room = Room.objects.get(r_id=booking_instance.room.r_id)
            booking_cost = num_days * room.r_cost  # Υπολογισμός του cost
            print(
                f"Booking ID: {b_id}, Num Days: {num_days}, Room Cost: {room.r_cost}, Booking Cost: {booking_cost}")  # Postman Testing
            total_cost += booking_cost

        print(f"Total Cost: {total_cost}")  # Postman Testing

        data['cost'] = total_cost
        payment = self.payment_repository.create_payment(data)  # !!!
        payment.bookings.set(bookings)
        return payment

    def get_all_payments(self):
        return self.payment_repository.get_all_payments()

    def get_payment_by_id(self, p_id):
        return self.payment_repository.get_payment_by_id(p_id)
