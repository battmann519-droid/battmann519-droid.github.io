from rest_framework import serializers
from .models import Fighter


class FighterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fighter
        fields = ('id', 'name', 'weight_class', 'reach', 'stance', 'record', 'image_url')
