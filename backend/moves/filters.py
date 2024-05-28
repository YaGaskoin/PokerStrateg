import django_filters
from .models import Setup


class SetupsFilter(django_filters.FilterSet):
    position = django_filters.NumberFilter()
    stack = django_filters.NumberFilter()
    move = django_filters.NumberFilter(
        field_name="current_move"
    )

    class Meta:
        model = Setup
        fields = ['position', 'stack', 'move']
