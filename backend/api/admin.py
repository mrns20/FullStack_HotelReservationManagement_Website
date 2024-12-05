from django.contrib import admin
from .models import Client, Staff, Message, Room, Booking, Payment

# Register your models here.
admin.site.register(Client)
admin.site.register(Staff)
admin.site.register(Message)
admin.site.register(Room)
admin.site.register(Booking)
admin.site.register(Payment)
