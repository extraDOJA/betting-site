from abc import ABC, abstractmethod
from sports.models import Bet



class Settlement(ABC):
    @abstractmethod
    def settle_bet(self, bet: Bet) -> None:
        """
        Get matches for a specific league.
        """
        pass


class SettlementFactory:
    """
    Factory class to create settlement strategies based on the type.
    """

    @staticmethod
    def create_settlement(sport_type: str) -> Settlement | None:
        match sport_type.lower():
            case 'football':
                from .settlements.FootballSettlement import FootballSettlement
                return FootballSettlement()
            case _:
                print(f"Settlement for sport type '{sport_type}' is not implemented.")
                return None
                
