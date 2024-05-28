from django.urls import path

from .views import *

positions = PositionViewSet.as_view({"get": "list", "post": "create"})
positions_detail = PositionViewSet.as_view({"get": "retrieve",
                                    "delete": "destroy",
                                    "put": "update",
                                    "patch": "partial_update", })

hands = HandViewSet.as_view({"get": "list", "post": "create"})
hands_detail = HandViewSet.as_view({"get": "retrieve",
                                          "delete": "destroy",
                                          "put": "update",
                                          "patch": "partial_update", })

stacks = StackViewSet.as_view({"get": "list", "post": "create"})
stacks_detail = StackViewSet.as_view({"get": "retrieve",
                                      "delete": "destroy",
                                      "put": "update",
                                      "patch": "partial_update", })

urlpatterns = [
    path("positions/", positions, name="positions"),
    path("positions/<int:pk>", positions_detail, name="positions_detail"),
    path("hands", hands, name="hands"),
    path("hands/<int:pk>", hands_detail, name="hands_detail"),
    path("stacks", stacks, name="stacks"),
    path("stacks/<int:pk>", stacks_detail, name="stacks_detail"),

]
