# Επίπεδο Controllers
# - Χειρίζονται HTTP αιτήματα και απαντήσεις
# - Καταναλώνουν τις services και τις παρέχουν στο API για επεξεργασία

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect

from .services import ClientService, StaffService, MessageService, RoomService, LoginService, BookingService, \
    PaymentService, LoginStaffService
from .serializers import ClientSerializer, StaffSerializer, MessageSerializer, RoomSerializer, LoginSerializer, \
    BookingSerializer, PaymentSerializer, LoginStaffSerializer
from .repositories import ClientRepository, StaffRepository, MessageRepository, RoomRepository, BookingRepository, \
    PaymentRepository


# ClientListCreateView - Δημιουργία και Λήψη Πελατών
class ClientListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.client_service = ClientService(ClientRepository())

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
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.staff_service = StaffService(StaffRepository())

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
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.message_service = MessageService(MessageRepository())

    def get(self, request):
        # Λήψη όλων των μηνυμάτων
        messages = self.message_service.get_all_messages()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Δημιουργία νέου μηνύματος
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            # Δημιουργία μηνύματος μέσω της υπηρεσίας
            message = self.message_service.create_message(serializer.validated_data)
            return Response(MessageSerializer(message).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# RoomListView - Λήψη όλων των δωματίων
class RoomListView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.room_service = RoomService(RoomRepository())

    def get(self, request):
        # Λήψη όλων των δωματίων
        rooms = self.room_service.get_all_rooms()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


# RoomDetailView - Λήψη συγκεκριμένου δωματίου
class RoomDetailView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.room_service = RoomService(RoomRepository())

    def get(self, request, r_id):
        # Λήψη δωματίου με βάση το r_id
        room = self.room_service.get_room_by_id(r_id)
        serializer = RoomSerializer(room)
        return Response(serializer.data)


# Login Πελατών
class LoginView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.login_service = LoginService(ClientRepository())

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            client = self.login_service.authenticate(username, password)
            if client:
                refresh = RefreshToken.for_user(client)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'client': ClientSerializer(client).data
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Login Υπαλλήλων
class LoginStaffView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.login_staff_service = LoginStaffService(StaffRepository())
   

    def post(self, request):
        serializer = LoginStaffSerializer(data=request.data)
        if serializer.is_valid():
            s_email = serializer.validated_data['s_email']
            s_password = serializer.validated_data['s_password']
            staff = self.login_staff_service.authenticate(s_email, s_password)
            if staff:
                refresh = RefreshToken.for_user(staff)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'staff': StaffSerializer(staff).data
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Booking 1)
class CheckAvailabilityView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.room_service = RoomService(room_repository=RoomRepository())

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
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.booking_service = BookingService(
            booking_repository=BookingRepository(),
            room_repository=RoomRepository()
        )
        self.login_service = LoginService(client_repository=ClientRepository())

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        arrival = request.data.get('arrival')
        departure = request.data.get('departure')
        capacity = request.data.get('capacity')
        rooms_needed = request.data.get('rooms_needed')

        # Postman testing
        print(f"Received data: {request.data}")

        client = self.login_service.authenticate(username, password)  # ελέγχουμε ότι έχει προηγηθεί το Login
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
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.payment_service = PaymentService(payment_repository=PaymentRepository())

    def post(self, request, *args, **kwargs):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = request.data
            print(f"Validated Data: {validated_data}")  # Postman testing
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
