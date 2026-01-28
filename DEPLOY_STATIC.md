GitHub Pages static export (local & CI)
-------------------------------------

You can export a static version of the `frontend/` Next.js app and publish it to GitHub Pages using the included workflow `./github/workflows/static-export.yml` or locally for testing.

Local export steps:

```bash
cd frontend
npm ci || npm install
npm run export
# Serve locally for verification (listen on :3000):
npx serve out -p 3000
# or using Python 3's simple server:
python -m http.server --directory out 8080
```

The export will place static files in `frontend/out` which the workflow uploads and deploys to GitHub Pages.

Custom domain (`CNAME`):

- To publish with a custom domain, add a `CNAME` file containing your domain name (e.g. `example.com`) at the repository root or at `frontend/public/CNAME` and push it. The workflow will copy it into the exported `out/` directory so GitHub Pages will pick it up.
- Alternatively, set the repository secret `PAGES_CUSTOM_DOMAIN` to your domain and the workflow will create a `CNAME` during the run.

- To publish with a custom domain, add a `CNAME` file containing your domain name (e.g. `example.com`) at one of these locations in this order of precedence:
	1. repository root `CNAME`
	2. `.github/CNAME`
	3. `frontend/public/CNAME`

	The workflow will pick the first existing `CNAME` from that list and copy it into the exported `out/` directory so GitHub Pages will pick it up.

Note about `.github/CNAME`:

- Placing a `CNAME` in `.github/` is a convenient repository-scoped location for Pages metadata and will be used if a repo-root `CNAME` is not present.

After a successful run, check the Pages settings in GitHub (Settings → Pages) for the published URL and domain status.
