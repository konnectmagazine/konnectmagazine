import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Share2 } from 'lucide-react'
import { useState } from 'react'
import {
  TWITTER_HANDLE,
  driveImage,
  drivePreview,
  driveView,
  editionTitle,
  editions,
  getEdition,
} from '@/data/editions'

type Lang = 'en' | 'ur'

export const Route = createFileRoute('/editions/$slug')({
  validateSearch: (search: Record<string, unknown>): { lang?: Lang } =>
    search.lang === 'ur' || search.lang === 'en' ? { lang: search.lang } : {},
  loader: ({ params }) => {
    const edition = getEdition(params.slug)
    if (!edition) throw notFound()
    return { edition }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Konnect — ${editionTitle(loaderData.edition)} Edition` },
          {
            name: 'description',
            content: `Read the ${editionTitle(loaderData.edition)} edition of Konnect magazine in English and Urdu.`,
          },
          { property: 'og:image', content: driveImage(loaderData.edition.coverId, 1200) },
        ]
      : [],
  }),
  component: EditionReader,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl font-extrabold">Edition not found</h1>
      <p className="mt-3 text-ink-soft dark:text-white/60">This issue isn’t in the archive yet.</p>
      <Link to="/" hash="archive" className="mt-6 inline-block font-semibold text-chinar hover:underline">
        Back to the archive
      </Link>
    </div>
  ),
})

function EditionReader() {
  const { edition } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const [copied, setCopied] = useState(false)

  const available: Lang[] = [
    ...(edition.englishPdfId ? (['en'] as const) : []),
    ...(edition.urduPdfId ? (['ur'] as const) : []),
  ]
  const lang: Lang = search.lang && available.includes(search.lang) ? search.lang : available[0]
  const pdfId = lang === 'ur' ? edition.urduPdfId : edition.englishPdfId

  const idx = editions.findIndex((e) => e.slug === edition.slug)
  const newer = editions[idx - 1]
  const older = editions[idx + 1]

  const share = async () => {
    const url = window.location.href
    const title = `Konnect — ${editionTitle(edition)}`
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {}
      return
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-8">
      <Link
        to="/"
        hash="archive"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-chinar dark:text-white/60"
      >
        <ArrowLeft size={15} /> All editions
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex gap-5 lg:block">
            <img
              src={driveImage(edition.coverId, 600)}
              alt={`Konnect ${editionTitle(edition)} cover`}
              className="w-32 shrink-0 rounded-sm shadow-xl ring-1 ring-ink/10 sm:w-40 lg:w-full"
            />
            <div className="lg:mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-chinar">
                Konnect · {edition.year}
              </p>
              <h1 className="font-display mt-1 text-3xl font-extrabold leading-tight sm:text-4xl">
                {edition.month}
              </h1>
              <p className="font-urdu mt-1 text-lg text-ink-soft dark:text-white/55" lang="ur">
                {edition.monthUrdu}
              </p>
              {edition.note && (
                <p className="mt-2 inline-block rounded-full bg-chinar/10 px-3 py-1 text-xs font-semibold text-chinar">
                  {edition.note}
                </p>
              )}
              <p className="mt-4 text-sm text-ink-soft dark:text-white/50">{TWITTER_HANDLE}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-2 lg:flex-col">
            {pdfId && (
              <a
                href={driveView(pdfId)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold transition hover:border-chinar hover:text-chinar dark:border-white/15"
              >
                <ExternalLink size={15} /> Open full screen
              </a>
            )}
            <button
              onClick={share}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold transition hover:border-chinar hover:text-chinar dark:border-white/15"
            >
              <Share2 size={15} /> {copied ? 'Link copied!' : 'Share issue'}
            </button>
          </div>
        </aside>

        {/* Reader */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Reading language"
              className="inline-flex rounded-full border border-ink/15 bg-white/60 p-1 dark:border-white/15 dark:bg-white/5"
            >
              {(['en', 'ur'] as const).map((l) => {
                const enabled = available.includes(l)
                const active = l === lang
                return (
                  <button
                    key={l}
                    role="tab"
                    aria-selected={active}
                    disabled={!enabled}
                    onClick={() => navigate({ search: { lang: l }, replace: true })}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                      active
                        ? 'bg-ink text-paper dark:bg-white dark:text-night'
                        : 'text-ink-soft hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 dark:text-white/60'
                    } ${l === 'ur' ? 'font-urdu leading-none' : ''}`}
                    title={enabled ? undefined : 'Not yet available'}
                  >
                    {l === 'en' ? 'Read in English' : 'اردو میں پڑھیں'}
                  </button>
                )
              })}
            </div>
            {available.length < 2 && (
              <p className="text-xs text-ink-soft dark:text-white/50">
                {lang === 'en' ? 'Urdu' : 'English'} edition coming soon
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-xl dark:border-white/10 dark:bg-night-card">
            {pdfId ? (
              <iframe
                key={pdfId}
                src={drivePreview(pdfId)}
                title={`Konnect ${editionTitle(edition)} — ${lang === 'ur' ? 'Urdu' : 'English'}`}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="h-[78vh] min-h-[520px] w-full"
              />
            ) : (
              <div className="flex h-[50vh] items-center justify-center text-ink-soft">
                This edition will be available soon.
              </div>
            )}
          </div>

          <nav className="mt-8 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link
                to="/editions/$slug"
                params={{ slug: older.slug }}
                className="group flex items-center gap-3 rounded-lg border border-ink/10 p-4 transition hover:border-chinar dark:border-white/10"
              >
                <ChevronLeft className="text-ink-soft group-hover:text-chinar" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-soft dark:text-white/50">Previous issue</p>
                  <p className="font-display text-lg font-semibold">{editionTitle(older)}</p>
                </div>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                to="/editions/$slug"
                params={{ slug: newer.slug }}
                className="group flex items-center justify-end gap-3 rounded-lg border border-ink/10 p-4 text-right transition hover:border-chinar dark:border-white/10"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-soft dark:text-white/50">Next issue</p>
                  <p className="font-display text-lg font-semibold">{editionTitle(newer)}</p>
                </div>
                <ChevronRight className="text-ink-soft group-hover:text-chinar" />
              </Link>
            )}
          </nav>
        </section>
      </div>
    </div>
  )
}
