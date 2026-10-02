# Konnect Magazine

The website for **Konnect** (@konnect_kashmir), a monthly bilingual magazine that connects North Kashmir "one story at a time". It's an archive where readers can browse every edition and read it in English or Urdu.

## Features

- **Home page**: hero section for the latest edition, the full 2026 archive as a grid of covers, an "About" section, and upcoming editions.
- **Edition reader** (`/editions/<slug>`): reads the PDF inside the page, switches between English and Urdu (`?lang=ur` gives a link that can be shared), has links to the previous and next issues, and buttons to open the PDF full screen and share it.
- **Contribute form**: readers send story pitches, articles, photo essays, ad enquiries, or feedback. Submissions are collected by Netlify Forms.
- Daylight and dark themes, plus Urdu typography in Nastaliq.

## Tech

- TanStack Start (React 19, file-based routing) and Vite
- Tailwind CSS 4
- Netlify Forms for contributor submissions
- Covers and PDFs are hosted on Google Drive and listed in `src/data/editions.ts`

## Run locally

```bash
pnpm install
netlify dev    # or: pnpm dev
```

## Publishing a new edition

1. Upload the cover image and the English and Urdu PDFs to Google Drive and share them as "Anyone with the link".
2. Add an entry to the top of `editions` in `src/data/editions.ts`, using the Drive file IDs (the long string in `drive.google.com/file/d/<ID>/view`).
3. Remove that month from `upcoming`.
