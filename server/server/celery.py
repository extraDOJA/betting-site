from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

app = Celery('server')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

# Configure Celery Beat schedule
app.conf.beat_schedule = {
    'import-matches-daily': {
        'task': 'sports.tasks.import_all_league_matches',
        'schedule': crontab(hour=0, minute=0),  # Run daily at midnight
        'kwargs': {'scheduled': True},
    },
    'import-upcoming-matches-odds': {
        'task': 'sports.tasks.import_upcoming_matches_odds',
        'schedule': 3600.0,  # Run every hour
    },
}

@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')