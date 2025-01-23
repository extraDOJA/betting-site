from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.username
    
    def get_balance(self):
        return self.balance
    
    def add_balance(self, amount):
        if amount > 0:
            self.balance += amount
            self.save()
            return True
        return False