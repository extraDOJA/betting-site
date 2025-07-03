import time
from typing import Any
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.webdriver import WebDriver
from webdriver_manager.chrome import ChromeDriverManager

from sports.services.scrapper import Scrapper, BrowserContext


class FlashscoreScrapper(Scrapper):
    """
    Scrapper for Flashscore website.
    """

    def __init__(self) -> None:
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
            "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Referer": "https://www.flashscore.pl/",
        }
        self.base_url = "https://www.flashscore.pl"

    def _setup_browser(self) -> WebDriver:
        """
        Setup the browser with necessary options.
        Returns a WebDriver instance.
        """
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

    def _fetch_page(self, url, browser) -> Any | None:
        """
        Fetch the page content using the browser.
        Returns the page source or None if an error occurs.
        """
        try:
            browser.get(url)
            time.sleep(1)
            return browser.page_source
        except Exception as e:
            print(f"Błąd pobierania strony: {e}")
            return None

    def get_league_matches(self, league_url) -> list[Any] | Any:
        """
        Fetch matches from the league page.
        Returns a list of matches or an empty list if no matches are found
        """
        return self.get_matches_by_url(league_url)

    def get_match(self, match_url) -> dict | Any:
        """
        Fetch match details from the match page.
        Returns a dictionary with match details or an empty dictionary if no details are found."""
        with BrowserContext(self._setup_browser) as browser:
            html = self._fetch_page(match_url, browser)
            if not html:
                return {}

            return html
    
    def get_match_odds(self, match_url: str, odds_type: str = "1x2") -> dict | Any:
        """
        Fetch match odds from the match page.
        odds_type can be "1x2", "under-over", "double-chance".
        """
        with BrowserContext(self._setup_browser) as browser:
            browser.get(match_url)
            self._accept_cookies(browser)
            if not self._click_odds_tab(browser):
                return {}
            if not self._click_odds_type_tab(browser, odds_type):
                return {}
            html = browser.page_source
            return html
    
    def _accept_cookies(self, browser) -> None:
        """
        Accept cookies on the page if the button is present.
        This method is used to handle cookie consent pop-ups.
        """
        try:
            cookie_btn = browser.find_element(
                "xpath",
                "//button[contains(@id, 'onetrust-accept-btn-handler')]"
            )
            cookie_btn.click()
            time.sleep(.5)
        except Exception:
            pass

    def _click_odds_tab(self, browser) -> bool:
        """ Click on the odds tab in the match page.
        Returns True if the tab was clicked successfully, False otherwise.
        """
        try:
            odds_tab = browser.find_element(
                "xpath",
                "//a[@data-analytics-alias='odds-comparison']"
            )
            odds_tab.click()
            time.sleep(.5)
            return True
        except Exception as e:
            print(f"Error clicking on odds tab: {e}")
            return False

    def _click_odds_type_tab(self, browser, odds_type: str) -> bool:
        """
        Click on the specific odds type tab in the match page.
        """
        try:
            odds_type_tab = browser.find_element(
                "xpath",
                f"//a[@data-analytics-alias='{odds_type}']"
            )
            time.sleep(.5)
            odds_type_tab.click()
            return True
        except Exception as e:
            print(f"Error fetching match odds: {e}")
            return False
    
    def get_matches_by_url(self, url) -> dict | Any:
        """
        Fetch matches from a specific URL.
        """
        with BrowserContext(self._setup_browser) as browser:
            html = self._fetch_page(url, browser)
            if not html:
                return []

            return html
