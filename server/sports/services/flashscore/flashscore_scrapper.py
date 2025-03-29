import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

from sports.services.praser import ParserFactory
from sports.services.scrapper import Scrapper, BrowserContext


class FlashscoreScrapper(Scrapper):
    """
    Scrapper for Flashscore website.
    """
    
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
            "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Referer": "https://www.flashscore.pl/",
        }
        self.parser = ParserFactory.create_parser("flashscore")
        self.base_url = "https://www.flashscore.pl"
    
    def _setup_browser(self):
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-gpu")
        options.add_argument(f"user-agent={self.headers['User-Agent']}")
        
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-infobars")
        options.add_argument("--window-size=1920,1080")

        service = Service(ChromeDriverManager().install())
        return webdriver.Chrome(service=service, options=options)

    def _fetch_page(self, url, browser):
        try:
            browser.get(url)
            time.sleep(2)
            return browser.page_source
        except Exception as e:
            print(f"Błąd pobierania strony: {e}")
            return None

    def get_league_matches(self, league_url):
        return self.get_matches_by_url(league_url)

    def get_match(self, match_url):
        with BrowserContext(self._setup_browser) as browser:
            html = self._fetch_page(match_url, browser)
            if not html:
                return {}
            
            return self.parser.parse_match_page(html)

    def get_matches_by_url(self, url):
        with BrowserContext(self._setup_browser) as browser:
            html = self._fetch_page(url, browser)
            if not html:
                return []
            
            return self.parser.parse_fixtures_page(html)
