from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from accounts.serializers import AddBalanceSerializer, CustomTokenObtainPairSerializer, CustomUserSerializer
from django.conf import settings
from accounts.swagger_docs import add_balance_schema

CustomUser = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CustomUserSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            refresh_token = response.data.get("refresh")
            if refresh_token:
                response.set_cookie(
                    key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                    value=refresh_token,
                    expires=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                    secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                    httponly=True,
                    samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                )
        return response


class RefreshTokenView(APIView):
    def get(self, request):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        if not refresh_token:
            return Response({"detail": "Refresh token not provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            user_id = token.payload.get("user_id")
            user = CustomUser.objects.get(id=user_id)
            new_token = CustomTokenObtainPairSerializer.get_token(user)
            access_token = str(new_token.access_token)
            return Response({"accessToken": access_token}, status=status.HTTP_200_OK)
        except (InvalidToken, TokenError) as _:
            return Response({"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(key=settings.SIMPLE_JWT["AUTH_COOKIE"], samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"])
        response.data = {"detail": "Logout successful."}
        return response


class AddBalanceView(APIView):
    permission_classes = [IsAuthenticated]

    @add_balance_schema
    def post(self, request):
        serializer = AddBalanceSerializer(data=request.data)
        if serializer.is_valid():
            amount = serializer.validated_data.get("amount")
            if request.user.add_balance(amount):
                return Response({"message": "Balance added successfully.", "balance": str(request.user.balance)}, status=status.HTTP_200_OK)
            return Response({"message": "Invalid amount."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
