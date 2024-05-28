from django.db import models
from fact_data.models import *


class MoveSet(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['-id']


class Setup(models.Model):
    current_move = models.ForeignKey(MoveSet, related_name='moves', on_delete=models.CASCADE, null=True)
    position = models.ForeignKey(Positions, related_name='setups', on_delete=models.CASCADE, null=True)
    stack = models.ForeignKey(Stacks, related_name='setups', on_delete=models.CASCADE, null=True)
    hands = models.ManyToManyField(Hands, related_name='stacks')

    class Meta:
        ordering = ['-id']

