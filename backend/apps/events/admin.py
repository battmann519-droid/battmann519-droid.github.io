from django.contrib import admin
from .models import Event, Fight


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'location')


@admin.register(Fight)
class FightAdmin(admin.ModelAdmin):
    list_display = ('event', 'fighter_a', 'fighter_b', 'result')
    list_filter = ('event',)
