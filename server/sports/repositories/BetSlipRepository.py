from django.db.models.manager import BaseManager
from sports.models import BetSlip

class InsufficientBalanceError(Exception):
    pass

class MatchNotAvailableError(Exception):
    pass


class BetSlipRepository:
    @staticmethod
    def get_user_bet_slips(user, status: str) -> BaseManager[BetSlip]:
        """
        Get popular leagues that have upcoming matches.
        """

        user_bet_slips = BetSlip.objects.filter(user=user)

        if status:
            if status == "open":
                user_bet_slips = user_bet_slips.filter(status__in=["pending", "active"])
            elif status == "finished":
                user_bet_slips = user_bet_slips.filter(status__in=["lost", "canceled"])
            elif status == "won":
                user_bet_slips = user_bet_slips.filter(status="won")
            else:
                pass

        return user_bet_slips

    @staticmethod
    def create_bet_slip(user, validated_data):
        """
        Create a new bet slip for the user.
        """
        total_amount = validated_data["total_amount"]

        if user.balance < total_amount:
            raise InsufficientBalanceError()

        for bet_data in validated_data["bets"]:
            match = bet_data["match"]

            if not match.can_bet:
                raise MatchNotAvailableError(f"Match {match} is not available for betting")

        user.substrat_balance(total_amount)
        bet_slip = BetSlip.objects.create(user=user, **validated_data)
        return bet_slip, user.balance