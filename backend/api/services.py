# Επίπεδο Business Logic
# Οι υπηρεσίες(services) επεξεργάζονται τα δεδομένα και χειρίζονται την επιχειρησιακή λογική,
# πριν επιστρέψουν τα δεδομένα στο χρήστη.
from django.contrib.auth.hashers import check_password

from .models import Client
from .repositories import ClientRepository, StaffRepository, MessageRepository, RoomRepository


class ClientService:
    def __init__(self, client_repository: ClientRepository):
        self.client_repository = client_repository

    def get_all_clients(self):
        return self.client_repository.get_all_clients()

    def create_client(self, data):
        return self.client_repository.create_client(data)


class StaffService:
    def __init__(self, staff_repository: StaffRepository):
        self.staff_repository = staff_repository

    def get_all_staff(self):
        return self.staff_repository.get_all_staff()

    def create_staff(self, data):
        return self.staff_repository.create_staff(data)


class MessageService:
    def __init__(self, message_repository: MessageRepository):
        self.message_repository = message_repository

    def get_all_messages(self):
        return self.message_repository.get_all_messages()

    def create_message(self, data):
        return self.message_repository.create_message(data)


class RoomService:
    def __init__(self, room_repository: RoomRepository):
        self.room_repository = room_repository

    def get_all_rooms(self):
        return self.room_repository.get_all()

    def get_room_by_id(self, r_id):
        return self.room_repository.get_by_id(r_id)


def authenticate_client(username, password):
    try:
        # Αναζητούμε τον Client με το username
        client = Client.objects.get(username=username)

        # Ελέγχουμε αν το password είναι σωστό
        if password == client.password:
            return client
        return None
    except Client.DoesNotExist:
        return None


class LoginService:
    def __init__(self, client_repository: ClientRepository):
        self.client_repository = client_repository

    def authenticate(self, username, password):
        return authenticate_client(username, password)
