from django.contrib import admin
from .models import Fighter


@admin.register(Fighter)
class FighterAdmin(admin.ModelAdmin):
    list_display = ('name', 'weight_class', 'reach')
    search_fields = ('name',)
