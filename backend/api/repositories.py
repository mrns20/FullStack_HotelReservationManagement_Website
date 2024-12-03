# Επίπεδο Data Access
# - Επικοινωνεί με τα models
# - Χειρίζεται τη ΒΔ

from .models import Client, Staff, Message, Room


class ClientRepository:
    def get_all_clients(self):
        return Client.objects.all()

    def create_client(self, data):
        return Client.objects.create(**data)


class StaffRepository:
    def get_all_staff(self):
        return Staff.objects.all()

    def create_staff(self, data):
        return Staff.objects.create(**data)


class MessageRepository:
    def get_all_messages(self):
        return Message.objects.all()

    def create_message(self, data):
        return Message.objects.create(**data)


class RoomRepository:
    def get_all(self):
        return Room.objects.all()

    def get_by_id(self, r_id):
        return Room.objects.get(r_id=r_id)