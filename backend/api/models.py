from django.db import models
from django.core.validators import RegexValidator
from jsonschema.exceptions import ValidationError


# Validators
def email_validator(value):
    if value.endswith('@hoteldmd.gr'):
        raise ValidationError('Clients cannot have email addresses ending with @hoteldmd.gr')


password_validator = RegexValidator(
    regex=r'^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':",.<>\/?]{8,12}$',
    message='Password must be 8-12 characters long and contain only valid characters.'
)

greek_name_validator = RegexValidator(
    regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$',
    message='Name must contain only Greek letters.'
)

tel_validator = RegexValidator(
    regex=r'^[0-9]+$',
    message='Telephone number must contain only digits.'
)

job_descr_validator = RegexValidator(regex=r'^(Reception|Administrator|Programmer)$', message='Invalid job description')
availability_validator = RegexValidator(regex=r'^(yes|no)$', message='Invalid availability status')


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, unique=True, default='defaultus')
    email = models.CharField(max_length=50, unique=True, validators=[email_validator])
    password = models.CharField(max_length=12, validators=[password_validator])
    firstname = models.CharField(max_length=15, validators=[greek_name_validator])
    lastname = models.CharField(max_length=15, validators=[greek_name_validator])
    tel = models.CharField(max_length=10, validators=[tel_validator])

    class Meta:
        db_table = 'Client'

        constraints = [
            models.CheckConstraint(check=models.Q(username__regex=r'^[a-zA-Z0-9)]{3,20}$'), name='chk_username'),
            models.CheckConstraint(
                check=models.Q(password__regex=r'^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':",.<>\/?]{8,12}$'),
                name='chk_password'),
            models.CheckConstraint(check=models.Q(firstname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_firstname'),
            models.CheckConstraint(check=models.Q(lastname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_lastname'),
            models.CheckConstraint(check=models.Q(tel__regex=r'^[0-9]+$'), name='chk_tel')
        ]


class Staff(models.Model):
    s_id = models.AutoField(primary_key=True)
    s_email = models.CharField(max_length=40, unique=True)
    s_password = models.CharField(max_length=12, validators=[password_validator])
    s_firstname = models.CharField(max_length=15, validators=[greek_name_validator])
    s_lastname = models.CharField(max_length=15, validators=[greek_name_validator])
    s_tel = models.CharField(max_length=10, validators=[tel_validator])
    salary = models.IntegerField()
    job_descr = models.CharField(max_length=20, validators=[job_descr_validator])
    date_of_joining = models.DateField()

    class Meta:
        db_table = 'Staff'

        constraints = [
            models.CheckConstraint(
                check=models.Q(s_email__regex=r'^[^@]+@hoteldmd\.gr$'),
                name='chk_s_email'),
            models.CheckConstraint(
                check=models.Q(s_password__regex=r'^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':",.<>\/?]{8,12}$'),
                name='chk_s_password'),
            models.CheckConstraint(check=models.Q(s_firstname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'),
                                   name='chk_s_firstname'),
            models.CheckConstraint(check=models.Q(s_lastname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'),
                                   name='chk_s_lastname'),
            models.CheckConstraint(check=models.Q(s_tel__regex=r'^[0-9]+$'), name='chk_s_tel'),
            models.CheckConstraint(check=models.Q(job_descr__in=['Reception', 'Administrator', 'Programmer']),
                                   name='chk_job_descr')
        ]


class Message(models.Model):
    m_id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    m_email = models.CharField(max_length=30)
    m_firstname = models.CharField(max_length=15, validators=[greek_name_validator])
    m_lastname = models.CharField(max_length=15, validators=[greek_name_validator])
    m_tel = models.CharField(max_length=10, validators=[tel_validator])
    message = models.TextField()

    class Meta:
        db_table = 'Message'

        constraints = [
            models.CheckConstraint(check=models.Q(m_email__regex=r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'),
                                   name='chk_m_email'),
            models.CheckConstraint(check=models.Q(m_firstname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'),
                                   name='chk_m_firstname'),
            models.CheckConstraint(check=models.Q(m_lastname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'),
                                   name='chk_m_lastname'),
            models.CheckConstraint(check=models.Q(m_tel__regex=r'^[0-9]+$'), name='chk_m_tel')
        ]


class Room(models.Model):
    r_id = models.CharField(max_length=3, primary_key=True)
    capacity = models.IntegerField(choices=[(2, '2'), (3, '3'), (4, '4')])
    availability = models.CharField(max_length=3, validators=[availability_validator])
    r_cost = models.IntegerField()

    class Meta:
        db_table = 'Room'

        constraints = [
            models.CheckConstraint(check=models.Q(capacity__in=[2, 3, 4]), name='chk_capacity'),
            models.CheckConstraint(check=models.Q(availability__in=['yes', 'no']), name='chk_availability')
        ]


class Booking(models.Model):
    b_id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)  # foreign key
    room = models.ForeignKey(Room, on_delete=models.CASCADE)  # foreign key
    arrival = models.DateField()
    departure = models.DateField()
    rooms_needed = models.IntegerField()  # για κρατήσεις πολλών δωματίων από έναν client(την ίδια χρονική στιγμή)

    class Meta:
        db_table = 'Booking'

        constraints = [
            models.CheckConstraint(check=models.Q(arrival__lt=models.F('departure')),
                                   name='chk_arrival_before_departure'),
            models.CheckConstraint(check=models.Q(rooms_needed__in=[1, 2, 3]), name='chk_rooms_needed'),
        ]


class Payment(models.Model):
    p_id = models.AutoField(primary_key=True)
    bookings = models.ManyToManyField(Booking)  # ManyToManyField:Δημιουργία ενδιάμεσου πίνακα Payment_bookings
    cost = models.DecimalField(max_digits=6, decimal_places=2)
    number = models.CharField(max_length=16, validators=[
        RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed')])
    name = models.CharField(max_length=30, validators=[
        RegexValidator(regex=r'^[A-Z ]+$', message='Only uppercase English letters and spaces are allowed')])
    month_year = models.CharField(max_length=7, validators=[
        RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed')])
    CVV = models.CharField(max_length=3, validators=[
        RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed')])

    class Meta:
        db_table = 'Payment'

        constraints = [
            models.CheckConstraint(check=models.Q(number__regex=r'^[0-9]+$'), name='chk_number'),
            models.CheckConstraint(check=models.Q(name__regex=r'^[A-Z ]+$'), name='chk_name'),
            models.CheckConstraint(check=models.Q(month_year__regex=r'^[0-9]+$'), name='chk_month_year'),
            models.CheckConstraint(check=models.Q(CVV__regex=r'^[0-9]+$'), name='chk_CVV')
        ]


# ΜΗ ΒΓΑΛΕΤΕ ΤΑ ΣΧΟΛΙΑ στο παρακάτω
''' 
rooms = [
    Room(r_id='001', capacity=2, availability='yes', r_cost=90),
    Room(r_id='002', capacity=2, availability='yes', r_cost=90),
    Room(r_id='003', capacity=2, availability='yes', r_cost=90),
    Room(r_id='101', capacity=2, availability='yes', r_cost=90),
    Room(r_id='102', capacity=2, availability='yes', r_cost=90),
    Room(r_id='103', capacity=2, availability='yes', r_cost=90),
    Room(r_id='201', capacity=2, availability='yes', r_cost=90),
    Room(r_id='202', capacity=2, availability='yes', r_cost=90),
    Room(r_id='004', capacity=3, availability='yes', r_cost=110),
    Room(r_id='005', capacity=3, availability='yes', r_cost=110),
    Room(r_id='006', capacity=3, availability='yes', r_cost=110),
    Room(r_id='104', capacity=3, availability='yes', r_cost=110),
    Room(r_id='105', capacity=3, availability='yes', r_cost=110),
    Room(r_id='106', capacity=3, availability='yes', r_cost=110),
    Room(r_id='203', capacity=3, availability='yes', r_cost=110),
    Room(r_id='204', capacity=3, availability='yes', r_cost=110),
    Room(r_id='007', capacity=4, availability='yes', r_cost=150),
    Room(r_id='107', capacity=4, availability='yes', r_cost=150),
    Room(r_id='205', capacity=4, availability='yes', r_cost=150),
    Room(r_id='206', capacity=4, availability='yes', r_cost=150),
]

Room.objects.bulk_create(rooms)
'''
