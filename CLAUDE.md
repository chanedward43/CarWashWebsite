# Satisfied Car Wash — Project Guide

## Business
- Name: Satisfied Car Wash
- Address: Spean Thmor, Sangkat, Chamkar Doung Street (217), 8370, Cambodia

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
