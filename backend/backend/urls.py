from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('clients/', include("api.urls_clients")),
    path('staff/', include("api.urls_staff")),
    path('api/', include('api.urls')),
    path('token/refresh/', TokenRefreshView.as_view()),
]



