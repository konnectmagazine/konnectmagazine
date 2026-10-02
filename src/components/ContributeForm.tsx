import { useState } from 'react'
import { Check, Send } from 'lucide-react'

const initial = { name: '', email: '', location: '', kind: 'Story pitch', message: '' }

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

const field =
  'w-full rounded-md border border-ink/15 bg-white/70 px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-chinar focus:ring-2 focus:ring-chinar/20 dark:border-white/15 dark:bg-white/5 dark:text-white'

export function ContributeForm() {
  const [fields, setFields] = useState(initial)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setFields({ ...fields, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const botField = (e.currentTarget.elements.namedItem('bot-field') as HTMLInputElement)?.value ?? ''
    setStatus('sending')
    try {
      const res = await fetch('/contribute-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contribute', 'bot-field': botField, ...fields }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setFields(initial)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-lg border border-ink/10 bg-white/60 p-8 text-center dark:border-white/10 dark:bg-white/5">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chinar text-white">
          <Check />
        </span>
        <h3 className="font-display mt-4 text-2xl font-semibold">Shukriya — thank you!</h3>
        <p className="mt-2 text-sm text-ink-soft dark:text-white/60">
          Your message reached the Konnect editorial desk. We read every submission.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 text-sm font-semibold text-chinar underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form
      name="contribute"
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-ink/10 bg-white/60 p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
    >
      <input type="hidden" name="form-name" value="contribute" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input name="name" required value={fields.name} onChange={onChange} className={`${field} mt-1.5`} placeholder="Your full name" />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input type="email" name="email" required value={fields.email} onChange={onChange} className={`${field} mt-1.5`} placeholder="you@example.com" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Town / district
          <input name="location" value={fields.location} onChange={onChange} className={`${field} mt-1.5`} placeholder="Baramulla, Kupwara, Bandipora…" />
        </label>
        <label className="block text-sm font-medium">
          I’d like to send
          <select name="kind" value={fields.kind} onChange={onChange} className={`${field} mt-1.5`}>
            <option>Story pitch</option>
            <option>Article / poem</option>
            <option>Photo essay</option>
            <option>Advertising enquiry</option>
            <option>Feedback</option>
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium">
        Message
        <textarea
          name="message"
          required
          rows={5}
          value={fields.message}
          onChange={onChange}
          className={`${field} mt-1.5 resize-y`}
          placeholder="Tell us about the story — in English or Urdu."
        />
      </label>
      {status === 'error' && (
        <p className="text-sm text-chinar">Something went wrong. Please try again in a moment.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 rounded-full bg-chinar px-6 py-3 text-sm font-semibold text-white transition hover:bg-chinar-deep disabled:opacity-60"
      >
        <Send size={15} />
        {status === 'sending' ? 'Sending…' : 'Send to the editors'}
      </button>
    </form>
  )
}
