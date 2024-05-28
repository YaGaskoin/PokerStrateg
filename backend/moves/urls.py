from django.urls import path

from .views import *

# moves = MoveViewSet.as_view({"get": "list", "post": "create"})
# moves_detail = MoveViewSet.as_view({"get": "retrieve",
#                                     "delete": "destroy",
#                                     "put": "update",
#                                     "patch": "partial_update", })

moveSets = MoveSetViewSet.as_view({"get": "list", "post": "create"})
moveSets_detail = MoveSetViewSet.as_view({"get": "retrieve",
                                          "delete": "destroy",
                                          "put": "update",
                                          "patch": "partial_update", })
right_move_sets = MoveSetViewSet.as_view({"get": "right_moves"})

setups = SetupViewSet.as_view({"get": "list", "post": "create"})
setups_detail = SetupViewSet.as_view({"get": "retrieve",
                                      "delete": "destroy",
                                      "put": "update",
                                      "patch": "partial_update", })

urlpatterns = [
    # path("", moves, name="moves"),
    # path("<int:pk>", moves_detail, name="moves_detail"),
    path("setups", setups, name="setups"),
    path("setups/<int:pk>", setups_detail, name="setups_detail"),
    path("move_sets", moveSets, name="moveSets"),
    path("move_sets/<int:pk>", moveSets_detail, name="moveSets_detail"),
    path("move_sets/right_moves", right_move_sets, name="rightMoveSets"),

]
