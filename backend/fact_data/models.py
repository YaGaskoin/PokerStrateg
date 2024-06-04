from django.db import models


class Positions(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['-id']


class Stacks(models.Model):
    max_size = models.IntegerField()
    min_size = models.IntegerField()

    class Meta:
        ordering = ['-id']


class Hands(models.Model):
    cards = models.CharField(max_length=2)
    suite = models.BooleanField()

    class Meta:
        ordering = ['-id']
        unique_together = ('cards', 'suite',)


class Authors(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ['-id']
