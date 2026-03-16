from datetime import date

from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Resetting OctoFit collections...')

        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        UserProfile.objects.all().delete()

        teams = [
            Team.objects.create(
                name='Team Marvel',
                universe='Marvel',
                captain_name='Captain America',
                motto='Assemble for every workout challenge.',
            ),
            Team.objects.create(
                name='Team DC',
                universe='DC',
                captain_name='Wonder Woman',
                motto='Train like justice depends on it.',
            ),
        ]

        users = [
            UserProfile.objects.create(
                full_name='Peter Parker',
                email='spiderman@octofit.test',
                hero_alias='Spider-Man',
                favorite_team='Team Marvel',
                weekly_goal=5,
                total_points=140,
            ),
            UserProfile.objects.create(
                full_name='Carol Danvers',
                email='captainmarvel@octofit.test',
                hero_alias='Captain Marvel',
                favorite_team='Team Marvel',
                weekly_goal=4,
                total_points=155,
            ),
            UserProfile.objects.create(
                full_name='Bruce Wayne',
                email='batman@octofit.test',
                hero_alias='Batman',
                favorite_team='Team DC',
                weekly_goal=6,
                total_points=162,
            ),
            UserProfile.objects.create(
                full_name='Diana Prince',
                email='wonderwoman@octofit.test',
                hero_alias='Wonder Woman',
                favorite_team='Team DC',
                weekly_goal=5,
                total_points=168,
            ),
        ]

        Activity.objects.bulk_create(
            [
                Activity(
                    user_email='spiderman@octofit.test',
                    team_name='Team Marvel',
                    activity_type='Wall Climb HIIT',
                    duration_minutes=45,
                    calories_burned=420,
                    workout_date=date(2026, 3, 12),
                ),
                Activity(
                    user_email='captainmarvel@octofit.test',
                    team_name='Team Marvel',
                    activity_type='Flight Core Circuit',
                    duration_minutes=50,
                    calories_burned=480,
                    workout_date=date(2026, 3, 13),
                ),
                Activity(
                    user_email='batman@octofit.test',
                    team_name='Team DC',
                    activity_type='Gotham Strength Session',
                    duration_minutes=60,
                    calories_burned=510,
                    workout_date=date(2026, 3, 14),
                ),
                Activity(
                    user_email='wonderwoman@octofit.test',
                    team_name='Team DC',
                    activity_type='Amazon Endurance Run',
                    duration_minutes=55,
                    calories_burned=495,
                    workout_date=date(2026, 3, 15),
                ),
            ]
        )

        LeaderboardEntry.objects.bulk_create(
            [
                LeaderboardEntry(
                    user_email='wonderwoman@octofit.test',
                    hero_alias='Wonder Woman',
                    team_name='Team DC',
                    points=168,
                    rank=1,
                ),
                LeaderboardEntry(
                    user_email='batman@octofit.test',
                    hero_alias='Batman',
                    team_name='Team DC',
                    points=162,
                    rank=2,
                ),
                LeaderboardEntry(
                    user_email='captainmarvel@octofit.test',
                    hero_alias='Captain Marvel',
                    team_name='Team Marvel',
                    points=155,
                    rank=3,
                ),
                LeaderboardEntry(
                    user_email='spiderman@octofit.test',
                    hero_alias='Spider-Man',
                    team_name='Team Marvel',
                    points=140,
                    rank=4,
                ),
            ]
        )

        Workout.objects.bulk_create(
            [
                Workout(
                    title='Avengers Power Push',
                    target_team='Team Marvel',
                    difficulty='Intermediate',
                    duration_minutes=40,
                    focus_area='Strength',
                    description='Upper-body power intervals inspired by the Avengers roster.',
                ),
                Workout(
                    title='Justice League Sprint Set',
                    target_team='Team DC',
                    difficulty='Advanced',
                    duration_minutes=35,
                    focus_area='Cardio',
                    description='Fast sprint rotations and recovery blocks for league-level stamina.',
                ),
                Workout(
                    title='Hero Recovery Flow',
                    target_team='Team Marvel',
                    difficulty='Beginner',
                    duration_minutes=25,
                    focus_area='Mobility',
                    description='A low-impact mobility flow for post-battle recovery days.',
                ),
                Workout(
                    title='Amazon Warrior Circuit',
                    target_team='Team DC',
                    difficulty='Intermediate',
                    duration_minutes=45,
                    focus_area='Conditioning',
                    description='Full-body circuit work emphasizing agility and lower-body power.',
                ),
            ]
        )

        self.stdout.write(self.style.SUCCESS(f'Inserted {len(teams)} teams and {len(users)} users.'))
        self.stdout.write(self.style.SUCCESS('Inserted activities, leaderboard entries, and workouts.'))