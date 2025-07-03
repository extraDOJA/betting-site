from django.db.models.manager import BaseManager
from django.db.models import Exists
from sports.models import League, Match


class LeagueRepository:
    @staticmethod
    def get_popular_leagues(upcoming_matches: BaseManager[Match]) -> BaseManager[League]:
        """
        Get popular leagues that have upcoming matches.
        """

        return League.objects.filter(is_popular=True, is_active=True).annotate(has_upcoming=Exists(upcoming_matches)).filter(has_upcoming=True)

    @staticmethod
    def get_leagues(upcoming_matches: BaseManager[Match]) -> BaseManager[League]:
        """
        Get all leagues that have upcoming matches.
        """

        return League.objects.filter(is_active=True).annotate(has_upcoming=Exists(upcoming_matches)).filter(has_upcoming=True)

    @staticmethod
    def get_active_league(league_id: int) -> League:
        """
        Get a single active league by its ID.
        """
        return League.objects.get(id=league_id, is_active=True)
    
    @staticmethod
    def get_active_league_by_slug(slug: str) -> League:
        """
        Get a single active league by its slug.
        """
        return League.objects.get(slug=slug, is_active=True)