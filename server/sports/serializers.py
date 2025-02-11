from rest_framework import serializers
from .models import Sport, League

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ['id', 'name', 'slug', 'country_code', 'is_popular']

class SportWithLeaguesSerializer(serializers.ModelSerializer):
    leagues = LeagueSerializer(many=True, read_only=True)

    class Meta:
        model = Sport
        fields = ['id', 'name', 'slug', 'leagues']