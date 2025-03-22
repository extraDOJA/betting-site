from django.core.management.base import BaseCommand
from sports.tasks import import_all_league_matches

class Command(BaseCommand):
    help = "Import matches for all active leagues or a specific league."

    def add_arguments(self, parser):
        parser.add_argument(
            "--league_id",
            type=int,
            help="Import matches for a specific league by ID.",
        )

        parser.add_argument(
            "--async",
            action="store_true",
            dest="async_mode",
            help="Run the import asynchronously.",
        )

    def handle(self, *args, **options):
        league_id = options.get("league_id")
        async_mode = options.get("async_mode")

        if async_mode:
            task = import_all_league_matches.delay(league_id=league_id, scheduled=False)
            self.stdout.write(
                self.style.SUCCESS(f'Task submitted to Celery with ID: {task.id}')
            )
        else:
            result = import_all_league_matches(league_id=league_id, scheduled=False)
            print(result)
            if result['status'] == 'success':
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Successfully imported {result['results']['new_matches']} new matches "
                    )
                )
            else:
                self.stdout.write(
                    self.style.ERROR(f"Import failed: {result.get('error', 'Unknown error')}")
                )