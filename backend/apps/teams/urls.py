from django.urls import path
from .views import MyTeamView, AddFighterView, RemoveFighterView, TeamCreateView

urlpatterns = [
    path('teams/my/', MyTeamView.as_view(), name='teams-my'),
    path('teams/add-fighter/', AddFighterView.as_view(), name='teams-add-fighter'),
    path('teams/remove-fighter/', RemoveFighterView.as_view(), name='teams-remove-fighter'),
    path('teams/create/', TeamCreateView.as_view(), name='teams-create'),
]
