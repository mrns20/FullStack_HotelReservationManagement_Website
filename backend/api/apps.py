from django.apps import AppConfig
from django.conf import settings
from injector import Injector
from .di import configure

class ApiConfig(AppConfig):
    name = 'api'
    default_auto_field = 'django.db.models.BigAutoField'

    def ready(self):
        settings.INJECTOR = Injector([configure])
