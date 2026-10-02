import { TWITTER_HANDLE, TWITTER_URL } from '@/data/editions'

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper/80 dark:bg-black">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-extrabold text-paper">KONNECT</p>
          <p className="mt-2 text-sm">Connecting North Kashmir, one story at a time.</p>
          <p className="font-urdu mt-1 text-sm" dir="rtl" lang="ur">
            شمالی کشمیر کو جوڑنا، ایک وقت میں ایک کہانی
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Explore</p>
          <ul className="space-y-2">
            <li><a href="/#latest" className="hover:text-paper">Latest edition</a></li>
            <li><a href="/#archive" className="hover:text-paper">Archive</a></li>
            <li><a href="/#contribute" className="hover:text-paper">Share your story</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Follow</p>
          <a href={TWITTER_URL} target="_blank" rel="noreferrer" className="hover:text-paper">
            {TWITTER_HANDLE} on X / Twitter
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} Konnect Kashmir Archive
      </div>
    </footer>
  )
}
