from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import action
from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    extend_schema_view,
)
from django_filters import rest_framework as filters
from .filters import SetupsFilter
from rest_framework.response import Response

from fact_data.models import Hands, Positions, Stacks


# class MoveViewSet(viewsets.ModelViewSet):
#     queryset = Move.objects.all()
#     serializer_class = MoveSerializer


class MoveSetViewSet(viewsets.ModelViewSet):
    queryset = MoveSet.objects.all()
    serializer_class = MoveSetSerializer

    @extend_schema(
        summary="Получить расклад по сетапу",
        parameters=[
            OpenApiParameter(name="position", required=True),
            OpenApiParameter(
                name="stack",
                required=True,
            ),
            OpenApiParameter(
                name="hand",
                required=True,
            ),
        ],
    )
    @action(detail=False, methods=['GET'], name='right_moves')
    def right_moves(self, request, *args, **kwargs):
        hand = Hands.objects.get(id=request.query_params.get('hand'))
        position = Positions.objects.get(id=request.query_params.get('position'))
        stack = Stacks.objects.get(id=request.query_params.get('stack'))
        setups = Setup.objects.filter(hands__in=[hand], position=position, stack=stack)
        right_moves = MoveSet.objects.filter(moves__in=setups)

        return Response(data=self.serializer_class(right_moves, many=True).data)



class SetupViewSet(viewsets.ModelViewSet):
    queryset = Setup.objects.all()
    serializer_class = SetupSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SetupsFilter

    def get_serializer_class(self):
        if self.action in ['list']:
            return ReadingSetupSerializer
        return SetupSerializer
