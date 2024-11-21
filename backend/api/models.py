from django.db import models
from django.core.validators import RegexValidator

# Validators
email_validator = RegexValidator(regex=r'^[^@]+@[^@]+\.[^@]+$', message='Invalid email format')
greek_name_validator = RegexValidator(regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$', message='Only Greek characters are allowed')
tel_validator = RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed')
password_validator = RegexValidator(regex=r'^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':",.<>\/?]{8,12}$', message='Invalid password format')
s_email_validator = RegexValidator(regex=r'^[^@]+@hoteldmd\.gr$', message='Invalid staff email format')
job_descr_validator = RegexValidator(regex=r'^(Reception|Administrator|Programmer)$', message='Invalid job description')
availability_validator = RegexValidator(regex=r'^(yes|no)$', message='Invalid availability status')

class Client(models.Model):
    c_id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=20, unique=True, validators=[email_validator])
    password = models.CharField(max_length=12, validators=[password_validator])
    firstname = models.CharField(max_length=15, validators=[greek_name_validator])
    lastname = models.CharField(max_length=15, validators=[greek_name_validator])
    tel = models.CharField(max_length=10, validators=[tel_validator])

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(email__regex=r'%@%.%') & ~models.Q(email__regex=r'%@%.%@%'), name='chk_email'),
            models.CheckConstraint(check=models.Q(password__regex=r'^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':",.<>\/?]{8,12}$'), name='chk_password'),
            models.CheckConstraint(check=models.Q(firstname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_firstname'),
            models.CheckConstraint(check=models.Q(lastname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_lastname'),
            models.CheckConstraint(check=models.Q(tel__regex=r'^[0-9]+$'), name='chk_tel')
        ]
'''
class Staff(models.Model):
    s_id = models.AutoField(primary_key=True)
    s_email = models.CharField(max_length=20, unique=True, validators=[s_email_validator])
    s_password = models.CharField(max_length=12, validators=[password_validator])
    s_firstname = models.CharField(max_length=15, validators=[greek_name_validator])
    s_lastname = models.CharField(max_length=15, validators=[greek_name_validator])
    s_tel = models.CharField(max_length=10, validators=[tel_validator])
    salary = models.IntegerField()
    job_descr = models.CharField(max_length=20, validators=[job_descr_validator])
    date_of_joining = models.DateField()

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(s_email__regex=r'%@hoteldmd.gr') & ~models.Q(s_email__regex=r'%@%.%@%'), name='chk_s_email'),
            models.CheckConstraint(check=models.Q(s_password__regex=r'^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':",.<>\/?]{8,12}$'), name='chk_s_password'),
            models.CheckConstraint(check=models.Q(s_firstname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_s_firstname'),
            models.CheckConstraint(check=models.Q(s_lastname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_s_lastname'),
            models.CheckConstraint(check=models.Q(s_tel__regex=r'^[0-9]+$'), name='chk_s_tel'),
            models.CheckConstraint(check=models.Q(job_descr__in=['Reception', 'Administrator', 'Programmer']), name='chk_job_descr')
        ]

class Room(models.Model):
    r_id = models.AutoField(primary_key=True)
    capacity = models.IntegerField(choices=[(2, '2'), (3, '3'), (4, '4')])
    availability = models.CharField(max_length=3, validators=[availability_validator])
    r_cost = models.IntegerField()

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(capacity__in=[2, 3, 4]), name='chk_capacity'),
            models.CheckConstraint(check=models.Q(availability__in=['yes', 'no']), name='chk_availability')
        ]

class Booking(models.Model):
    b_id = models.AutoField(primary_key=True)
    c_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    r_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    arrival = models.DateField()
    departure = models.DateField()

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(arrival__lt=models.F('departure')), name='chk_arrival_before_departure')
        ]

class Message(models.Model):
    m_id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    m_email = models.CharField(max_length=20, validators=[email_validator])
    m_firstname = models.CharField(max_length=15, validators=[greek_name_validator])
    m_lastname = models.CharField(max_length=15, validators=[greek_name_validator])
    m_tel = models.CharField(max_length=10, validators=[tel_validator])
    message = models.TextField()

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(m_email__regex=r'%@%.%') & ~models.Q(m_email__regex=r'%@%.%@%'), name='chk_m_email'),
            models.CheckConstraint(check=models.Q(m_firstname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_m_firstname'),
            models.CheckConstraint(check=models.Q(m_lastname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_m_lastname'),
            models.CheckConstraint(check=models.Q(m_tel__regex=r'^[0-9]+$'), name='chk_m_tel')
        ]

class Payment(models.Model):
    p_id = models.AutoField(primary_key=True)
    b_id = models.ForeignKey(Booking, on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=6, decimal_places=2)
    number = models.CharField(max_length=16, validators=[RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed')])
    name = models.CharField(max_length=30, validators=[RegexValidator(regex=r'^[A-Z ]+$', message='Only uppercase English letters and spaces are allowed')])
    month_year = models.CharField(max_length=7, validators=[RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed')])
    CVV = models.CharField(max_length=3, validators=[RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed')])

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(number__regex=r'^[0-9]+$'), name='chk_number'),
            models.CheckConstraint(check=models.Q(name__regex=r'^[A-Z ]+$'), name='chk_name'),
            models.CheckConstraint(check=models.Q(month_year__regex=r'^[0-9]+$'), name='chk_month_year'),
            models.CheckConstraint(check=models.Q(CVV__regex=r'^[0-9]+$'), name='chk_CVV')
        ]

# Trigger-like logic in Django
from django.db.models.signals import pre_save
from django.dispatch import receiver

@receiver(pre_save, sender=Payment)
def calculate_cost_before_insert(sender, instance, **kwargs):
    booking = Booking.objects.get(b_id=instance.b_id.b_id)
    room = Room.objects.get(r_id=booking.r_id.r_id)
    num_days = (booking.departure - booking.arrival).days
    instance.cost = num_days * room.r_cost 
'''
