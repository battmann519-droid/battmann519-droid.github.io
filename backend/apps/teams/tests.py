from django.test import TestCase
from django.conf import settings
from django.urls import reverse
from apps.accounts.models import User
from apps.leagues.models import League
from apps.fighters.models import Fighter


class TeamRosterTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='tester', password='pass')
        self.league = League.objects.create(name='Test League', owner=self.user)
        # create fighters
        self.fighters = []
        for i in range(10):
            f = Fighter.objects.create(name=f'Fighter {i}')
            self.fighters.append(f)

    def test_team_creation_exceeds_roster(self):
        self.client.login(username='tester', password='pass')
        max_roster = getattr(settings, 'TEAM_MAX_ROSTER', 5)
        fighter_ids = [f.id for f in self.fighters[: max_roster + 1]]
        url = reverse('teams-create')
        resp = self.client.post(url, {'league_id': self.league.id, 'fighter_ids': fighter_ids}, content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        self.assertIn('Max roster size', resp.json().get('detail', '') or str(resp.json()))

    def test_team_creation_within_roster(self):
        self.client.login(username='tester', password='pass')
        max_roster = getattr(settings, 'TEAM_MAX_ROSTER', 5)
        fighter_ids = [f.id for f in self.fighters[: max_roster]]
        url = reverse('teams-create')
        resp = self.client.post(url, {'league_id': self.league.id, 'fighter_ids': fighter_ids}, content_type='application/json')
        self.assertIn(resp.status_code, (200, 201))
        data = resp.json()
        self.assertIn('id', data)
*** End Patch