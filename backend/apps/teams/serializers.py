from rest_framework import serializers
from .models import Team
from apps.fighters.serializers import FighterSerializer


class TeamSerializer(serializers.ModelSerializer):
    fighters = FighterSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ('id', 'user', 'league', 'fighters', 'created_at')
        read_only_fields = ('user', 'created_at')
