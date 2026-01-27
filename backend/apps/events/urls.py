from django.urls import path
from .views import EventListView, EventDetailView, PostResultsView

urlpatterns = [
    path('events/', EventListView.as_view(), name='events-list'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='events-detail'),
    path('events/<int:pk>/results/', PostResultsView.as_view(), name='events-results'),
]
