from django.urls import path
from .views import CalcScoringView, LeagueScoringView

urlpatterns = [
    path('scoring/calc/<int:fight_id>/', CalcScoringView.as_view(), name='scoring-calc'),
    path('scoring/league/<int:league_id>/', LeagueScoringView.as_view(), name='scoring-league'),
]
