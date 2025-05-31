from django.urls import path
from . import views

urlpatterns = [
    path('leagues/', views.sports_with_leagues, name='sports-with-leagues'),
    path('leagues/popular/', views.popular_leagues, name='popular-leagues'),
    path("leagues/<str:league_slug>/", views.league_details, name="league-detail"),
    path("leagues/<str:league_slug>/matches/", views.league_matches, name="league-matches"),
    path('matches/popular/', views.list_popular_matches, name='list-popular-matches'),
    path('matches/<int:match_id>/', views.single_match, name='single-match'),
    path('bet/', views.create_bet_slip, name='create-bet-slip'),
    path('bets/', views.user_bet_slips, name='user-bet-slips'),
    path('bets/validate/', views.validate_bets_availability, name='validate-bet-slip'),
]