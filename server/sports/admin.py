from django.contrib import admin

from sports.models import League, Sport

# Register your models here.
admin.site.register(Sport)
admin.site.register(League)