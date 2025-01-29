from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import CustomTokenObtainPairView, LogoutView, RefreshTokenView, RegisterView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("refresh-token/", RefreshTokenView.as_view(), name="refresh_token"),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("logout/", LogoutView.as_view(), name="logout"),
]
