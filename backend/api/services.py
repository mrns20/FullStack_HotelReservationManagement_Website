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

    # χρειάζεται στην PaymentPage.tsx
    def get_last_booking(self):
        return self.booking_repository.get_last_booking()




class PaymentService:
    @inject
    def __init__(self, payment_repository: PaymentRepository):
        self.payment_repository = payment_repository

    def create_payment(self, data):
        bookings = data.pop('bookings', None)  # Παίρνουμε τα bookings από το αίτημα
        total_cost = 0

        if bookings:
            booking_ids = []
            for booking in bookings:
                try:
                    # Εξασφαλίζουμε ότι παίρνουμε το σωστό αντικείμενο και το ID
                    if isinstance(booking, Booking):
                        booking_instance = booking
                    else:
                        booking_instance = Booking.objects.get(b_id=booking)

                    booking_ids.append(booking_instance.b_id)

                    # Υπολογισμός κόστους
                    num_days = (booking_instance.departure - booking_instance.arrival).days
                    room = Room.objects.get(r_id=booking_instance.room.r_id)
                    booking_cost = num_days * room.r_cost
                    total_cost += booking_cost
                except Booking.DoesNotExist:
                    raise ValueError(f"Booking with ID {booking} does not exist.")
                except Room.DoesNotExist:
                    raise ValueError(f"Room for Booking ID {booking_instance.b_id} does not exist.")
        else:
            print("No bookings provided. Skipping cost calculation.")

        # Ορισμός του συνολικού κόστους
        data['cost'] = total_cost or 0
        payment = self.payment_repository.create_payment(data)

        if bookings:
            # Χρησιμοποιούμε τα IDs αντί για αντικείμενα(για να μην υπάρχουν errors στο frontend)
            payment.bookings.set(booking_ids)
        return payment


    def get_all_payments(self):
        return self.payment_repository.get_all_payments()

    def get_payment_by_id(self, p_id):
        return self.payment_repository.get_payment_by_id(p_id)
