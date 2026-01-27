from django.db import models
from django.conf import settings


class Team(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='teams')
    league = models.ForeignKey('leagues.League', on_delete=models.CASCADE, related_name='teams')
    fighters = models.ManyToManyField('fighters.Fighter', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.league.name}"
