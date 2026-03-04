# Deployment Spec

## GitHub Pages via GitHub Actions

### Workflow

File: `.github/workflows/deploy.yml`

Trigger: Push to `main` branch

Steps:
1. Checkout code
2. Setup Node.js (v20)
3. Install dependencies (`npm ci`)
4. Build (`npm run build`)
5. Deploy `dist/` to GitHub Pages

### Vite Config

- Set `base` to repo name for GitHub Pages (e.g., `base: '/longyearbyen-community/'`)
- Ensure SPA routing works with a `404.html` that redirects to `index.html`

### GitHub Pages Setup

- Source: GitHub Actions (not branch-based)
- Custom domain: not needed for demo

## SPA Routing on GitHub Pages

GitHub Pages doesn't support SPA routing natively. Use the common workaround:

1. Copy `index.html` to `404.html` in the build step
2. This ensures all routes load the app, and React Router handles routing client-side

## README

Update README.md with:
- Project description
- Link to hosted app: `https://<username>.github.io/longyearbyen-community/`
- Brief feature list
- Tech stack
- How to run locally
