from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

StaffManager = get_user_model()

class AuthBackend(ModelBackend):
    supports_object_permissions = True
    supports_anonymous_user = False
    supports_inactive_user = True

    def get_user(self, s_id):
        try:
            return StaffManager.objects.get(s_id=s_id)
        except StaffManager.DoesNotExist:
            return None
        

def authenticate(self, request, username=None, password=None, **kwargs):
        print('inside custom auth')
        try:
            user = StaffManager.objects.get(
                Q(s_id=username))
            print(user)
        except StaffManager.DoesNotExist:
            print('teste')
            return None

        if user.check_password(password):
            print('ok', user, password, **kwargs)
            print(self.user_can_authenticate(user))
            return user
        else:
            print('nok', user, password)
            return None