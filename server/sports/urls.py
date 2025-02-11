from django.urls import path
from . import views

urlpatterns = [
    path('popular-leagues/', views.popular_leagues, name='popular-leagues'),
    path('sports-with-leagues/', views.sports_with_leagues, name='sports-with-leagues'),
]