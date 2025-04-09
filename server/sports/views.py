from django.utils import timezone
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import BetSlip, Match, Sport, League
from .serializers import (
    BetSlipCreateSerializer,
    BetSlipResponseSerializer,
    LeagueDetailSerializer,
    LeagueSerializer,
    MatchSerializer,
    SportWithLeaguesSerializer,
    UserBetSlipSerializer,
)
from .swagger_docs import popular_leagues_schema, sports_with_leagues_schema, list_matches_schema, bet_slip_create_schema, user_bet_slips_schema


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
    now = timezone.now()

    matches = (
        Match.objects.filter(is_active=True, is_popular=True)
        .filter(Q(status="live") | Q(status="scheduled", start_time__gte=now))
        .order_by("-status", "start_time")[:15]
    )
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


class BetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 10


@user_bet_slips_schema
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_bet_slips(request):
    """
    Get user's bet slips with optional filtering by status
    """
    status_filter = request.query_params.get("status")
    user_bet_slips = BetSlip.objects.filter(user=request.user)

    if status_filter:
        if status_filter == "open":
            # Open bets: pending or active
            user_bet_slips = user_bet_slips.filter(status__in=["pending", "active"])
        elif status_filter == "finished":
            # Finished bets: lost or canceled
            user_bet_slips = user_bet_slips.filter(status__in=["lost", "canceled"])
        elif status_filter == "won":
            # Won bets
            user_bet_slips = user_bet_slips.filter(status="won")
        else:
            pass

    paginator = BetPagination()
    page = paginator.paginate_queryset(user_bet_slips, request)

    if page is not None:
        serializer = UserBetSlipSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    serializer = UserBetSlipSerializer(user_bet_slips, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def validate_bets_availability(request):
    """
    Validate if bets are available
    """
    match_ids = request.data.get("matchIds", [])

    # If no match IDs are provided, return an empty response as all bets are available
    if not match_ids:
        return Response([], status=status.HTTP_200_OK)

    matches = Match.objects.filter(id__in=match_ids)

    # Return only matches that are available for betting
    response_data = []
    for match in matches:
        if match.can_bet:
            response_data.append(
                {
                    "id": match.id,
                    "can_bet": match.can_bet,
                    "status": match.status,
                    "start_time": match.start_time,
                    "home_team": match.home_team,
                    "away_team": match.away_team,
                }
            )

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def league_details(request, league_slug):
    """
    Get details of a specific league
    """
    try:
        league = League.objects.get(slug=league_slug, is_active=True)
    except League.DoesNotExist:
        return Response({"error": "League not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = LeagueDetailSerializer(league)
    return Response(serializer.data)


@api_view(["GET"])
def league_matches(request, league_slug):
    """
    Get matches for a specific league
    """
    now = timezone.now()
    try:
        league = League.objects.get(slug=league_slug, is_active=True)
    except League.DoesNotExist:
        return Response({"error": "League not found"}, status=status.HTTP_404_NOT_FOUND)

    matches = (
        Match.objects.filter(league=league, is_active=True, is_bet_available=True)
        .filter(Q(status="live") | Q(status="scheduled", start_time__gte=now))
        .order_by("-status", "start_time")
    )

    serializer = MatchSerializer(matches, many=True)
    return Response(serializer.data)
