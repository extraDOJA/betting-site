from django.urls import path, include
from accounts.views import AddBalanceView, CustomTokenObtainPairView, LogoutView, RefreshTokenView, RegisterView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", RefreshTokenView.as_view(), name="refresh_token"),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("balance/", AddBalanceView.as_view(), name="add_balance"),
]
