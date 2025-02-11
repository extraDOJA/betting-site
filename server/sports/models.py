from django.db import models

# Create your models here.
class Sport(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class League(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='leagues')
    country_code = models.CharField(max_length=2, help_text="Country key ISO 2")
    is_active = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.sport.name})"

    class Meta:
        ordering = ['sport', 'name']