# FullStack_HotelReservationManagement_Website

The Hotel Reservation Management System is a full-stack web application designed to streamline hotel reservations, bookings, and management tasks. It provides a user-friendly interface for customers to book rooms and for hotel staff to manage reservations, customers, and room availability.
This is a joint collaboration project developed by ΜΑΡΙΝΟ ΤΣΕΛΑΝΙ, ΔΗΜΗΤΡΙΟΣ ΓΟΥΡΔΟΜΙΧΑΛΗΣ & ΔΗΜΗΤΡΙΟΣ ΣΤΕΦΑΝΟΥ αs part of the 'Ειδικά θέματα Τεχνολογίας Λογισμικού/Special Topics in Software Engineering' course,in the University of West Attica.
This project was built in 2024/2025 using Django (Python) for the backend and React.js with typescript for the frontend

## Installation

### Clone the repository :

git clone https://github.com/mrns20/FullStack_HotelReservationManagement_Website.git

---

### Backend Setup (Django)

Navigate to the backend directory:

cd backend

Create and activate a virtual environment:

python -m venv venv
venv\Scripts\activate (for cmd) or venv\Scripts\Activate.ps1 (for powershell)

Install dependencies:

pip install -r requirements.txt

Set up the database:

python manage.py migrate

Start the backend server:

python manage.py runserver

(To create a superuser do:
python manage.py createsuperuser)

---

### Frontend Setup (React.js)

Navigate to the frontend directory:

cd ../my-app

Install dependencies:

npm install

Start the frontend development server:

npm start

---
