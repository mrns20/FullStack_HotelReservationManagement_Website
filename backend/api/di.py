from injector import Module, Binder, singleton
from .services import (
    ClientService, StaffService, MessageService,
    RoomService, BookingService, PaymentService, LoginService
)
from .repositories import (
    ClientRepository, StaffRepository, MessageRepository,
    RoomRepository, BookingRepository, PaymentRepository
)
from .views_staff import StaffView


class RepositoryModule(Module):
    def configure(self, binder: Binder):
        binder.bind(ClientRepository, to=ClientRepository, scope=singleton)
        binder.bind(StaffRepository, to=StaffRepository, scope=singleton)
        binder.bind(MessageRepository, to=MessageRepository, scope=singleton)
        binder.bind(RoomRepository, to=RoomRepository, scope=singleton)
        binder.bind(BookingRepository, to=BookingRepository, scope=singleton)
        binder.bind(PaymentRepository, to=PaymentRepository, scope=singleton)


class ServiceModule(Module):
    def configure(self, binder: Binder):
        binder.bind(ClientService, to=ClientService, scope=singleton)
        binder.bind(StaffService, to=StaffService, scope=singleton)
        binder.bind(MessageService, to=MessageService, scope=singleton)
        binder.bind(RoomService, to=RoomService, scope=singleton)
        binder.bind(BookingService, to=BookingService, scope=singleton)
        binder.bind(PaymentService, to=PaymentService, scope=singleton)
        binder.bind(LoginService, to=LoginService, scope=singleton)


class ViewModule(Module):
    def configure(self, binder: Binder):
        binder.bind(StaffView, to=StaffView, scope=singleton)


def configure(binder: Binder):
    binder.install(RepositoryModule())
    binder.install(ServiceModule())
    binder.install(ViewModule())
