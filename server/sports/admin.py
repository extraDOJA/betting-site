from django.contrib import admin

from sports.models import Bet, BetSlip, League, Match, Sport


class MatchAdmin(admin.ModelAdmin):
    search_fields = ['home_team', 'away_team']


# Register your models here.
admin.site.register(Sport)
admin.site.register(League)
admin.site.register(Match, MatchAdmin)
admin.site.register(BetSlip)
admin.site.register(Bet)