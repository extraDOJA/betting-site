from django.db import models
from django.utils import timezone


# Create your models here.
class Sport(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class League(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name="leagues")
    country_code = models.CharField(max_length=2, help_text="Country key ISO 2")
    is_active = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def url_path(self):
        return f"/league/{self.slug}"

    def __str__(self):
        return f"{self.name} ({self.sport.name})"

    class Meta:
        ordering = ["sport", "name"]


class Match(models.Model):
    STATUS_CHOICES = (
        ("scheduled", "Scheduled"),
        ("live", "Live"),
        ("finished", "Finished"),
        ("postponed", "Postponed"),
        ("canceled", "Canceled"),
    )

    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name="matches")
    queue = models.CharField(max_length=50, null=True, blank=True)
    home_team = models.CharField(max_length=100)
    away_team = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="scheduled")

    home_score = models.PositiveIntegerField(null=True, blank=True)
    away_score = models.PositiveIntegerField(null=True, blank=True)

    home_win_odds = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    draw_odds = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    away_win_odds = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    is_bet_available = models.BooleanField(default=False)

    class Meta:
        ordering = ["-start_time"]
        indexes = [
            models.Index(fields=["start_time", "status"]),
            models.Index(fields=["league", "status"]),
        ]

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} ({self.league.name})"

    @property
    def is_finished(self):
        return self.status == "finished"

    @property
    def is_live(self):
        return self.status == "live"

    @property
    def can_bet(self):
        return self.is_active and self.is_bet_available and self.status == "scheduled" and self.start_time > timezone.now()
