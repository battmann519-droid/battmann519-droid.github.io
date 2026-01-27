from django.db import models


class ScoringEvent(models.Model):
    fighter = models.ForeignKey('fighters.Fighter', on_delete=models.CASCADE, related_name='scoring_events')
    fight = models.ForeignKey('events.Fight', on_delete=models.CASCADE, related_name='scoring_events')
    points = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.fighter} - {self.points} pts"
