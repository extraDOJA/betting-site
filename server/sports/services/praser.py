from abc import ABC, abstractmethod

class Parser(ABC):
    """
    Abstract base class for parsers.
    """

    @abstractmethod
    def parse_fixtures_page(self, html):
        """
        Parse a fixtures/results page with multiple matches.
        """
        pass

    @abstractmethod
    def parse_match_page(self, html):
        """
        Parse a single match page.
        """
        pass

    @abstractmethod
    def parse_datetime(self, date_str, time_str):
        """
        Parse date and time strings into a datetime object.
        """
        pass


class ParserFactory:
    """
    Factory class to create parsers based on the type.
    """

    @staticmethod
    def create_parser(parser_type):
        if parser_type == "flashscore":
            from sports.services.flashscore.flashscore_parser import FlashscoreParser
            return FlashscoreParser()
        else:
            raise ValueError(f"Unknown parser type: {parser_type}")