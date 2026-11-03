# Pamana

Pamana is a static website made with HTML, CSS, and vanilla JavaScript. It has no npm packages or build step.

## Run locally

If Node.js is already installed, start the included preview server:

```sh
node server.js
```

Then open `http://localhost:5173`. Alternatively, open the folder with VS Code Live Server or host the files on any static web host.

You do not need npm or `node_modules` to edit or deploy the site. Node.js is only needed for the optional local preview server.

## Deploy to Vercel

The site is deployed as static files from the repository root; it has no Vite build step. `vercel.json` selects Vercel's **Other** framework preset, disables any dashboard-configured build command, and serves the repository root. Push this file to the connected Git branch to trigger a new deployment.

## Background music

The Arts, Festivals, Christmas Festivities, and Superstition pages each have their own looping background track. Music starts at 25% of the player's full volume scale and can be adjusted with the floating player. Christmas and Superstition music continues from its saved position across pages within that tradition. If the browser blocks automatic playback, select **Play music**; it will then continue across that category's pages.

## Project structure

- `index.html` — forwards to the site
- `cultural-heritage-pages/` — all site pages, including the landing page, arts, festivals, references, traditions, and team redirect
- `cultural-heritage-pages/arts/` — arts page, styles, and art images
- `cultural-heritage-pages/festivals/` — festival page and images
- `cultural-heritage-pages/traditions/` — traditions and their subcategories
- `cultural-heritage-pages/references/` — source library page
- `assets/css/` and `assets/js/` — shared site styles and interactions
- `assets/images/` — shared images, team portraits, and favicon
- `server.js` — optional, dependency-free local preview server
- `design-backups/` — archived design files; not used by the live site
