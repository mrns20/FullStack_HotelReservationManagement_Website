# Επίπεδο Controllers
# - Χειρίζονται HTTP αιτήματα και απαντήσεις
# - Καταναλώνουν τις services και τις παρέχουν στο API για επεξεργασία

from django.contrib.auth.hashers import check_password
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .services import ClientService, StaffService, MessageService, RoomService, LoginService
from .serializers import ClientSerializer, StaffSerializer, MessageSerializer, RoomSerializer, LoginSerializer
from .repositories import ClientRepository, StaffRepository, MessageRepository, RoomRepository
from .models import Client


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
