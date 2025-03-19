import datetime
from bs4 import BeautifulSoup

from sports.services.praser import Parser


class FlashscoreParser(Parser):
    """
    Parser for Flashscore HTML content.
    """
    
    def parse_fixtures_page(self, html):
        """
        Parse a Flashscore fixtures page with multiple matches.
        """
        soup = BeautifulSoup(html, "html.parser")
        matches = []

        match_rows = soup.select(".event__match--scheduled")

        for row in match_rows:
            try:
                match_id = row.get("id", "").replace("g_1_", "")
                match_link = row.select_one(".eventRowLink").get("href", "")
                
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
                        "flashscore_id": match_id,
                        "flashscore_link": match_link,
                        "home_team": home_team_name,
                        "away_team": away_team_name,
                        "start_time": match_datetime,
                    }
                )

            except Exception as e:
                print(f"Error parsing match row: {e}")
                continue

        return matches
        
    def parse_match_page(self, html):
        """
        Parse a single match page from Flashscore.
        """
        # soup = BeautifulSoup(html, "html.parser")
        return {} 
        
    def parse_datetime(self, time_str):
        """
        Parse date and time strings into a datetime object.
        """
        try:
            data = time_str.split(' ')

            date_str = data[0]
            time_str = data[1] if len(data) > 1 else "00:00"

            date_obj = self._parse_date(date_str)
            time_obj = self._parse_time(time_str)
            
            print(f"Parsed date: {date_obj}, time: {time_obj}")
            return datetime.datetime.combine(date_obj, time_obj)
        except Exception as e:
            print(f"Error parsing datetime: {e}, time: '{time_str}'")
            return datetime.datetime.now()

    def _parse_date(self, date_str):
        """
        Parse date string into a date object.
        """
        if not date_str:
            return datetime.datetime.now().date()

        date_parts = [part for part in date_str.split('.') if part.strip()]
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

    def _parse_time(self, time_str):
        """
        Parse time string into a time object.
        """
        if ':' in time_str:
            hour, minute = map(int, time_str.split(':'))
        else:
            hour, minute = 0, 0

        return datetime.time(hour, minute)