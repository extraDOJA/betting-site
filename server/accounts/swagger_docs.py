from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from accounts.serializers import AddBalanceSerializer

add_balance_schema = swagger_auto_schema(
    request_body=AddBalanceSerializer,
    responses={
        200: openapi.Response(
            description="Balance added successfully.",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "detail": openapi.Schema(type=openapi.TYPE_STRING),
                    "balance": openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        400: openapi.Response(
            description="Invalid amount or bad request.",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "detail": openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        )
    }
)