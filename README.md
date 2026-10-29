# Now Playing (GitHub version)

`index.html` is the whole app. No build step.

## Put it on GitHub Pages
1. Create a new repository on GitHub (public is simplest).
2. **Add file → Upload files**, drag in `index.html`, commit.
3. **Settings → Pages**: Source = *Deploy from a branch*, branch `main`, folder `/ (root)`, Save.
4. After a minute it's live at `https://YOUR-USERNAME.github.io/REPO-NAME/`. On a phone, use Share → Add to Home Screen.

## What works there
- Your collection, spins, favorites, notes, queue, hand-entered tracklists (saved in that browser's local storage).
- Cover art, album summaries (Wikipedia) and tracklists (MusicBrainz), looked up straight from the browser.

## What doesn't
- Claude-written summaries, tracklists and standout tracks only work inside the Claude artifact.
- Data is per browser and per device; it does not sync with the artifact.
