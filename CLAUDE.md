# Car Wash & Car Care Center — Project Guide

## Business
- Name: Car Wash & Car Care Center (the project folder/repo is still named
  "CarWashWebsite" — that's just the repo name, not the business name; earlier
  work in this project used the placeholder name "Satisfied Car Wash" before
  the real name was confirmed — if you see that name anywhere, it's stale)
- Motto: Penh Chet (ពេញចិត្ត) — "satisfied." The shop's real hand-painted sign
  reads "លាងឡាន ពេញចិត្ត" (car wash + the motto together).
- Phone: 096 71 93 151 (primary) / 097 54 74 017 (secondary) — both are real.
  International/dialable form: +855 96 71 93 151 and +855 97 54 74 017.
  Phone is the only contact channel on the site — no Telegram, WhatsApp, or
  Facebook (removed by request; display the local format, link `tel:` in
  intl format).
- Address: Spean Thmor, Sangkat, Chamkar Doung Street (217), 8370, Cambodia
- Google Maps Plus Code: FV8Q+MGX, Phnom Penh, Cambodia (verified live on Google Maps —
  use this for map embeds/links instead of the street address, which is less precise
  for Cambodian addressing)
- Real services (no confirmed pricing — don't invent prices):
  1. លាងរថយន្ត — Car Wash
  2. បោកពូក — Seat & Cushion Cleaning (upholstery shampoo)
  3. លាងម៉ាស៊ីន — Engine Wash (engine bay cleaning)
  4. ប៉ូលារថយន្ត — Car Polishing
  5. ប្តូរប្រេងម៉ាស៊ីន — Engine Oil Change

## Stack
Plain HTML/CSS/JS. No build step, no framework, no package manager.
Chosen deliberately over React — this is a small marketing site (5 pages),
and the owner is still iterating on wireframes/design direction, so a
zero-build setup keeps iteration fast and deployment trivial (any static host).
Revisit only if the site grows real interactivity (e.g. an online booking
widget with client-side state).

## Structure
```
index.html         Home
services.html       Services & Pricing
location.html       Location & Hours
about.html          About
contact.html        Contact
css/styles.css      Single shared stylesheet
js/main.js          Shared JS (currently: mobile nav toggle)
assets/images/      Image assets
```

Each page repeats the same `<header class="site-header">` / `<footer class="site-footer">`
markup rather than using includes — there's no build step to assemble partials, so this is
the plain-HTML tradeoff. If a templating/build step is introduced later, dedupe this.

## Current status
Scaffold phase. All pages except the homepage are intentionally bare
placeholders (`.placeholder-note` blocks) — real content, layout, and
imagery are on hold until wireframes are approved. Don't flesh out page
content speculatively; wait for approved wireframes per page.

## Design Concepts (`design-concepts/`)
Five full, separately-built single-page design explorations (v1–v5), each
its own self-contained HTML/CSS/JS — not the same thing as the scaffold
pages above, and not gated by "wait for wireframes" since these ARE the
wireframe/design-direction exploration. Switch between them via the shared
tab bar (`design-concepts/switcher.css`) at the top of every concept page.
Serve via the `static-site` launch config and open `design-concepts/`.

- v1 Modern Sabai — warm minimal, terracotta + slate
- v2 Auto Atelier — bold automotive editorial, cobalt + near-black
- v3 Riverside Trust — dark corporate confidence, navy + gold
- v4 Krama & Concrete — Cambodian-textile-pattern industrial, olive + brick
- v5 Clearwater Minimal — quiet restraint, white + sky-blue accent

Each uses the same real content (business info above, the 16 real photos in
`assets/images/`) so they're a fair side-by-side comparison — only the
visual direction differs. No booking form, no WhatsApp, no Facebook, no
Telegram by design — contact is phone only (see Business section above).

## Conventions
- **Mobile-first CSS.** Write unprefixed rules for small screens; layer
  larger-screen changes behind `min-width` media queries. Don't write
  `max-width` queries as the primary layout mechanism.
- Design tokens (colors, spacing, radius) live as CSS custom properties in
  `:root` at the top of `css/styles.css` — reuse them, don't hardcode values.
- Touch targets (nav links, buttons) should stay at/above 44px min-height.
- Keep the site framework-free unless the user explicitly decides to add one.

## Subagents
Custom subagents live in `.claude/agents/`:
- `site-researcher` — read-only research on car wash site design patterns
- `frontend-builder` — implements pages/components from approved wireframes
- `code-reviewer` — reviews responsiveness, accessibility, links, consistency
- `deploy-helper` — hosting/deployment (Vercel/Netlify, env, DNS) once approved
