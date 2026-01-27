from django.core.management.base import BaseCommand
import json
from ...models import Fighter
from django.conf import settings
from pathlib import Path


class Command(BaseCommand):
    help = 'Load fighters from infra/fighters.json'

    def handle(self, *args, **options):
        base = Path(settings.BASE_DIR)
        data_file = base.parent / 'infra' / 'fighters.json'
        if not data_file.exists():
            self.stdout.write(self.style.ERROR(f'File not found: {data_file}'))
            return

        with open(data_file, 'r') as f:
            data = json.load(f)

        created = 0
        for item in data:
            obj, _ = Fighter.objects.update_or_create(
                name=item.get('name'),
                defaults={
                    'weight_class': item.get('weight_class', ''),
                    'reach': item.get('reach'),
                    'stance': item.get('stance', ''),
                    'record': item.get('record', ''),
                    'image_url': item.get('image_url', ''),
                }
            )
            created += 1

        self.stdout.write(self.style.SUCCESS(f'Loaded {created} fighters'))
