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
- It does not sync with the Claude artifact.
- Without signing in, data stays in that one browser.

## Profiles (sign in to sync across devices)
The page has a "Save your profile" card. Visitors enter their email, open the emailed link, and their history, favorites, notes and summaries sync to the Supabase project below. Each person can only read and write their own rows (row-level security).

- Project: `https://onwfwhvgmzvdmibyzpka.supabase.co` (the publishable key is in `index.html`; that key is meant to be public).
- Table `spin_data (user_id, k, v, updated_at)` with the policy "own rows" (see the SQL you ran when setting it up).
- In Supabase, Authentication -> URL Configuration: set Site URL to your site (https://joshmaillet.com) and add the exact page address under Redirect URLs, or the emailed link will not return to the page.
- Supabase's built-in email sender is limited to a few emails an hour; connect your own SMTP service if many people will sign up.
- Never put the `service_role` / secret key in the page.
