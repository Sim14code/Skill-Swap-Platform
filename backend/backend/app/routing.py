from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/swap/<int:user_id>/', consumers.SwapConsumer.as_asgi()),
]
