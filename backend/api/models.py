from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import BaseUserManager
# Validators
email_validator = RegexValidator(regex=r'^[^@]+@[^@]+\.[^@]+$', message='Invalid email format')
greek_name_validator = RegexValidator(regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$', message='Only Greek characters are allowed')
tel_validator = RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed')
password_validator = RegexValidator(regex=r'^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':",.<>\/?]{8,12}$', message='Invalid password format')
s_email_validator = RegexValidator(regex=r'^[^@]+@hoteldmd\.gr$', message='Invalid staff email format')
job_descr_validator = RegexValidator(regex=r'^(Reception|Administrator|Programmer)$', message='Invalid job description')
availability_validator = RegexValidator(regex=r'^(yes|no)$', message='Invalid availability status')

class ClientManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
class Client(AbstractBaseUser):
    c_id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=50, unique=True, validators=[email_validator])
    #password = models.CharField(max_length=12, validators=[password_validator])
    firstname = models.CharField(max_length=15, validators=[greek_name_validator])
    lastname = models.CharField(max_length=15, validators=[greek_name_validator])
    tel = models.CharField(max_length=10, validators=[tel_validator])
    #email = models.EmailField(unique=True)  # Use email for login
    
    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(email__regex=r'%@%.%') & ~models.Q(email__regex=r'%@%.%@%'), name='chk_email'),
            #models.CheckConstraint(check=models.Q(password__regex=r'^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':",.<>\/?]{8,12}$'), name='chk_password'),
            models.CheckConstraint(check=models.Q(firstname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_firstname'),
            models.CheckConstraint(check=models.Q(lastname__regex=r'^[Α-ΩΆΈΉΊΌΎΏα-ωάέήίόύώ]*$'), name='chk_lastname'),
            models.CheckConstraint(check=models.Q(tel__regex=r'^[0-9]+$'), name='chk_tel')
        ]
    USERNAME_FIELD = 'email'  # Login will use email instead of username
    REQUIRED_FIELDS = ['firstname', 'lastname', 'tel']  # Fields required during user creation
    objects = ClientManager()

    def __str__(self):
        return self.email
    
