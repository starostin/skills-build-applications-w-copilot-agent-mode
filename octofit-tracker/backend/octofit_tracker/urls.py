import os

from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ActivityViewSet,
    LeaderboardEntryViewSet,
    TeamViewSet,
    UserProfileViewSet,
    WorkoutViewSet,
    api_root,
)

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = DefaultRouter()
router.register('users', UserProfileViewSet, basename='userprofile')
router.register('teams', TeamViewSet, basename='team')
router.register('activities', ActivityViewSet, basename='activity')
router.register('leaderboard', LeaderboardEntryViewSet, basename='leaderboardentry')
router.register('workouts', WorkoutViewSet, basename='workout')

urlpatterns = [
    path('', api_root, name='site-root'),
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
