# Επίπεδο Controllers
# - Χειρίζονται HTTP αιτήματα και απαντήσεις
# - Καταναλώνουν τις services και τις παρέχουν στο API για επεξεργασία

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from injector import inject
from rest_framework_simplejwt.tokens import RefreshToken
from .di import injector

from .services import (
    ClientService, StaffService, MessageService,
    RoomService, BookingService, PaymentService, LoginService
)

from .serializers import ClientSerializer, StaffSerializer, MessageSerializer, RoomSerializer, LoginSerializer, \
    PaymentSerializer


# ClientListCreateView - Δημιουργία και Λήψη Πελατών
class ClientListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.client_service = injector.get(ClientService)  # Dependency Injection
        self.client_serializer = injector.get(ClientSerializer)  # Dependency Injection

    def get(self, request):
        # Λήψη όλων των πελατών
        clients = self.client_service.get_all_clients()
        serializer = self.client_serializer(clients, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Δημιουργία νέου πελάτη
        serializer = self.client_serializer(data=request.data)
        if serializer.is_valid():
            # Δημιουργία πελάτη μέσω της υπηρεσίας
            client = self.client_service.create_client(serializer.validated_data)
            return Response(self.client_serializer(client).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# StaffListCreateView - Δημιουργία και Λήψη Υπαλλήλων
class StaffListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.staff_service = injector.get(StaffService)
        self.staff_serializer = injector.get(StaffSerializer)

    def get(self, request):
        # Λήψη όλων των υπαλλήλων
        staff = self.staff_service.get_all_staff()
        serializer = self.staff_serializer(staff, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Δημιουργία νέου υπαλλήλου
        serializer = self.staff_serializer(data=request.data)
        if serializer.is_valid():
            # Δημιουργία υπαλλήλου μέσω της υπηρεσίας
            staff = self.staff_service.create_staff(serializer.validated_data)
            return Response(self.staff_serializer(staff).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# MessageListCreateView - Δημιουργία και Λήψη Μηνυμάτων
class MessageListCreateView(APIView):
    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.message_service = injector.get(MessageService)
        self.message_serializer = injector.get(MessageSerializer)

    def get(self, request):
        messages = self.message_service.get_all_messages()
        serializer = self.message_serializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.message_serializer(data=request.data)
        if serializer.is_valid():
            message = self.message_service.create_message(serializer.validated_data)
            return Response(self.message_serializer(message).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# RoomListView - Λήψη όλων των δωματίων
class RoomListView(APIView):
    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.room_service = injector.get(RoomService)
        self.room_serializer = injector.get(RoomSerializer)

    def get(self, request):
        rooms = self.room_service.get_all_rooms()
        serializer = self.room_serializer(rooms, many=True)
        return Response(serializer.data)


# RoomDetailView - Λήψη συγκεκριμένου δωματίου
class RoomDetailView(APIView):
    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.room_service = injector.get(RoomService)
        self.room_serializer = injector.get(RoomSerializer)

    def get(self, request, r_id):
        # Λήψη δωματίου με βάση το r_id
        room = self.room_service.get_room_by_id(r_id)
        serializer = self.room_serializer(room)
        return Response(serializer.data)


# Client Login
class LoginView(APIView):
    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.login_service = injector.get(LoginService)
        self.login_serializer = injector.get(LoginSerializer)
        self.client_serializer = injector.get(ClientSerializer)

    def post(self, request):
        serializer = self.login_serializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            client = self.login_service.authenticate(username, password)
            if client:
                refresh = RefreshToken.for_user(client)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'client': self.client_serializer(client).data
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Booking 1)
class CheckAvailabilityView(APIView):
    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.room_service = injector.get(RoomService)

    def post(self, request, *args, **kwargs):
        arrival = request.data.get('arrival')
        departure = request.data.get('departure')
        capacity = request.data.get('capacity')
        rooms_needed = request.data.get('rooms_needed')

        # συνάρτηση get_available_rooms
        available_rooms = self.room_service.get_available_rooms(capacity, arrival, departure)
        if len(available_rooms) >= rooms_needed:
            return Response({"message": "Room(s) available"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Not enough rooms available"}, status=status.HTTP_404_NOT_FOUND)


# Booking 2)
class ModifyReservationView(APIView):
    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.booking_service = injector.get(BookingService)
        self.login_service = injector.get(LoginService)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        arrival = request.data.get('arrival')
        departure = request.data.get('departure')
        capacity = request.data.get('capacity')
        rooms_needed = request.data.get('rooms_needed')

        client = self.login_service.authenticate(username, password)
        if not client:
            return Response({"message": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)

        # συνάρτηση create_booking
        bookings, message = self.booking_service.create_booking(client, capacity, arrival, departure, rooms_needed)
        if bookings:
            return Response({"message": message}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)


# Payment
class PaymentView(APIView):
    @inject
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.payment_service = injector.get(PaymentService)
        self.payment_serializer = injector.get(PaymentSerializer)

    def post(self, request, *args, **kwargs):
        serializer = self.payment_serializer(data=request.data)
        if serializer.is_valid():
            validated_data = request.data
            # συνάρτηση create_payment
            payment = self.payment_service.create_payment(validated_data)
            response_data = self.payment_serializer(payment).data
            response_data['message'] = f"Payment successful. Total cost: {response_data['cost']} €"
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        payments = self.payment_service.get_all_payments()
        serializer = self.payment_serializer(payments, many=True)
        return Response(serializer.data)
