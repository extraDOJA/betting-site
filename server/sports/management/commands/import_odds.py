from django.core.management.base import BaseCommand
from django.utils import timezone

from sports.models import Match
from sports.tasks import import_match_odds


class Command(BaseCommand):
    help = "Import odds data for all active matches."

    def handle(self, *args, **options):
        """
        This command is a placeholder for importing odds data.
        """
        now = timezone.now()
        one_week_later = now + timezone.timedelta(weeks=1)
        match = Match.objects.filter(is_active=True, status__in=["prepared", "scheduled"], start_time__gte=now, start_time__lte=one_week_later).first()

        if not match:
            return self.stdout.write(self.style.WARNING("No active matches found."))

        import_match_odds(match)
