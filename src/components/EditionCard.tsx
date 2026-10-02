import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { driveImage, type Edition } from '@/data/editions'

export function EditionCard({
  edition,
  number,
  eager = false,
}: {
  edition: Edition
  number: number
  eager?: boolean
}) {
  return (
    <Link
      to="/editions/$slug"
      params={{ slug: edition.slug }}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-paper-deep shadow-[0_1px_0_rgba(0,0,0,0.05),0_18px_30px_-18px_rgba(20,23,31,0.45)] ring-1 ring-ink/10 transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_45px_-20px_rgba(20,23,31,0.55)] dark:bg-night-card dark:ring-white/10">
        <img
          src={driveImage(edition.coverId, 600)}
          alt={`Konnect ${edition.month} ${edition.year} cover`}
          loading={eager ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
          No. {String(number).padStart(2, '0')}
        </span>
        {edition.note && (
          <span className="absolute bottom-3 left-3 rounded-full bg-chinar px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {edition.note}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-semibold leading-tight text-ink dark:text-white">
            {edition.month}
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft dark:text-white/55">
            {edition.year} ·{' '}
            <span className="font-urdu" lang="ur">{edition.monthUrdu}</span>
          </p>
        </div>
        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition group-hover:border-chinar group-hover:bg-chinar group-hover:text-white dark:border-white/15 dark:text-white">
          <ArrowUpRight size={15} />
        </span>
      </div>
      <div className="mt-2 flex gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
        {edition.englishPdfId && (
          <span className="rounded bg-lake/10 px-2 py-0.5 text-lake dark:bg-white/10 dark:text-white/70">English</span>
        )}
        {edition.urduPdfId && (
          <span className="rounded bg-saffron/15 px-2 py-0.5 text-[#8a5f0a] dark:text-saffron">اردو</span>
        )}
      </div>
    </Link>
  )
}
