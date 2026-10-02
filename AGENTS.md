# AGENTS.md

## Project

Konnect Magazine: the website and archive of a monthly English/Urdu magazine from North Kashmir. It is a TanStack Start (React 19) app with Tailwind CSS 4, deployed on Netlify.

## Structure

```
src/
  data/editions.ts         # The only content source: editions, upcoming months, Drive URL helpers
  components/
    SiteHeader.tsx         # Sticky header with nav and theme toggle
    SiteFooter.tsx
    ThemeToggle.tsx        # Toggles the `dark` class on <html> and saves it to localStorage ('konnect-theme')
    EditionCard.tsx        # Cover card in the archive grid
    ContributeForm.tsx     # Netlify Forms submission (AJAX)
  routes/
    __root.tsx             # HTML shell, fonts, SEO meta, theme script that runs before paint
    index.tsx              # Home: latest hero, stats, archive, about, contribute
    editions/$slug.tsx     # Reader with an embedded Drive PDF and a ?lang=en|ur switch
  styles.css               # Tailwind theme tokens (paper/ink/chinar/saffron/lake colors, fonts)
public/contribute-form.html  # Hidden static form so Netlify detects the "contribute" form at build time
```

## Conventions and decisions

- **Content is hard-coded on purpose.** The magazine publishes once a month, so a typed data file is simpler than a CMS or database. Editions are listed newest first. The `slug` is `YYYY-MM`.
- The Jan and Feb 2026 entries on the original site pointed to the same PDFs, so they appear here as a single double issue (`2026-01`).
- Images and PDFs come from Google Drive. Images use `lh3.googleusercontent.com/d/<id>=w<width>` (Google resizes them). PDFs are embedded with `drive.google.com/file/d/<id>/preview`.
- **Forms:** `ContributeForm` POSTs URL-encoded data to `/contribute-form.html` instead of `/`, because posting to `/` gets intercepted by SSR. Any field you add must also be added to `public/contribute-form.html`.
- **Dark mode** uses the Tailwind `dark:` variant, set up with `@custom-variant dark` on the `.dark` class.
- Urdu text uses the `font-urdu` class (Noto Nastaliq Urdu) and `lang="ur"`, plus `dir="rtl"` for longer passages.
- Use the `@/` import alias for `src/`.
