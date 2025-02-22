from django.contrib import admin

from sports.models import Bet, BetSlip, League, Match, Sport

# Register your models here.
admin.site.register(Sport)
admin.site.register(League)
admin.site.register(Match)
admin.site.register(BetSlip)
admin.site.register(Bet)