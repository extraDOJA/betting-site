from abc import ABC, abstractmethod
from typing import Any


class Parser(ABC):
    """
    Abstract base class for parsers.
    """

    @abstractmethod
    def parse_fixtures_page(self, html) -> Any:
        """
        Parse a fixtures/results page with multiple matches.
        """
        pass

    @abstractmethod
    def parse_match_page(self, html) -> Any:
        """
        Parse a single match page.
        """
        pass

    @abstractmethod
    def parse_datetime(self, time_str) -> Any:
        """
        Parse date and time strings into a datetime object.
        """
        pass


class ParserFactory:
    """
    Factory class to create parsers based on the type.
    """

    @staticmethod
    def create_parser(parser_type: str, sport: str) -> Parser:
        if parser_type.lower() == "flashscore" and sport.lower() == "football":
            from sports.services.flashscore.football.football_parser import FootballParser

            return FootballParser()
        else:
            raise ValueError(f"Unknown parser type: {parser_type}")
