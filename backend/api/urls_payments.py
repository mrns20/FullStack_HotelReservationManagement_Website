from django.urls import path
from .views import (
    PaymentView,
)

urlpatterns = [
    path('', PaymentView.as_view(), name='payment_list_create'),
    path('<int:p_id>/', PaymentView.as_view(), name='payment_detail'),
]
