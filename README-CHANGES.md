# DOLLAR STORE — update notes

## Deploy
Upload the contents of this folder to the root of the site served at `/Dollar-Store-/` (GitHub Pages).
`index.html` loads `ds-extras.css` and `ds-extras.js`; nothing else needs a build step.

## Configure (optional) — add before the overlay script in index.html
```html
<script>window.DS_CONFIG={youtubeId:'YOUR_VIDEO_ID', creatorEndpoint:'https://…'}</script>
```
Without `youtubeId`/`videoSrc` the picture-in-picture shows an animated 4-step explainer.

## Working in this build (tested in headless Chromium)
5 hero (3D coin, payment chips, 1% cashback copy, EN/AR) · 6 PiP + full-screen player · 7 The Creator ·
8 Asma Al-Husna ticker · 10 Discord link + email removed · 11 Discord/WhatsApp icons ·
1 camera-only verification on /sell (captures feed the form's own `documents` input; file picker locked).

## Needs backend / source work
2 admin role, 4 data reset, 5 real wallet credit, 9 VIP sort, 12 product gallery uploads → see BACKEND-SETUP.sql and notes.
The Supabase client in this build is disabled (`null`); connect it to see any live data.
