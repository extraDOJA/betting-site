from django.urls import path
from . import views

urlpatterns = [
    path('leagues/', views.sports_with_leagues, name='sports-with-leagues'),
    path('leagues/popular/', views.popular_leagues, name='popular-leagues'),
    path('matches/popular/', views.list_popular_matches, name='list-popular-matches'),
]