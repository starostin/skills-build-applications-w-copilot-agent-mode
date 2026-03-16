from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout
from .serializers import (
    ActivitySerializer,
    LeaderboardEntrySerializer,
    TeamSerializer,
    UserProfileSerializer,
    WorkoutSerializer,
)


@api_view(["GET"])
def api_root(request):
    return Response(
        {
            "users": request.build_absolute_uri("/api/users/"),
            "teams": request.build_absolute_uri("/api/teams/"),
            "activities": request.build_absolute_uri("/api/activities/"),
            "leaderboard": request.build_absolute_uri("/api/leaderboard/"),
            "workouts": request.build_absolute_uri("/api/workouts/"),
        },
        status=status.HTTP_200_OK,
    )


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class LeaderboardEntryViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.all()
    serializer_class = LeaderboardEntrySerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer