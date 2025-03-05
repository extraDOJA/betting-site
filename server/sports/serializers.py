from rest_framework import serializers
from .models import Bet, BetSlip, Match, Sport, League


class LeagueSerializer(serializers.ModelSerializer):
    url_path = serializers.SerializerMethodField()

    class Meta:
        model = League
        fields = ["id", "name", "slug", "url_path", "country_code", "is_popular"]

    def get_url_path(self, obj):
        return obj.url_path


class SportWithLeaguesSerializer(serializers.ModelSerializer):
    leagues = LeagueSerializer(many=True, read_only=True)

    class Meta:
        model = Sport
        fields = ["id", "name", "slug", "leagues"]


class MatchSerializer(serializers.ModelSerializer):
    league_name = serializers.CharField(source="league.name", read_only=True)
    sport_name = serializers.CharField(source="league.sport.name", read_only=True)

    class Meta:
        model = Match
        fields = [
            "id",
            "league_name",
            "queue",
            "sport_name",
            "home_team",
            "away_team",
            "start_time",
            "status",
            "home_score",
            "away_score",
            "home_win_odds",
            "draw_odds",
            "away_win_odds",
            "is_bet_available",
        ]


class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = ["match", "bet_choice", "odds"]


class BetSlipCreateSerializer(serializers.ModelSerializer):
    bets = BetSerializer(many=True)

    class Meta:
        model = BetSlip
        fields = ["total_amount", "bets"]

    def validate(self, data):
        # validate bets
        if not data["bets"]:
            raise serializers.ValidationError("At least one bet is required")

        # validate total amount
        total_amount = data["total_amount"]
        if total_amount <= 0:
            raise serializers.ValidationError("Amount must be greater than 0")

        # validate bets
        for bet_data in data['bets']:
            try:
                match = Match.objects.get(id=bet_data['match'].id)
                if not match.can_bet:
                    raise serializers.ValidationError(f"Match {match} is not available for betting")
            except Match.DoesNotExist:
                raise serializers.ValidationError(f"Match {bet_data['match']} does not exist")

        return data

    def create(self, validated_data):
        bets_data = validated_data.pop("bets")
        total_amount = validated_data.pop("total_amount")

        # Calculate total odds
        total_odds = 1
        for bet_data in bets_data:
            total_odds *= bet_data["odds"]

        # Create bet slip
        bet_slip = BetSlip.objects.create(
            user=self.context["request"].user, total_amount=total_amount, total_odds=total_odds, potential_win=total_amount * total_odds
        )

        # Create bets
        for bet_data in bets_data:
            Bet.objects.create(
                bet_slip=bet_slip,
                match=bet_data['match'],
                bet_choice=bet_data['bet_choice'],
                odds=bet_data['odds']
            )

        return bet_slip


class BetSlipResponseSerializer(serializers.ModelSerializer):
    user_balance = serializers.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        read_only=True,
        help_text="User balance after the bet slip is created"
    )
    bets = BetSerializer(many=True, read_only=True)

    class Meta:
        model = BetSlip
        fields = [
            'id', 
            'total_amount', 
            'total_odds', 
            'potential_win', 
            'status', 
            'user_balance',
            'bets',
            'created_at'
        ]

class UserBetSlipSerializer(serializers.ModelSerializer):
    bets = BetSerializer(many=True, read_only=True, source='bets.all')
    matches_data = serializers.SerializerMethodField()

    class Meta:
        model = BetSlip
        fields = [
            'id', 
            'total_amount', 
            'total_odds', 
            'potential_win', 
            'status', 
            'created_at',
            'bets',
            'matches_data'
        ]
    
    def get_matches_data(self, obj):
        matches = []
        # Get match data for each bet
        for bet in obj.bets.all():
            match_data = {
                'id': bet.match.id,
                'home_team': bet.match.home_team,
                'away_team': bet.match.away_team,
                'status': bet.match.status,
                'home_score': bet.match.home_score,
                'away_score': bet.match.away_score,
                'start_time': bet.match.start_time,
                'bet_choice': bet.bet_choice,
                'odds': bet.odds
            }
            matches.append(match_data)
        return matches