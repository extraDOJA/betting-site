from django.core.management.base import BaseCommand
from sports.tasks import import_upcoming_matches_odds

class Command(BaseCommand):
    help = "Import odds for all upcoming matches within the next 3 days"

    def handle(self, *args, **options):
        self.stdout.write("Starting import of odds for upcoming matches...")
        result = import_upcoming_matches_odds()
        self.stdout.write(self.style.SUCCESS(f"Import completed. Result: {result}"))