# Deploying StudySync (Flask)

Nothing in `app.py` or `database.py` was changed. These files only add the
hosting glue.

## Files added
- `Procfile` — start command: creates the SQLite tables, then runs gunicorn.
- `runtime.txt` — Python version for the host.
- `gunicorn` added to `requirements.txt`.

## Render (free tier, easiest)
1. Push the `studysync/` folder to a GitHub repo (it can be the repo root).
2. On https://render.com → **New → Web Service** → connect the repo.
3. Settings:
   - Root Directory: `studysync` (leave blank if studysync is the repo root)
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python database.py && gunicorn app:app --bind 0.0.0.0:$PORT`
4. Add these environment variables in Render's **Environment** settings (do not
   commit them to the repository):
   - `APP_ENV=production`
   - `SECRET_KEY=<a unique, random value of at least 32 bytes>`
   - `PYTHON_VERSION=3.12.6` if needed.
5. Deploy. Your app is live at `https://<name>.onrender.com`.

## Railway / Fly.io
Both auto-detect the `Procfile`, so just connect the repo and deploy.

## PythonAnywhere
Upload the folder, create a Flask web app pointing at `app.py`, set the
working directory to the project folder, then run `python database.py` once
in a Bash console to create `database.db`.

## Important notes
- **SQLite is ephemeral on Render/Railway free tiers** — the disk resets on each
  deploy or restart, so users/notes will be wiped. For persistent data attach a
  disk (Render) or a volume (Fly), or switch to Postgres later.
- `SECRET_KEY` is required when `APP_ENV=production`; the application refuses
  to start without it. Generate it with `python -c "import secrets; print(secrets.token_urlsafe(64))"`
  and store it only in your hosting provider's secret manager. The old
  hardcoded key was present in Git history, so do not reuse it.
- Debug mode is disabled by default. Set `FLASK_DEBUG=1` only for local work;
  Gunicorn does not enable it automatically.
