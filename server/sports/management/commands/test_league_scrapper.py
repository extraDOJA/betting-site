from django.core.management.base import BaseCommand

from sports.services.flashscore.flashscore_scrapper import FlashscoreScrapper

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("url", type=str, help="URL to scrape")

    def handle(self, *args, **options):
        url = options["url"]

        scrapper = FlashscoreScrapper()
        matches = scrapper.get_matches_by_url(url)
        if matches:
            for match in matches:
                self.stdout.write(self.style.SUCCESS(f"Match: {match}"))
        else:
            self.stdout.write(self.style.WARNING("No matches found or failed to scrape."))
    