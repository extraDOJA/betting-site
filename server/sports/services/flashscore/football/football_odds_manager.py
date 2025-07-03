import logging
from django.db import transaction
from django.utils import timezone
from datetime import timedelta
from sports.models import BetOption, BetType
from sports.services.flashscore.flashscore_scrapper import FlashscoreScrapper
from sports.services.flashscore.football.football_parser import FootballParser
from sports.services.odds_manager import OddsManager

logger = logging.getLogger(__name__)

class FlashscoreFootballOddsManager(OddsManager):
    """
    Flashscore Odds Manager
    This class is responsible for managing odds from Flashscore for football.
    """

    def __init__(self) -> None:
        self.scrapper = FlashscoreScrapper()
        self.parser = FootballParser()

    def import_odds_for_match(self, match) -> bool:
        """
        Import odds for a specific match.
        """

        match_url = match.source_url

        parsed_match = self._fetch_and_parse_match(match_url, match)
        if not parsed_match:
            return False

        if self._update_if_finished(match, parsed_match):
            return True
        
        try:
            with transaction.atomic():
                self._update_match_odds(match, parsed_match)
                self._set_popularity(match)
                match.save()
                self._update_1x2_options(match)
                return True
        except Exception as e:
            logger.error(f"Error importing odds for match {match.id}: {e}", exc_info=True)
            return False


    def _fetch_and_parse_match(self, match_url, match) -> dict:
        """
        Fetch and parse match details from the match URL.
        This method is used to retrieve match details and parse them.
        """
        match_html = self.scrapper.get_match(match_url)
        parsed_match = self.parser.parse_match_page(match_html)
        if not parsed_match:
            logger.warning(f"Failed to parse match page for match: {match.id}")
        return parsed_match
    
    def _update_if_finished(self, match, parsed_match) -> bool:
        """
        Update match if it is finished.
        This method checks if the match is finished and updates the match object accordingly.
        """
        if parsed_match.get("is_finished") and not match.is_finished:
            match.home_score = parsed_match.get("home_score")
            match.away_score = parsed_match.get("away_score")
            match.status = "finished"
            match.is_bet_available = False
            match.save()
            return True
        return False
    
    def _update_match_odds(self, match, parsed_match) -> None:
        """
        Update match odds based on parsed match data.
        This method updates the match object with the odds and other details.
        """
        match.home_win_odds = parsed_match.get("home_odds")
        match.draw_odds = parsed_match.get("draw_odds")
        match.away_win_odds = parsed_match.get("away_odds")
        match.queue = parsed_match.get("round")
        match.status = "scheduled"
        match.is_bet_available = True

    def _set_popularity(self, match) -> None:
        """
        Set the is_popular field based on the match start time.
        This method checks if the match is within the next two days and sets the is_popular field accordingly.
        """
        now = timezone.now()
        two_days_later = now + timedelta(days=2)
        match.is_popular = now <= match.start_time <= two_days_later

    def _update_1x2_options(self, match) -> None:
        """
        Update or create 1X2 bet options for the match.
        This method creates or updates the bet options for home win, draw, and away win.
        """
        bet_type, _ = BetType.objects.get_or_create(code="1X2", defaults={"name": "1X2"})
        if match.home_win_odds is not None:
            BetOption.objects.update_or_create(
                match=match,
                bet_type=bet_type,
                value="home",
                defaults={"odds": match.home_win_odds},
            )
        if match.draw_odds is not None:
            BetOption.objects.update_or_create(
                match=match,
                bet_type=bet_type,
                value="draw",
                defaults={"odds": match.draw_odds},
            )
        if match.away_win_odds is not None:
            BetOption.objects.update_or_create(
                match=match,
                bet_type=bet_type,
                value="away",
                defaults={"odds": match.away_win_odds},
            )