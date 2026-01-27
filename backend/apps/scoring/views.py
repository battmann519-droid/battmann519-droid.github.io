from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ScoringEvent
from apps.events.models import Fight


class CalcScoringView(APIView):
    def post(self, request, fight_id):
        try:
            fight = Fight.objects.get(id=fight_id)
        except Fight.DoesNotExist:
            return Response({'detail': 'Fight not found'}, status=status.HTTP_404_NOT_FOUND)

        # Basic scoring rules implementation using fight.result and stats
        # Default: winner gets 10 points
        stats = fight.stats or {}
        results = {}

        winner = None
        if fight.result:
            # Simplified result parsing: assume result contains winner's name or 'a'/'b'
            if 'a' in fight.result.lower():
                winner = fight.fighter_a
            elif 'b' in fight.result.lower():
                winner = fight.fighter_b
            else:
                # try matching fighter names
                if fight.fighter_a.name.lower() in fight.result.lower():
                    winner = fight.fighter_a
                elif fight.fighter_b.name.lower() in fight.result.lower():
                    winner = fight.fighter_b

        # compute for both fighters
        for fighter in (fight.fighter_a, fight.fighter_b):
            points = 0
            if winner and fighter == winner:
                points += 10
            # KO/TKO or submission bonuses
            if fight.result and any(k in fight.result.lower() for k in ('ko', 'tko')):
                if winner and fighter == winner:
                    points += 5
            if fight.result and 'submission' in fight.result.lower():
                if winner and fighter == winner:
                    points += 5
            # decision
            if fight.result and 'decision' in fight.result.lower():
                if winner and fighter == winner:
                    points += 2
            # knockdowns
            kd = 0
            kds = stats.get('knockdowns', {})
            if isinstance(kds, dict):
                kd = kds.get(str(fighter.id), 0)
            else:
                # fallback: numeric value per fighter key
                kd = 0
            points += int(kd) * 3
            # control time (minutes)
            control = stats.get('control_time', {}).get(str(fighter.id), 0) if isinstance(stats.get('control_time', {}), dict) else 0
            points += int(control) * 1
            # significant strikes
            strikes = stats.get('significant_strikes', {}).get(str(fighter.id), 0) if isinstance(stats.get('significant_strikes', {}), dict) else 0
            points += int(strikes * 0.1)

            # create scoring event
            se = ScoringEvent.objects.create(fighter=fighter, fight=fight, points=points)
            results[fighter.id] = points

        return Response({'fight_id': fight.id, 'scores': results})


class LeagueScoringView(APIView):
    def get(self, request, league_id):
        # Aggregate points per team in a league
        from apps.teams.models import Team
        teams = Team.objects.filter(league_id=league_id).prefetch_related('fighters__scoring_events')
        standings = []
        for team in teams:
            total = 0
            for f in team.fighters.all():
                total += sum(se.points for se in f.scoring_events.all())
            standings.append({'team_id': team.id, 'user': team.user.username, 'points': total})
        standings.sort(key=lambda x: x['points'], reverse=True)
        return Response({'league_id': league_id, 'standings': standings})
