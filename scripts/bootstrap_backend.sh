#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/bootstrap_backend.sh
# Creates a virtualenv, installs requirements, runs migrations, and loads fighter seed data.

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR/backend"

# Create venv
if [ ! -d ".venv" ]; then
  python3 -m venv .venv
fi

# Activate
# shellcheck disable=SC1091
. .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

# Ensure migrations and DB
python manage.py makemigrations --noinput || true
python manage.py migrate --noinput

# Load fighters seed
python manage.py load_fighters || true

echo "Backend bootstrapped. Run 'python manage.py runserver' to start the server." 
