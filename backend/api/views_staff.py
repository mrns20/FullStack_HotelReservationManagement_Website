from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Staff, Booking, Payment, Room
from .forms import StaffLoginForm
from django.shortcuts import render, get_object_or_404

# Το αρχείο δημιουργήθηκε με τέτοιο τρόπο ώστε να μην πειραχθεί καθόλου ο υπόλοιπος κώδικας.

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import StaffLoginForm
from .services import StaffService, BookingService, PaymentService, RoomService


# Το αρχείο δημιουργήθηκε με τέτοιο τρόπο ώστε να μην πειραχθεί καθόλου ο υπόλοιπος κώδικας.

class StaffView:
    def __init__(self, staff_service: StaffService, booking_service: BookingService, payment_service: PaymentService,
                 room_service: RoomService):
        self.staff_service = staff_service
        self.booking_service = booking_service
        self.payment_service = payment_service
        self.room_service = room_service


def staff_login(request):
    if request.method == 'POST':
        form = StaffLoginForm(request.POST)  # Χρήση της φόρμας
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            try:
                # Μόνο η Reception έχει δικαίωμα προβολής και επεξεργασίας
                staff = Staff.objects.get(s_email=email, s_password=password, job_descr='Reception')
                if staff:
                    request.session['staff_id'] = staff.s_id  # Save staff ID in session
                    return redirect('staff_dashboard')
            except Staff.DoesNotExist:
                messages.error(request, 'Invalid login credentials or insufficient permissions.')
    else:
        form = StaffLoginForm()
    return render(request, 'staff/staff_login.html', {'form': form})  # !!!


# Για την εμφάνιση στο /staff/dashboard/
def mask_card_number(number):
    # Εμφάνιση των 4 πρώτων και των 4 τελευταίων ψηφίων
    return number[:4] + '*' * (len(number) - 8) + number[-4:]


def mask_expiry_and_cvv():
    return '***'


def staff_dashboard(request):
    if 'staff_id' not in request.session:
        return redirect('staff_login')  # αρχείο staff_login.html

    staff_id = request.session['staff_id']  # !!!
    try:
        staff = Staff.objects.get(pk=staff_id, job_descr='Reception')  # !!!
    except Staff.DoesNotExist:
        messages.error(request, 'Invalid permissions.')
        return redirect('staff_login')

    bookings = Booking.objects.all()  # !!!
    payments = Payment.objects.all()  # !!!

    # Για την εμφάνιση(masked == "*") στο /staff/dashboard/
    for payment in payments:
        payment.masked_number = mask_card_number(payment.number)
        payment.masked_month_year = mask_expiry_and_cvv()
        payment.masked_cvv = mask_expiry_and_cvv()

    context = {
        'bookings': bookings,
        'payments': payments,
    }

    if 'r_id' in request.GET:
        # Προβολή ιστορικού συγκεκριμένου δωματίου(αναζήτηση με το r_id)
        r_id = request.GET.get('r_id')
        room = get_object_or_404(Room, r_id=r_id)
        room_bookings = Booking.objects.filter(room=room).order_by('-arrival')  # !!!
        context['room_history'] = room_bookings
        context['room_id'] = r_id

    # αρχείο staff_dashboard.html
    return render(request, 'staff/staff_dashboard.html', context)


def delete_booking(request, booking_id):
    if 'staff_id' not in request.session:
        return redirect('staff_login')

    staff_id = request.session['staff_id']
    try:
        staff = Staff.objects.get(pk=staff_id, job_descr='Reception')
    except Staff.DoesNotExist:
        messages.error(request, 'Invalid permissions.')
        return redirect('staff_login')

    booking = Booking.objects.get(pk=booking_id)  # !!!
    booking.delete()  # !!!
    messages.success(request, 'Booking deleted successfully.')
    return redirect('staff_dashboard')
