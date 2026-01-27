from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import League
from .serializers import LeagueSerializer


class LeagueListCreateView(generics.ListCreateAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LeagueDetailView(generics.RetrieveAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer


class JoinLeagueView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            league = League.objects.get(id=pk)
        except League.DoesNotExist:
            return Response({'detail': 'League not found'}, status=status.HTTP_404_NOT_FOUND)

        # create team for user if not exists
        from apps.teams.models import Team

        team, created = Team.objects.get_or_create(user=request.user, league=league)
        return Response({'team_id': team.id, 'created': created})
