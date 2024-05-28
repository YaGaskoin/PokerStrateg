from rest_framework import serializers
from .models import Setup, MoveSet


class ReadingSetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setup
        fields = '__all__'
        depth = 1


class SetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setup
        fields = '__all__'


class MoveSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoveSet
        fields = '__all__'

#
# class MoveSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Move
#         fields = '__all__'

