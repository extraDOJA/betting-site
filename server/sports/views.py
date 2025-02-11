from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Sport, League
from .serializers import LeagueSerializer, SportWithLeaguesSerializer
from .swagger_docs import popular_leagues_schema, sports_with_leagues_schema


@popular_leagues_schema
@api_view(["GET"])
def popular_leagues(request):
    """
    Get list of popular leagues
    """
    leagues = League.objects.filter(is_popular=True, is_active=True)
    serializer = LeagueSerializer(leagues, many=True)
    return Response(serializer.data)


@sports_with_leagues_schema
@api_view(["GET"])
def sports_with_leagues(request):
    """
    Get list of sports with leagues
    """
    sports = Sport.objects.filter(is_active=True).prefetch_related("leagues").filter(leagues__is_active=True).distinct().order_by("id")
    serializer = SportWithLeaguesSerializer(sports, many=True)
    return Response(serializer.data)
