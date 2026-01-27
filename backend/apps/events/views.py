from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Event, Fight
from .serializers import EventSerializer, FightSerializer


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class PostResultsView(APIView):
    def post(self, request, pk):
        # Expect payload: { "fight_id": x, "result": "KO", "stats": {...} }
        fight_id = request.data.get('fight_id')
        try:
            fight = Fight.objects.get(id=fight_id, event_id=pk)
        except Fight.DoesNotExist:
            return Response({'detail': 'Fight not found'}, status=status.HTTP_404_NOT_FOUND)

        fight.result = request.data.get('result', fight.result)
        fight.stats = request.data.get('stats', fight.stats)
        fight.save()

        return Response(FightSerializer(fight).data)
