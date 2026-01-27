from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Team
from .serializers import TeamSerializer
from apps.fighters.models import Fighter
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings


class MyTeamView(generics.ListAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        return Team.objects.filter(user=self.request.user)


class AddFighterView(APIView):
    def post(self, request):
        team_id = request.data.get('team_id')
        fighter_id = request.data.get('fighter_id')
        try:
            team = Team.objects.get(id=team_id, user=request.user)
            fighter = Fighter.objects.get(id=fighter_id)
        except Team.DoesNotExist:
            return Response({'detail': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        except Fighter.DoesNotExist:
            return Response({'detail': 'Fighter not found'}, status=status.HTTP_404_NOT_FOUND)

        team.fighters.add(fighter)
        return Response(TeamSerializer(team).data)


class RemoveFighterView(APIView):
    def post(self, request):
        team_id = request.data.get('team_id')
        fighter_id = request.data.get('fighter_id')
        try:
            team = Team.objects.get(id=team_id, user=request.user)
            fighter = Fighter.objects.get(id=fighter_id)
        except Team.DoesNotExist:
            return Response({'detail': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        except Fighter.DoesNotExist:
            return Response({'detail': 'Fighter not found'}, status=status.HTTP_404_NOT_FOUND)

        team.fighters.remove(fighter)
        return Response(TeamSerializer(team).data)


class TeamCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        league_id = request.data.get('league_id')
        fighter_ids = request.data.get('fighter_ids', [])
        if not league_id:
            return Response({'detail': 'league_id required'}, status=status.HTTP_400_BAD_REQUEST)

        from apps.leagues.models import League

        try:
            league = League.objects.get(id=league_id)
        except League.DoesNotExist:
            return Response({'detail': 'League not found'}, status=status.HTTP_404_NOT_FOUND)

        # enforce one team per user per league
        existing = Team.objects.filter(user=request.user, league=league).first()
        if existing:
            return Response({'detail': 'User already has a team in this league', 'team_id': existing.id}, status=status.HTTP_400_BAD_REQUEST)

        team = Team.objects.create(user=request.user, league=league)

        # validate roster size
        max_roster = getattr(settings, 'TEAM_MAX_ROSTER', 5)
        if fighter_ids and len(fighter_ids) > max_roster:
            return Response({'detail': f'Max roster size is {max_roster}'}, status=status.HTTP_400_BAD_REQUEST)

        # set fighters if provided
        if fighter_ids:
            fighters = Fighter.objects.filter(id__in=fighter_ids)
            team.fighters.set(fighters)
            team.save()

        return Response(TeamSerializer(team).data, status=status.HTTP_201_CREATED)
