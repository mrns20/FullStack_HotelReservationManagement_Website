from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('clients/', include("api.urls_clients")),
    path('staff/', include("api.urls_staff")),
    path('message/', include("api.urls_message")),
    path('rooms/', include("api.urls_room")),
    #-------------------------------------------------------
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #-------------------------------------------------------
    path('client/login/', include("api.urls_login")),
    path('staff/login/', include('api.urls_login_staff')),
    path('booking/', include("api.urls_booking")),
    path('payments/', include("api.urls_payments")),

]

