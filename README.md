# Spin Something (web version)

A single-page vinyl picker. No build step, no server: `index.html` is the whole app.

## Put it on GitHub Pages

1. Create a new repository on GitHub (for example `spin-something`). Public is simplest.
2. Click **Add file → Upload files**, drag in `index.html` (and this README if you like), and commit.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose branch `main` and folder `/ (root)`, then Save.
4. After a minute your app is live at `https://YOUR-USERNAME.github.io/spin-something/`.
5. On your phone, open that URL and use **Share → Add to Home Screen** to get an app icon.

## What works without any setup

- Album summaries from Wikipedia (looked up live in your browser).
- Full tracklists from MusicBrainz (looked up live, about one request per second).
- Your collection, spin counts, favorites, notes, queue and hand-entered tracklists, saved in your browser's local storage.

Local storage is per browser and per device, so your phone and laptop keep separate data.

## What needs Claude (optional)

These features used Claude inside the original artifact: summaries for albums Wikipedia doesn't cover, standout tracks (bold with YouTube links), and the fallback tracklists. To turn them back on you need a small proxy that holds your Anthropic API key. The key must never go in `index.html`.

1. Create a free Cloudflare account and a new **Worker**, then paste in `worker.js`.
2. In the Worker's settings add a secret named `ANTHROPIC_API_KEY` and a variable named `ALLOWED_ORIGIN` set to `https://YOUR-USERNAME.github.io`.
3. Open `index.html`, find `window.SPIN_CLAUDE_PROXY=""` near the top, and put the Worker's URL between the quotes. Commit the change.

Anyone who finds the Worker URL could spend your API credit, which is why `ALLOWED_ORIGIN` is set. Keep an eye on usage in the Anthropic console.

## Known limits

- Standout tracks are only marked for albums with built-in data, or after you mark them yourself (start a line with `*` when editing a tracklist), unless you set up the proxy.
- MusicBrainz doesn't know every pressing. If no tracklist is found, tap the pencil to add one.
