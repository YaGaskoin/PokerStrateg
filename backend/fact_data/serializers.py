from rest_framework import serializers
from .models import Positions, Hands, Stacks


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Positions
        fields = '__all__'


class HandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hands
        fields = '__all__'


class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stacks
        fields = '__all__'

