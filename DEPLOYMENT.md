Vercel deployment
=================

This repository contains a Next.js frontend in `frontend/`. To deploy it automatically to Vercel from GitHub, follow these steps:

1. Create a Vercel project and link it to this GitHub repository (recommended) or create a new project in the Vercel dashboard.

2. In your GitHub repository settings, add the following secrets (Repository → Settings → Secrets → Actions):
   - `VERCEL_TOKEN` — your Vercel Personal Token (create from https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` — the Vercel organization id for the project (found in the project dashboard URL or Vercel settings)
   - `VERCEL_PROJECT_ID` — the Vercel project id (found in the project settings)

3. The workflow `.github/workflows/vercel-deploy.yml` will run on push to `main` and on manual dispatch; it uses the `frontend` folder as the working directory and deploys with `--prod`.

4. If you prefer to deploy locally with the Vercel CLI, run these commands:

```bash
npm i -g vercel
cd frontend
vercel --prod
```

Notes
-----
- The workflow uses `amondnet/vercel-action@v20`. If you prefer another action or direct `vercel` CLI usage, adjust the workflow accordingly.
- For App Router Next.js projects, Vercel is the recommended host (automatic optimizations, SSR support).
