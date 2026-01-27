from rest_framework import serializers
from .models import ScoringEvent
from apps.fighters.serializers import FighterSerializer


class ScoringEventSerializer(serializers.ModelSerializer):
    fighter = FighterSerializer(read_only=True)

    class Meta:
        model = ScoringEvent
        fields = ('id', 'fighter', 'fight', 'points', 'created_at')
