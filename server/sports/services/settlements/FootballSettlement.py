from sports.services.settlement import Settlement


class FootballSettlement(Settlement):
    from sports.models import Bet

    """
    Settlement for football bets.
    This class implements the logic to settle football bets based on match results.
    """

    def settle_bet(self, bet: Bet) -> None:
        if not bet.bet_option:
            return

        match bet.bet_option.bet_type.code.lower():
            case "1x2":
                self._settle_win(bet)
            case _:
                print(f"Settlement for bet type '{bet.bet_option.bet_type}' is not implemented.")
                

    def _settle_win(self, bet: Bet) -> None:
        """
        Settle a winning bet.
        """
        match = bet.match
        bet_option = bet.bet_option

        if match.status != "finished" or match.home_score is None or match.away_score is None or bet_option is None:
            return

        if match.home_score > match.away_score:
            result = "home"
        elif match.home_score == match.away_score:
            result = "draw"
        else:
            result = "away"

        if bet_option.value == result:
            bet.status = "won"
        else:
            bet.status = "lost"

        bet.save(update_fields=["status"])


