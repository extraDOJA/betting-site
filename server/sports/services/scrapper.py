from abc import ABC, abstractmethod

class Scrapper(ABC):
    @abstractmethod
    def get_league_matches(self, league_url):
        """
        Get matches for a specific league.
        """
        pass

    @abstractmethod
    def get_match(self, match_id):
        """
        Get detailed data for a specific match.
        """
        pass
        
    @abstractmethod
    def get_matches_by_url(self, url):
        """
        Get matches from a specific URL.
        """
        pass


class BrowserContext:
    """
    Context manager for browser handling.
    """
    def __init__(self, setup_func):
        self.setup_func = setup_func
        self.browser = None
        
    def __enter__(self):
        self.browser = self.setup_func()
        return self.browser
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.browser:
            self.browser.quit()

class ScrapperFactory:
    """
    Factory class to create scrappers based on the type.
    """

    @staticmethod
    def create_scrapper(scrapper_type):
        if scrapper_type == "flashscore":
            from sports.services.flashscore.flashscore_scrapper import FlashscoreScrapper
            return FlashscoreScrapper()
        else:
            raise ValueError(f"Unknown scrapper type: {scrapper_type}")