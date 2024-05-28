from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *


class HandViewSet(viewsets.ModelViewSet):
    queryset = Hands.objects.all()
    serializer_class = HandSerializer


class PositionViewSet(viewsets.ModelViewSet):
    queryset = Positions.objects.all()
    serializer_class = PositionSerializer


class StackViewSet(viewsets.ModelViewSet):
    queryset = Stacks.objects.all()
    serializer_class = StackSerializer
