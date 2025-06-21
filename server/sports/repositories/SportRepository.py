from sports.models import League, Sport
from django.db.models import Prefetch
from django.db.models.manager import BaseManager


class SportRepository:
    @staticmethod
    def get_sports(leagues: BaseManager[League]) -> BaseManager[Sport]:
        """
        Get all sports that have leagues with matches.
        """
        return (
            Sport.objects.filter(is_active=True, leagues__in=leagues)
            .distinct()
            .order_by("id")
            .prefetch_related(Prefetch("leagues", queryset=leagues))
        )
