from drf_yasg.utils import swagger_auto_schema

from sports.serializers import BetSlipCreateSerializer, LeagueSerializer, MatchSerializer, SportWithLeaguesSerializer

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
    request_body= BetSlipCreateSerializer,
    responses={200: BetSlipCreateSerializer},
)