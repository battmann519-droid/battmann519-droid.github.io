from rest_framework import serializers
from .models import Event, Fight
from apps.fighters.serializers import FighterSerializer


class FightSerializer(serializers.ModelSerializer):
    fighter_a = FighterSerializer(read_only=True)
    fighter_b = FighterSerializer(read_only=True)

    class Meta:
        model = Fight
        fields = ('id', 'event', 'fighter_a', 'fighter_b', 'result', 'stats')


class EventSerializer(serializers.ModelSerializer):
    fights = FightSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'name', 'date', 'location', 'fights')
