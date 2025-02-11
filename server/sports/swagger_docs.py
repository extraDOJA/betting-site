from drf_yasg.utils import swagger_auto_schema

from sports.serializers import LeagueSerializer, SportWithLeaguesSerializer

popular_leagues_schema = swagger_auto_schema(
    method='get',
    operation_description="Returns a list of active and popular leagues",
    operation_summary="List popular leagues",
    responses={200: LeagueSerializer(many=True)}
)

sports_with_leagues_schema = swagger_auto_schema(
    method='get',
    operation_description="Returns a list of active sports with their active leagues",
    operation_summary="List sports with leagues",
    responses={200: SportWithLeaguesSerializer(many=True)}
)