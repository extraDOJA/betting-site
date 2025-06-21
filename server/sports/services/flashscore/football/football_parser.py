from bs4 import BeautifulSoup
from sports.services.flashscore.flashscore_parser import FlashscoreParser


class FootballParser(FlashscoreParser):
    def parse_match_page(self, html) -> dict:
        """
        Parse a single football match page from Flashscore.
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
