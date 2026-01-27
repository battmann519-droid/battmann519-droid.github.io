from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.accounts.urls')),
    path('api/', include('apps.fighters.urls')),
    path('api/', include('apps.leagues.urls')),
    path('api/', include('apps.teams.urls')),
    path('api/', include('apps.events.urls')),
    path('api/', include('apps.scoring.urls')),
]
