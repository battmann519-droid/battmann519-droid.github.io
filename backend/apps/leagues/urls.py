from django.urls import path
from .views import LeagueListCreateView, LeagueDetailView, JoinLeagueView

urlpatterns = [
    path('leagues/', LeagueListCreateView.as_view(), name='leagues-list-create'),
    path('leagues/<int:pk>/', LeagueDetailView.as_view(), name='leagues-detail'),
    path('leagues/<int:pk>/join/', JoinLeagueView.as_view(), name='leagues-join'),
]
