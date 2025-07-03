from abc import ABC, abstractmethod
from typing import Any

from sports.models import Match


class OddsManager(ABC):
    """
    Abstract base class for managing odds from various sports websites.
    This class defines the interface for fetching and parsing odds data.
    """

    @abstractmethod
    def import_odds_for_match(self, match: Match) -> Any:
        """
        Parse a fixtures/results page with multiple matches.
        """
        pass


class OddsManagerFactory:
    """
    Factory class to create instances of OddsManager based on the data source.
    """

    @staticmethod
    def create_odds_manager(data_source: str, sport: str) -> OddsManager:
        """
        Create an instance of OddsManager based on the data source and sport.
        """
        if data_source.lower() == "flashscore" and sport.lower() == "football":
            from sports.services.flashscore.football.football_odds_manager import FlashscoreFootballOddsManager
            return FlashscoreFootballOddsManager()
        else:
            raise ValueError(f"Unsupported data source: {data_source} for sport: {sport}")
