# Mad Tea Party Development · March Hare Games

A dark Wonderland-forest site for GitHub Pages. Whimsy, magic & mania.

| File | What it is |
|---|---|
| `index.html` | **Software Shop:** House Rules + Queens Court, Asset Logger, D&D Combat Balancer, Mobile Game Revenue Projector |
| `games.html` | **March Hare Games:** promises, Mimic Masters (featured), Scorchlet, Hero Impervious, We Built This City: Farmer Edition, studio story |
| `socials.html` | **Socials:** YouTube, Twitch, Bluesky, Mastodon, Instagram, Facebook, itch.io |
| `style.css` | All colours, fonts and layout (colours at the top under `:root`) |
| `main.js` | Fireflies, wobbly title letters, mobile menu, fade-ins |
| `assets/logos` | Studio, label and game logos |
| `assets/covers` | Game/tool cover art |
| `assets/social` | Social network icons |
| `assets/bg`, `icons`, `ui` | Backgrounds, item icons and frames from GUI Pro Kit – Fantasy RPG |

The Mastodon link uses `rel="me"`, so you can add this site to your Mastodon profile and get the green verified check.

## Put it online
1. Create a GitHub repository (name it `yourusername.github.io` for the root address).
2. **Add file → Upload files**, drag in everything from this folder (including `assets/`), and commit.
3. **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.**

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
