from django.contrib import admin
from .models import ScoringEvent


@admin.register(ScoringEvent)
class ScoringEventAdmin(admin.ModelAdmin):
    list_display = ('fighter', 'fight', 'points', 'created_at')
    list_filter = ('fight',)
