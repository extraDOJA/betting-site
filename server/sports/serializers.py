from rest_framework import serializers
from .models import Match, Sport, League


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
