import os

from django.contrib import admin
from django.urls import include, path
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.routers import DefaultRouter

from .views import (
    ActivityViewSet,
    LeaderboardEntryViewSet,
    TeamViewSet,
    UserProfileViewSet,
    WorkoutViewSet,
)

codespace_name = os.environ.get('CODESPACE_NAME')


def get_api_base_url(request):
    host = request.get_host().split(':', 1)[0]
    if host in {'localhost', '127.0.0.1'}:
        return 'http://localhost:8000'
    if codespace_name:
        return f"https://{codespace_name}-8000.app.github.dev"
    return request.build_absolute_uri('/').rstrip('/')


@api_view(['GET'])
def api_root(request):
    base_url = get_api_base_url(request)
    return Response(
        {
            'users': f'{base_url}/api/users/',
            'teams': f'{base_url}/api/teams/',
            'activities': f'{base_url}/api/activities/',
            'leaderboard': f'{base_url}/api/leaderboard/',
            'workouts': f'{base_url}/api/workouts/',
        },
        status=status.HTTP_200_OK,
    )

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
