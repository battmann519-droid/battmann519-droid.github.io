from django.urls import path
from .views import FighterListView, FighterDetailView

urlpatterns = [
    path('fighters/', FighterListView.as_view(), name='fighters-list'),
    path('fighters/<int:pk>/', FighterDetailView.as_view(), name='fighters-detail'),
]
