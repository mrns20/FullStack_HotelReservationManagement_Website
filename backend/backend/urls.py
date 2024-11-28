from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('clients/', include("api.urls_clients")),
    path('staff/', include("api.urls_staff")),
    path('message/', include("api.urls_message")),
    path('api/', include('api.urls')),
    path('token/refresh/', TokenRefreshView.as_view()),

    #path('client/login/', include("api.urls_login")),
    # path('api/client/login/', LoginView.as_view(), name='login'),

]




