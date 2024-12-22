# Επίπεδο Controllers
# - Χειρίζονται HTTP αιτήματα και απαντήσεις
# - Καταναλώνουν τις services και τις παρέχουν στο API για επεξεργασία

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from injector import inject
from rest_framework_simplejwt.tokens import RefreshToken

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
    def __init__(self, client_service: ClientService, **kwargs):
        super().__init__(**kwargs)
        self.client_service = client_service

    def get(self, request):
        # Λήψη όλων των πελατών
        clients = self.client_service.get_all_clients()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Δημιουργία νέου πελάτη
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            # Δημιουργία πελάτη μέσω της υπηρεσίας
            client = self.client_service.create_client(serializer.validated_data)
            return Response(ClientSerializer(client).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# StaffListCreateView - Δημιουργία και Λήψη Υπαλλήλων
class StaffListCreateView(APIView):
    @inject
    def __init__(self, staff_service: StaffService, **kwargs):
        super().__init__(**kwargs)
        self.staff_service = staff_service

    def get(self, request):
        # Λήψη όλων των υπαλλήλων
        staff = self.staff_service.get_all_staff()
        serializer = StaffSerializer(staff, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Δημιουργία νέου υπαλλήλου
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            # Δημιουργία υπαλλήλου μέσω της υπηρεσίας
            staff = self.staff_service.create_staff(serializer.validated_data)
            return Response(StaffSerializer(staff).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# MessageListCreateView - Δημιουργία και Λήψη Μηνυμάτων
class MessageListCreateView(APIView):
    @inject
    def __init__(self, message_service: MessageService, **kwargs):
        super().__init__(**kwargs)
        self.message_service = message_service

    def get(self, request):
        messages = self.message_service.get_all_messages()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            message = self.message_service.create_message(serializer.validated_data)
            return Response(MessageSerializer(message).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# RoomListView - Λήψη όλων των δωματίων
class RoomListView(APIView):
    @inject
    def __init__(self, room_service: RoomService, **kwargs):
        super().__init__(**kwargs)
        self.room_service = room_service

    def get(self, request):
        rooms = self.room_service.get_all_rooms()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


# RoomDetailView - Λήψη συγκεκριμένου δωματίου
class RoomDetailView(APIView):
    @inject
    def __init__(self, room_service: RoomService, **kwargs):
        super().__init__(**kwargs)
        self.room_service = room_service

    def get(self, request, r_id):
        # Λήψη δωματίου με βάση το r_id
        room = self.room_service.get_room_by_id(r_id)
        serializer = RoomSerializer(room)
        return Response(serializer.data)


# Client Login
class LoginView(APIView):
    @inject
    def __init__(self, login_service: LoginService, **kwargs):
        super().__init__(**kwargs)
        self.login_service = login_service

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            client = self.login_service.authenticate(username, password)
            if client:
                refresh = RefreshToken.for_user(client)
                return Response({
                    'refresh': str(refresh),  # !!!
                    'access': str(refresh.access_token),  # !!!
                    'client': ClientSerializer(client).data  # !!!
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Booking 1)
class CheckAvailabilityView(APIView):
    @inject
    def __init__(self, room_service: RoomService, **kwargs):
        super().__init__(**kwargs)
        self.room_service = room_service

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
    def __init__(self, booking_service: BookingService, login_service: LoginService, **kwargs):
        super().__init__(**kwargs)
        self.booking_service = booking_service
        self.login_service = login_service

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
    def __init__(self, payment_service: PaymentService, **kwargs):
        super().__init__(**kwargs)
        self.payment_service = payment_service

    def post(self, request, *args, **kwargs):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = request.data
            # συνάρτηση create_payment
            payment = self.payment_service.create_payment(validated_data)
            response_data = PaymentSerializer(payment).data
            response_data['message'] = f"Payment successful. Total cost: {response_data['cost']} €"
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        payments = self.payment_service.get_all_payments()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
