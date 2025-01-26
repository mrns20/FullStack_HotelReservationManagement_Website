'''

import pytest
from datetime import datetime, timedelta
from django.urls import reverse
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_backend_integration_scenario():
    client = APIClient()

    # 1. Δημιουργία Πελάτη
    create_client_url = reverse('client-list-create')
    client_data = {
        "username": "newclient1",
        "email": "newclient1@otenet.gr",
        "password": "Password1$",
        "first_name": "Νέος",
        "last_name": "Πελάτης",
        "tel": "6991919191"
    }
    create_client_response = client.post(create_client_url, client_data)
    assert create_client_response.status_code == 201
    assert 'id' in create_client_response.data
    client_id = create_client_response.data.get('id')

    # 2. Δημιουργία Υπαλλήλου
    create_staff_url = reverse('staff-list-create')
    staff_data = {
        "s_email": "newstaff1@hoteldmd.gr",
        "s_password": "Staff2$",
        "s_firstname": "Φίλιπ",
        "s_lastname": "Τζούρισιτς",
        "s_tel": "6911111119",
        "salary": "2000",
        "job_descr": "Reception"
    }
    create_staff_response = client.post(create_staff_url, staff_data)
    assert create_staff_response.status_code == 201
    assert 'id' in create_staff_response.data
    staff_id = create_staff_response.data.get('id')

    # 3. Login Πελάτη
    login_url = reverse('client-login')
    login_data = {
        "username": client_data['username'],
        "password": client_data['password']
    }
    login_response = client.post(login_url, login_data)
    assert login_response.status_code == 200
    access_token = login_response.data.get('access')
    refresh_token = login_response.data.get('refresh')
    assert access_token is not None

    # 4. Λήψη όλων των Δωματίων
    room_list_url = reverse('room-list')
    room_list_response = client.get(room_list_url, HTTP_AUTHORIZATION=f'Bearer {access_token}')
    assert room_list_response.status_code == 200
    assert len(room_list_response.data) > 0

    # 5. Έλεγχος Διαθεσιμότητας
    check_availability_url = reverse('check-availability')
    arrival_date = datetime.now().date()
    departure_date = (datetime.now() + timedelta(days=1)).date()
    availability_data = {
        "arrival": str(arrival_date),
        "departure": str(departure_date),
        "capacity": 2,
        "rooms_needed": 1
    }
    availability_response = client.post(check_availability_url, availability_data,
                                        HTTP_AUTHORIZATION=f'Bearer {access_token}')
    assert availability_response.status_code == 200
    assert availability_response.data['message'] == "Room(s) available"

    # 6. Δημιουργία Κράτησης
    modify_reservation_url = reverse('modify-reservation')
    booking_data = {
        "username": client_data['username'],
        "password": client_data['password'],
        "arrival": str(arrival_date),
        "departure": str(departure_date),
        "capacity": 2,
        "rooms_needed": 1
    }
    booking_response = client.post(modify_reservation_url, booking_data, HTTP_AUTHORIZATION=f'Bearer {access_token}')
    assert booking_response.status_code == 201
    assert "Booking successful" in booking_response.data['message']

    # 7. Επιστροφή Τελευταίας Κράτησης
    last_booking_url = reverse('last-booking')
    last_booking_response = client.get(last_booking_url, HTTP_AUTHORIZATION=f'Bearer {access_token}')
    assert last_booking_response.status_code == 200
    last_booking_id = last_booking_response.data['last_b_id']
    assert last_booking_id is not None

    # 8. Δημιουργία Πληρωμής
    payment_url = reverse('payment')
    payment_data = {
        "bookings": last_booking_id,
        "number": "1234567812341111",
        "name": "NEW CLIENT",
        "month_year": "12/25",
        "cvv": "999"
    }
    payment_response = client.post(payment_url, payment_data, HTTP_AUTHORIZATION=f'Bearer {access_token}')
    assert payment_response.status_code == 201
    assert "Payment successful" in payment_response.data['message']

    # 9. Δημιουργία και Λήψη Μηνυμάτων
    message_create_url = reverse('message-list-create')
    message_data = {
        "m_email": "newclient1@otenet.gr",
        "m_firstname": "Νέος",
        "m_lastname": "Πελάτης",
        "m_tel": "6991919191",
        "message": "I have a question about my booking."
    }
    create_message_response = client.post(message_create_url, message_data, HTTP_AUTHORIZATION=f'Bearer {access_token}')
    assert create_message_response.status_code == 201

    # Λήψη όλων των μηνυμάτων
    get_messages_response = client.get(message_create_url, HTTP_AUTHORIZATION=f'Bearer {access_token}')
    assert get_messages_response.status_code == 200
    assert len(get_messages_response.data) > 0
    assert any(msg['message'] == message_data['message'] for msg in get_messages_response.data)
    '''
