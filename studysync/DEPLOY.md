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
4. Add an environment variable `PYTHON_VERSION` = `3.12.6` if needed.
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
- Set a real secret key in production. Today it is hardcoded in `app.py`
  (`app.secret_key = "study_sync_secret"`). Changing that is a backend edit, so
  it has been left alone — do it yourself when you go live for real.
- `debug=True` in `app.py` only applies when running `python app.py` locally;
  gunicorn ignores it, so production is safe.
