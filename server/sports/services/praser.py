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
    def create_parser(parser_type) -> Parser:
        if parser_type == "flashscore":
            from sports.services.flashscore.flashscore_parser import FlashscoreParser
            return FlashscoreParser()
        else:
            raise ValueError(f"Unknown parser type: {parser_type}")