from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .serializers import LoginSerializer

from .models import Client, Staff, Message
from .serializers import (
    ClientSerializer,
    StaffSerializer,
    MessageSerializer
)


class ClientListCreateView(generics.CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]


class StaffListCreateView(generics.CreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [AllowAny]


class MessageListCreateView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]


'''
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


class LoginView(APIView):
    def post(self, request):
        # Χρησιμοποιούμε τον LoginSerializer για να επικυρώσουμε τα δεδομένα
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():  # Ελέγχουμε αν τα δεδομένα είναι έγκυρα
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            # Χρησιμοποιούμε την custom authenticate συνάρτηση για να βρούμε τον Client
            client = authenticate_client(username=username, password=password)

            if client:
                # Αν βρούμε τον Client, δημιουργούμε τα token
                refresh = RefreshToken.for_user(client)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'client': ClientSerializer(client).data
                    # Χρησιμοποιούμε το ClientSerializer για τα δεδομένα του client
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Αν τα δεδομένα δεν είναι έγκυρα, επιστρέφουμε τα σφάλματα του serializer
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''