import datetime
from typing import Any, Literal
from bs4 import BeautifulSoup

from sports.services.praser import Parser


class FlashscoreParser(Parser):
    """
    Parser for Flashscore HTML content.
    """

    def parse_fixtures_page(self, html) -> list[dict]:
        """
        Parse a Flashscore fixtures page with multiple matches.
        """
        soup = BeautifulSoup(html, "html.parser")
        matches = []

        match_rows = soup.select(".event__match--scheduled")

        for row in match_rows:
            try:
                match_id_raw = row.get("id", "")
                match_id = str(match_id_raw).replace("g_1_", "") if match_id_raw else ""

                event_link_tag = row.select_one(".eventRowLink")
                match_link = event_link_tag.get("href", "") if event_link_tag else ""

                if not match_id:
                    continue

                home_team = row.select_one(".event__homeParticipant")
                away_team = row.select_one(".event__awayParticipant")

                if not home_team or not away_team:
                    continue

                home_team_name = home_team.text.strip()
                away_team_name = away_team.text.strip()

                time_element = row.select_one(".event__time")
                match_time = time_element.text.strip() if time_element else "00:00"

                match_datetime = self.parse_datetime(match_time)

                matches.append(
                    {
                        "id": match_id,
                        "url": match_link,
                        "home_team": home_team_name,
                        "away_team": away_team_name,
                        "start_time": match_datetime,
                    }
                )

            except Exception as e:
                print(f"Error parsing match row: {e}")
                continue

        return matches

    def parse_match_page(self, html) -> dict:
        """
        Parse a single match page from Flashscore.
        """
        soup = BeautifulSoup(html, "html.parser")
        match_data = {}

        try:
            # Extract match queue text
            breadcrumbs_container = soup.select_one("div.detail__breadcrumbs")
            if breadcrumbs_container:
                breadcrumbs_items = breadcrumbs_container.select("li")
                if breadcrumbs_items and len(breadcrumbs_items) > 0:
                    last_breadcrumb = breadcrumbs_items[-1]
                    league_round_text = last_breadcrumb.text.strip()
                    match_data["round"] = league_round_text

            status_container = soup.select_one("span.fixedHeaderDuel__detailStatus")
            match_data["is_finished"] = self._is_match_finished(status_container)

            if match_data["is_finished"]:
                match_data["home_odds"] = "-"
                match_data["draw_odds"] = "-"
                match_data["away_odds"] = "-"

                score_container = soup.select_one("div.detailScore__wrapper")
                if score_container:
                    score_text = score_container.text.strip()
                    match_data["home_score"], match_data["away_score"] = self._parse_score(score_text)
                return match_data

            odds_container = soup.select(".wclOddsContent")[1]

            if odds_container:
                odds_rows = soup.select(".wclOddsRow")

                if odds_rows:
                    for row in odds_rows:
                        spans = row.select('span[data-testid="wcl-oddsValue"]')

                        if len(spans) >= 3:
                            try:
                                home_odds = spans[0].text.strip()
                                draw_odds = spans[1].text.strip()
                                away_odds = spans[2].text.strip()

                                if home_odds and home_odds != "-" and draw_odds and draw_odds != "-" and away_odds and away_odds != "-":
                                    match_data["home_odds"] = home_odds
                                    match_data["draw_odds"] = draw_odds
                                    match_data["away_odds"] = away_odds
                                    break
                            except (ValueError, IndexError) as e:
                                print(f"Error parsing odds values: {e}")
                                continue
        except Exception as e:
            print(f"Error parsing match page: {e}")

        return match_data

    def parse_datetime(self, time_str: str) -> datetime.datetime:
        """
        Parse date and time strings into a datetime object.
        """
        try:
            data = time_str.split(" ")

            date_str = data[0]
            time_str = data[1] if len(data) > 1 else "00:00"

            date_obj = self._parse_date(date_str)
            time_obj = self._parse_time(time_str)

            return datetime.datetime.combine(date_obj, time_obj)
        except Exception as e:
            print(f"Error parsing datetime: {e}, time: '{time_str}'")
            return datetime.datetime.now()

    def _parse_date(self, date_str) -> Any:
        """
        Parse date string into a date object.
        """
        if not date_str:
            return datetime.datetime.now().date()

        date_parts = [part for part in date_str.split(".") if part.strip()]
        if len(date_parts) >= 3:
            day, month, year = map(int, date_parts)
        elif len(date_parts) >= 2:
            day, month = map(int, date_parts)
            year = datetime.datetime.now().year
            if month < datetime.datetime.now().month or (month == datetime.datetime.now().month and day < datetime.datetime.now().day):
                year += 1
        else:
            return datetime.datetime.now().date()

        return datetime.date(year, month, day)

    def _parse_time(self, time_str) -> datetime.time:
        """
        Parse time string into a time object.
        """
        if ":" in time_str:
            hour, minute = map(int, time_str.split(":"))
        else:
            hour, minute = 0, 0

        return datetime.time(hour, minute)

    def _is_match_finished(self, status_container) -> bool:
        """
        Check if the match is finished, considering both Polish and English languages.
        """
        # Dictionary of status keywords that indicate a finished match in different languages
        status_keywords = {"en": ["finished", "ended", "ft", "full-time"], "pl": ["zakończony", "zakończona", "koniec"]}

        if not status_container:
            return False

        status_text = status_container.text.strip().lower()

        # Check all language variants
        for language, keywords in status_keywords.items():
            if any(keyword in status_text for keyword in keywords):
                return True

        return False

    def _parse_score(self, score_str) -> tuple[int, int] | tuple[Literal[0], Literal[0]]:
        """
        Parse the score string into a tuple of integers.
        """
        try:
            home_score, away_score = map(int, score_str.split("-"))
            return home_score, away_score
        except ValueError:
            return 0, 0
        except Exception as e:
            print(f"Error parsing score: {e}")
            return 0, 0
