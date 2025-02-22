from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Match, Sport, League
from .serializers import BetSlipCreateSerializer, BetSlipResponseSerializer, LeagueSerializer, MatchSerializer, SportWithLeaguesSerializer
from .swagger_docs import popular_leagues_schema, sports_with_leagues_schema, list_matches_schema, bet_slip_create_schema


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


@list_matches_schema
@api_view(["GET"])
def list_popular_matches(request):
    """
    Get list of upcoming popular matches
    """
    matches = Match.objects.filter(is_active=True, is_popular=True, start_time__gte=timezone.now()).order_by("start_time")[:15]
    serializer = MatchSerializer(matches, many=True)
    return Response(serializer.data)


@bet_slip_create_schema
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_bet_slip(request):
    """
    Create a bet slip
    """
    serializer = BetSlipCreateSerializer(data=request.data, context={"request": request})

    if serializer.is_valid():
        if request.user.balance < serializer.validated_data["total_amount"]:
            return Response({"error": "Insufficient balance"}, status=status.HTTP_400_BAD_REQUEST)

        for bet_data in serializer.validated_data["bets"]:
            match = bet_data["match"]
            if not match.can_bet:
                return Response({"error": f"Match {match} is not available for betting"}, status=status.HTTP_400_BAD_REQUEST)

        request.user.substrat_balance(serializer.validated_data["total_amount"])
        bet_slip = serializer.save(user=request.user)

        response_serializer = BetSlipResponseSerializer(bet_slip)
        response_data = response_serializer.data
        response_data["user_balance"] = request.user.balance

        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
