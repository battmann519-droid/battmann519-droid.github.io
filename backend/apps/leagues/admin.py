from django.contrib import admin
from .models import League


@admin.register(League)
class LeagueAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'is_public', 'created_at')
    search_fields = ('name',)
