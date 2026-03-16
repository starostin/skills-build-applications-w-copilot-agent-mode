from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class ObjectIdStringField(serializers.Field):
    def to_representation(self, value):
        return str(value)


class BaseDocumentSerializer(serializers.ModelSerializer):
    id = ObjectIdStringField(read_only=True)


class UserProfileSerializer(BaseDocumentSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class TeamSerializer(BaseDocumentSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class ActivitySerializer(BaseDocumentSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class LeaderboardEntrySerializer(BaseDocumentSerializer):
    class Meta:
        model = LeaderboardEntry
        fields = "__all__"


class WorkoutSerializer(BaseDocumentSerializer):
    class Meta:
        model = Workout
        fields = "__all__"