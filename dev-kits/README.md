# Mad Tea Party Development · March Hare Games

A dark Wonderland-forest site for GitHub Pages. Whimsy, magic & mania.

| File | What it is |
|---|---|
| `index.html` | **Software Shop:** House Rules + Queens Court, Asset Logger, D&D Combat Balancer, Mobile Game Revenue Projector |
| `games.html` | **March Hare Games:** promises, Mimic Masters (featured), Scorchlet, Hero Impervious, We Built This City: Farmer Edition, studio story |
| `socials.html` | **Socials:** YouTube, Twitch, Bluesky, Mastodon, Instagram, Facebook, itch.io |
| `transparency.html` | **Transparency:** studio-wide made / given / kept, per charity, per game, month by month |
| `mimic-masters/` | The full Mimic Masters site (its own README is inside) |
| `scorchlet/`, `hero-impervious/`, `we-built-this-city/`, `asset-logger/`, `dnd-combat-balancer/` | Product sites |
| `queens-court/`, `looking-glass/` | App sites, 6 pages each: Home, Features, Pricing, Guides, FAQ, Legal |
| `data/` | **The charity ledgers:** one CSV per game + `games.js` (charities and rates); `products.js` (Gumroad links, demo videos, support email for the app sites) |
| `style.css` | All colours, fonts and layout (colours at the top under `:root`) |
| `main.js` | Fireflies, wobbly title letters, mobile menu, fade-ins |
| `assets/logos` | Studio, label and game logos |
| `assets/covers` | Game/tool cover art |
| `assets/social` | Social network icons |
| `assets/bg`, `icons`, `ui` | Backgrounds, item icons and frames from GUI Pro Kit – Fantasy RPG |

The Mastodon link uses `rel="me"`, so you can add this site to your Mastodon profile and get the green verified check.

## Put it online
1. Create a GitHub repository (name it `yourusername.github.io` for the root address).
2. **Add file → Upload files**, drag in everything from this folder (including `assets/`, `data/` and every product folder), and commit. GitHub's web uploader takes 100 files at a time, so upload in a few batches, or use GitHub Desktop to push it all at once.
3. **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.**

## Charity transparency: filling in the CSVs

Each game has its own ledger in `data/`:

| File | Charity | Share |
|---|---|---|
| `mimic-masters.csv` | Autistic Self Advocacy Network (ASAN) | 70% |
| `scorchlet.csv` | Organization for Autism Research (OAR) | 15% |
| `hero-impervious.csv` | IGDA Foundation | 15% |
| `we-built-this-city.csv` | IGDA Foundation | 15% |

Add **one row per platform per month** (open the file on github.com → pencil icon → add a line → Commit):

```
Month,Platform,Gross,PlatformCut,Donated,Charity,Receipt,Notes
2026-10,itch.io,49.90,10%,6.74,OAR,https://link-to-receipt,first month
2026-10,Google Play,62.50,15%,37.19,ASAN,,ad revenue
```

- **Month**: `2026-10` (year-month).
- **Gross**: what players paid (or the ad revenue reported) before the store's cut.
- **PlatformCut**: dollars (`4.99`) or a percent of Gross (`10%`). itch.io's default is 10%; Google Play and the App Store are usually 15% for small developers.
- **Donated**: what you actually gave from that row's money. Use `0` until you've donated, then edit the row.
- **Charity**: `ASAN`, `OAR` or `IGDA` (leave blank to use the game's charity).
- **Receipt**: optional link to proof (a receipt, a public donation page, a screenshot). Shows as a "Receipt" link.
- **Notes**: optional. Not shown in the trackers, but anyone can read the CSV file itself, so keep it public-friendly.

The site works out **Made** (Gross minus cut), **Kept** (Made minus Donated) and checks your pledge: it shows "✓ Pledge kept" or "⏳ Donation pending: $X still to give".
Where the numbers show up: each game's Giving Back section, `mimic-masters/transparency.html` and `charity.html`, and the studio `transparency.html`.
To change a charity, rate or add a game, edit `data/games.js`.

**Note:** the trackers read the CSV over the web, so they only fill in on the live site (or a local web server), not when you double-click an HTML file.

## Queens Court and Looking Glass

- **Gumroad links and demo videos:** fill in `data/products.js`. Until a `buy` link is set, every Buy button on that site shows "Coming soon". Paste a YouTube video ID into `demo` and it appears in the "See It Work" section.
- **Screenshots and hero loops:** drop files into `queens-court/media/` and `looking-glass/media/` with the exact names listed in each folder's `README.md`. Each one shows up by itself; until then the site shows a labeled placeholder.
- **Guides and legal text:** `guides.html` and `legal.html` show summaries marked "Full guide at launch" / "Full text at launch". Send the finished Setup Guide, Operating Guide, EULA, privacy policy and refund policy to replace them.

## Mimic Masters privacy-policy sync
The bot that copies the privacy policy from the Google Doc now lives at `.github/workflows/sync-privacy.yml` and works inside `mimic-masters/`. In **Settings → Actions → General → Workflow permissions**, choose **Read and write permissions**, or it can't save the update. If you edit files locally, pull before you push, because the bot commits too.

## Common edits
- **Turn on a "Coming soon" item:** replace
  `<span class="btn soon" aria-disabled="true">Coming soon</span>`
  with `<a class="btn" href="YOUR-LINK" target="_blank" rel="noopener">Buy on Gumroad</a>`
  and add a price bookmark at the top of the card: `<span class="bookmark">from<b>$X.XX</b></span>`
- **Change a card's picture:** swap the `src` of `<img class="item" …>` for any file in `assets/icons/`
  (crown, scroll_letter, scale, coins_pouch, dragon, potion_purple, key_gold, stopwatch, hourglass, heart, mushroom, lamp, book_open).
- **Change a card's glow colour:** edit `--tint` on its `<div class="art" …>`.
- **Button styles:** `btn` (green), `btn violet`, `btn gold`, `btn ghost`.
- **Contact email:** search `index.html` for `hello@example.com`.
- **Mimic Masters badges** point to the tester sign-up pages; swap in the real store links when they're live.

Fonts: IM Fell English (storybook) and Alata (the kit's recommended UI font), loaded from Google Fonts.

## Game Dev Kits (dev-kits/)

Unity plugin pages: LevelPlay, Appodeal, Google AdMob, Localization, plus a support page.

- Store links: `data/products.js` → `devkits` → each kit's `fab`, `unity`, `gumroad`. Empty = "Coming soon" button.
- Support form: `data/products.js` → `supportForm` (embedded on dev-kits/support.html, linked from the "Untested" notes on LevelPlay and AdMob).
- To remove an "Untested" note once a kit is tested, delete the `.callout` block on that kit's page and the "Untested" chip on its Shop card (index.html, #dev-kits).

## Mobile Game Revenue Simulator (revenue-simulator/)

- Buy link and demo video: `data/products.js` → `revenue-simulator`.
- Screenshots go in `revenue-simulator/media/`; see the README there for the exact file names. Empty slots show a labeled placeholder until the file exists.
