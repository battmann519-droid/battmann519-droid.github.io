from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, MeView

urlpatterns = [
    path('auth/register', RegisterView.as_view(), name='auth-register'),
    path('auth/login', TokenObtainPairView.as_view(), name='auth-login'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me', MeView.as_view(), name='auth-me'),
]
