import { Link } from '@tanstack/react-router'
import { ThemeToggle } from './ThemeToggle'
import { TWITTER_HANDLE, TWITTER_URL } from '@/data/editions'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md dark:border-white/10 dark:bg-night/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white">
            KONNECT
          </span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-chinar sm:inline-block" />
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-ink-soft sm:inline dark:text-white/50">
            North Kashmir
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <a href="/#archive" className="rounded-full px-3 py-1.5 text-ink-soft transition hover:text-chinar dark:text-white/70">
            Archive
          </a>
          <a href="/#about" className="hidden rounded-full px-3 py-1.5 text-ink-soft transition hover:text-chinar sm:inline dark:text-white/70">
            About
          </a>
          <a href="/#contribute" className="hidden rounded-full px-3 py-1.5 text-ink-soft transition hover:text-chinar sm:inline dark:text-white/70">
            Contribute
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-paper transition hover:bg-chinar md:inline dark:bg-white dark:text-night dark:hover:bg-saffron"
          >
            {TWITTER_HANDLE}
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
