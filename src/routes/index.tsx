import { Link, createFileRoute } from '@tanstack/react-router'
import { BookOpen, Feather, Languages, MapPin } from 'lucide-react'
import { EditionCard } from '@/components/EditionCard'
import { ContributeForm } from '@/components/ContributeForm'
import {
  LOGO_ID,
  driveImage,
  editions,
  upcoming,
} from '@/data/editions'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const latest = editions[0]

  return (
    <>
      {/* Hero — latest edition */}
      <section id="latest" className="grain relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-chinar/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-lake/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 md:grid-cols-[1.15fr_0.85fr] md:pt-20">
          <div>
            <img
              src={driveImage(LOGO_ID, 700)}
              alt="Konnect magazine"
              className="rise mb-8 h-16 w-auto object-contain sm:h-20 dark:brightness-110"
            />
            <p className="rise rise-1 text-xs font-semibold uppercase tracking-[0.3em] text-chinar">
              Monthly · Bilingual · Since 2026
            </p>
            <h1 className="rise rise-1 font-display mt-4 text-5xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl dark:text-white">
              Connecting North Kashmir,{' '}
              <em className="font-normal text-chinar">one story</em> at a time.
            </h1>
            <p className="rise rise-2 font-urdu mt-5 text-2xl text-ink-soft dark:text-white/60" dir="rtl" lang="ur">
              کونیکٹ — شمالی کشمیر کو جوڑنا، ایک وقت میں ایک کہانی
            </p>
            <p className="rise rise-2 mt-6 max-w-xl text-lg leading-relaxed text-ink-soft dark:text-white/65">
              Konnect is the region’s own magazine — voices, culture, people and news from
              North Kashmir and the world beyond, published every month in English and Urdu.
            </p>
            <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
              <Link
                to="/editions/$slug"
                params={{ slug: latest.slug }}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-chinar dark:bg-white dark:text-night dark:hover:bg-saffron"
              >
                <BookOpen size={16} /> Read the {latest.month} Magazine 
              </Link>
              <a
                href="#archive"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-chinar hover:text-chinar dark:border-white/20 dark:text-white"
              >
                Browse all editions
              </a>
            </div>
          </div>

          <Link
            to="/editions/$slug"
            params={{ slug: latest.slug }}
            className="rise rise-2 group relative mx-auto block w-full max-w-sm"
          >
            <div className="absolute inset-0 translate-x-5 translate-y-5 rotate-3 rounded-sm bg-saffron/80" />
            <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rotate-[1.5deg] rounded-sm bg-chinar/80" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-paper-deep shadow-2xl ring-1 ring-ink/10 transition duration-500 group-hover:-rotate-1">
              <img
                src={driveImage(latest.coverId, 900)}
                alt={`Konnect ${latest.month} ${latest.year} cover`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -left-4 top-6 rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-widest text-paper shadow-lg dark:bg-white dark:text-night">
              New · {latest.month} {latest.year}
            </div>
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-ink/10 bg-ink text-paper dark:border-white/10 dark:bg-night-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            [String(editions.length), 'Editions published'],
            ['2', 'Languages — English & Urdu'],
            ['12', 'Issues every year'],
            ['Free', 'To read, always'],
          ].map(([n, label]) => (
            <div key={label} className="px-5 py-7">
              <p className="font-display text-4xl font-extrabold text-saffron">{n}</p>
              <p className="mt-1 text-sm text-paper/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Archive */}
      <section id="archive" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-6 dark:border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-chinar">The Magazine</p>
            <h2 className="font-display mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              2026 Editions
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft dark:text-white/60">
            Tap any cover to open the reader. Every Magazine is available in English, and most in Urdu too.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {editions.map((edition, i) => (
            <EditionCard
              key={edition.slug}
              edition={edition}
              number={editions.length - i}
              eager={i < 4}
            />
          ))}
        </div>

        {upcoming.length > 0 && (
          <div className="mt-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft dark:text-white/50">
              Coming soon
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {upcoming.map((u) => (
                <div
                  key={u.month}
                  className="flex items-center justify-between rounded-md border border-dashed border-ink/20 px-5 py-4 dark:border-white/15"
                >
                  <span className="font-display text-lg font-semibold">
                    {u.month} {u.year}
                  </span>
                  <span className="font-urdu text-sm text-ink-soft dark:text-white/50" lang="ur">
                    {u.monthUrdu}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-paper-deep/70 dark:bg-night-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-chinar">About Konnect</p>
            <h2 className="font-display mt-2 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              A magazine made in the valley, for the valley — and the world.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                icon: MapPin,
                title: 'Rooted in North Kashmir',
                body: 'From Baramulla to Kupwara and Bandipora — the people, places and events shaping our towns.',
              },
              {
                icon: Languages,
                title: 'English & Urdu',
                body: 'Every edition is published in two languages so every reader can read Konnect in their own voice.',
              },
              {
                icon: BookOpen,
                title: 'A complete archive',
                body: 'Every issue stays online. Read any month, any time, right in your browser — free.',
              },
              {
                icon: Feather,
                title: 'Open to contributors',
                body: 'Writers, poets, students and photographers from the region are welcome to share their work.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-chinar text-white">
                  <Icon size={18} />
                </span>
                <h3 className="font-display mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute */}
      <section id="contribute" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-chinar">Contribute</p>
          <h2 className="font-display mt-2 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Have a story from your town?
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft dark:text-white/65">
            Send us a pitch, an article, a poem or a photo essay. Advertisers and readers with
            feedback are welcome too — the editorial desk reads every message.
          </p>
          <p className="font-urdu mt-4 text-xl text-ink-soft dark:text-white/55" dir="rtl" lang="ur">
            اپنی کہانی ہمارے ساتھ شیئر کریں
          </p>
        </div>
        <ContributeForm />
      </section>
    </>
  )
}
