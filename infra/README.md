Infra notes

- Populate `env.example` and rename to `.env` for local development.
- Backend: uses Render/Docker for deployment; see `render.yaml` when added.
- Frontend: deploy to Vercel or Render.

Local bootstrap
----------------
From the repo root run the backend bootstrap script to create a venv, install deps, run migrations and load fighter seed data:

```bash
./scripts/bootstrap_backend.sh
```

If you prefer to run commands manually:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py load_fighters
```
