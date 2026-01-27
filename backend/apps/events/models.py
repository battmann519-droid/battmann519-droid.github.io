from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField()
    location = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.name} - {self.date.date()}"


class Fight(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='fights')
    fighter_a = models.ForeignKey('fighters.Fighter', on_delete=models.CASCADE, related_name='fights_as_a')
    fighter_b = models.ForeignKey('fighters.Fighter', on_delete=models.CASCADE, related_name='fights_as_b')
    result = models.CharField(max_length=200, blank=True)
    stats = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.fighter_a} vs {self.fighter_b} @ {self.event.name}"
