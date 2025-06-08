from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


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
    SOURCE_CHOICES = (
        ("flashscore", "Flashscore"),
    )

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name="leagues")
    country_code = models.CharField(max_length=2, help_text="Country key ISO 2")
    is_active = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    data_source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default="flashscore")
    source_url = models.CharField(max_length=255, null=True, blank=True, unique=True)

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
        ("prepared", "Prepared"),
    )

    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name="matches")
    queue = models.CharField(max_length=50, null=True, blank=True)
    home_team = models.CharField(max_length=100)
    away_team = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="prepared")

    home_score = models.PositiveIntegerField(null=True, blank=True)
    away_score = models.PositiveIntegerField(null=True, blank=True)

    home_win_odds = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    draw_odds = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    away_win_odds = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    last_odds_update = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    is_bet_available = models.BooleanField(default=False)

    source_id = models.CharField(max_length=50, null=True, blank=True)
    source_url = models.CharField(max_length=255, null=True, blank=True, unique=True)

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

    @property
    def data_source(self):
        return self.league.data_source

class BetType(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.code})"
    
class BetOption(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="bet_options")
    bet_type = models.ForeignKey(BetType, on_delete=models.CASCADE, related_name="bet_options")
    value = models.CharField(max_length=50)
    odds = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.match} - {self.bet_type.name}: {self.value} @ {self.odds}"


class BetSlip(models.Model):
    SLIP_STATUS = (
        ("pending", "Pending"),
        ("active", "Active"),
        ("won", "Won"),
        ("lost", "Lost"),
        ("canceled", "Canceled"),
    )

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="bet_slips")
    matches = models.ManyToManyField(Match, through="Bet", related_name="bet_slips")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_odds = models.DecimalField(max_digits=7, decimal_places=2)
    potential_win = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=SLIP_STATUS, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "status"]),
        ]

    def __str__(self):
        return f"Slip #{self.id} - {self.user.username}"


class Bet(models.Model):
    BET_STATUS = (
        ("pending", "Pending"),
        ("won", "Won"),
        ("lost", "Lost"),
        ("canceled", "Canceled"),
    )

    bet_slip = models.ForeignKey(BetSlip, on_delete=models.CASCADE, related_name="bets")
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="bets")
    bet_option = models.ForeignKey(BetOption, on_delete=models.CASCADE, related_name="bets", null=True)
    odds = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(max_length=8, choices=BET_STATUS, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["bet_slip", "status"]),
            models.Index(fields=["match", "status"]),
        ]

    def __str__(self):
        return f"{self.match} ({self.bet_slip})"

    @property
    def is_settled(self):
        return self.status in ["won", "lost", "canceled"]
