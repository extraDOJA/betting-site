from django.core.management.base import BaseCommand
from sports.models import Sport, League

class Command(BaseCommand):
    help = "Add initial data to the database"

    def handle(self, *args, **options):
        self.stdout.write("Adding initial data...")
        
        sport, created = Sport.objects.get_or_create(
            name="Football",
            defaults={
                "slug": "football",
                "is_active": True
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS(f"Sport '{sport.name}' was created"))
        else:
            self.stdout.write(f"Sport '{sport.name}' already exists")
        
        league, created = League.objects.get_or_create(
            name="Premier League",
            sport=sport,
            defaults={
                "slug": "premier-league",
                "country_code": "GB",
                "is_active": True,
                "is_popular": True,
                "data_source": "flashscore",
                "source_url": "https://www.flashscore.com/football/england/premier-league/fixtures/"
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS(f"League '{league.name}' was created"))
        else:
            self.stdout.write(f"League '{league.name}' already exists")