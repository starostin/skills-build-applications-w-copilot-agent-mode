from bson import ObjectId
from djongo import models


class TimeStampedDocument(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserProfile(TimeStampedDocument):
    full_name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    hero_alias = models.CharField(max_length=120)
    favorite_team = models.CharField(max_length=60)
    weekly_goal = models.PositiveIntegerField(default=3)
    total_points = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "users"
        ordering = ["full_name"]

    def __str__(self):
        return self.full_name


class Team(TimeStampedDocument):
    name = models.CharField(max_length=60, unique=True)
    universe = models.CharField(max_length=20)
    captain_name = models.CharField(max_length=120)
    motto = models.CharField(max_length=255)

    class Meta:
        db_table = "teams"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Activity(TimeStampedDocument):
    user_email = models.EmailField()
    team_name = models.CharField(max_length=60)
    activity_type = models.CharField(max_length=60)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField()
    workout_date = models.DateField()

    class Meta:
        db_table = "activities"
        ordering = ["-workout_date", "user_email"]

    def __str__(self):
        return f"{self.user_email} - {self.activity_type}"


class LeaderboardEntry(TimeStampedDocument):
    user_email = models.EmailField(unique=True)
    hero_alias = models.CharField(max_length=120)
    team_name = models.CharField(max_length=60)
    points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "leaderboard"
        ordering = ["rank", "-points"]

    def __str__(self):
        return f"{self.hero_alias} ({self.points})"


class Workout(TimeStampedDocument):
    title = models.CharField(max_length=120)
    target_team = models.CharField(max_length=60)
    difficulty = models.CharField(max_length=40)
    duration_minutes = models.PositiveIntegerField()
    focus_area = models.CharField(max_length=80)
    description = models.TextField()

    class Meta:
        db_table = "workouts"
        ordering = ["title"]

    def __str__(self):
        return self.title