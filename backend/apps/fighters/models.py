from django.db import models


class Fighter(models.Model):
    name = models.CharField(max_length=200)
    weight_class = models.CharField(max_length=100, blank=True)
    reach = models.PositiveIntegerField(null=True, blank=True)
    stance = models.CharField(max_length=50, blank=True)
    record = models.CharField(max_length=100, blank=True)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name
