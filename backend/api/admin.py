from django.contrib import admin
from .models import Client, Staff, Message, Room, Booking, Payment
'''from django.contrib.auth.admin import UserAdmin
from django import forms
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError'''

# Register your models here.
admin.site.register(Client)
admin.site.register(Staff)
admin.site.register(Message)
admin.site.register(Room)
admin.site.register(Booking)
admin.site.register(Payment)


'''class StaffCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""

    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password confirmation", widget=forms.PasswordInput
    )

    class Meta:
        model = Staff
        fields = ['s_email', 's_firstname', 's_lastname', 's_tel', 'salary', 'job_descr', 'date_of_joining']

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class StaffAdmin(UserAdmin):
    
    add_form = StaffCreationForm
    list_display = ['s_id', 's_email', 's_firstname', 's_lastname', 's_tel', 'salary', 'job_descr', 'date_of_joining']
    list_filter = ['is_staff']
    fieldsets = [
        (None, {'fields': ['s_email', 'password', 's_firstname', 's_lastname', 'job_descr', 'date_of_joining' ]}),
        ('Permissions', {'fields': ['is_staff']}),
        ('Personal Info', {'fields': ['s_tel', 'salary']}),
    ]
    add_fieldsets = [
        (None, {
            'classes': ['wide'],
            'fields': ['s_email', 'password1', 'password2', 's_firstname', 's_lastname', 's_tel', 'job_descr', 'salary', 'date_of_joining', 'is_staff']}
        ),
    ]
    search_fields = ['s_email']
    ordering = ['s_email']
    filter_horizontal= []

admin.site.register(Staff, StaffAdmin)
admin.site.unregister(Group) '''
