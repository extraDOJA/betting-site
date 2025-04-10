from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from sports.serializers import BetSlipCreateSerializer, BetSlipResponseSerializer, LeagueSerializer, MatchSerializer, SportWithLeaguesSerializer, UserBetSlipSerializer, LeagueDetailSerializer

popular_leagues_schema = swagger_auto_schema(
    method="get",
    operation_description="Returns a list of active and popular leagues",
    operation_summary="List popular leagues",
    responses={200: LeagueSerializer(many=True)},
)

sports_with_leagues_schema = swagger_auto_schema(
    method="get",
    operation_description="Returns a list of active sports with their active leagues",
    operation_summary="List sports with leagues",
    responses={200: SportWithLeaguesSerializer(many=True)},
)

list_matches_schema = swagger_auto_schema(
    method="get",
    operation_description="Returns a list of upcoming matches",
    operation_summary="List matches",
    responses={200: MatchSerializer(many=True)},
)

bet_slip_create_schema = swagger_auto_schema(
    method="post",
    operation_description="Create a bet slip",
    operation_summary="Create bet slip",
    request_body=BetSlipCreateSerializer,
    responses={201: BetSlipResponseSerializer},
)

user_bet_slips_schema = swagger_auto_schema(
    method="get",
    operation_description="Returns a list of user bet slips",
    operation_summary="List user bet slips",
    manual_parameters=[
        openapi.Parameter("page", openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
        openapi.Parameter("page_size", openapi.IN_QUERY, description="Number of results per page", type=openapi.TYPE_INTEGER),
        openapi.Parameter("status", openapi.IN_QUERY, description="Filter by status (open, finished, won)", type=openapi.TYPE_STRING),
    ],
    responses={200: UserBetSlipSerializer(many=True)},
)

validate_bets_schema = swagger_auto_schema(
    method="post",
    operation_description="Validates if selected matches are available for betting",
    operation_summary="Validate bets availability",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'matchIds': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(type=openapi.TYPE_INTEGER),
                description="List of match IDs to validate"
            )
        }
    ),
    responses={
        200: openapi.Response(
            description="List of available matches",
            schema=openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'can_bet': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'status': openapi.Schema(type=openapi.TYPE_STRING),
                        'start_time': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
                        'home_team': openapi.Schema(type=openapi.TYPE_STRING),
                        'away_team': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            )
        )
    }
)

league_details_schema = swagger_auto_schema(
    method="get",
    operation_description="Returns details of a specific league",
    operation_summary="Get league details",
    responses={
        200: LeagueDetailSerializer,
        404: "League not found"
    },
)

league_matches_schema = swagger_auto_schema(
    method="get",
    operation_description="Returns matches for a specific league",
    operation_summary="Get league matches",
    responses={
        200: MatchSerializer(many=True),
        404: "League not found"
    },
)
