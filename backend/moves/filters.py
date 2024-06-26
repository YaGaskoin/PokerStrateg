import django_filters
from .models import Setup


class SetupsFilter(django_filters.FilterSet):
    position = django_filters.NumberFilter()
    stack = django_filters.NumberFilter()
    move = django_filters.NumberFilter(
        field_name="current_move"
    )
    author = django_filters.NumberFilter()

    class Meta:
        model = Setup
        fields = ['author', 'position', 'stack', 'move']
