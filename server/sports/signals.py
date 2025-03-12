from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction

from .models import Bet, Match


@receiver(post_save, sender=Match)
def process_match_result_update(sender, instance, created, **kwargs):
    """
    Signal handler triggered when a match is updated.
    Automatically settles bets and updates bet slips when a match result is finalized.
    """
    if not instance.is_finished:
        return

    with transaction.atomic():
        settle_match_bets(instance)



def settle_match_bets(match):
    """
    Settles all pending bets for a specific match.
    """
    pending_matches = Bet.objects.filter(match=match, status="pending")

    for bet in pending_matches:
        try:
            bet.settle_bet()
        except Exception as e:
            print(f"Error settling bet {bet}: {str(e)}")
