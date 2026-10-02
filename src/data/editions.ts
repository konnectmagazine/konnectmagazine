// All Konnect editions live here. To publish a new issue, add an entry with the
// Google Drive file IDs for its cover image and English/Urdu PDFs.

export type Edition = {
  slug: string
  /** English month label, e.g. "September" or "January – February" */
  month: string
  /** Hijri month label used on the original archive */
  monthUrdu: string
  year: number
  coverId: string
  englishPdfId?: string
  urduPdfId?: string
  note?: string
}

export type UpcomingEdition = {
  month: string
  monthUrdu: string
  year: number
}

export const editions: Edition[] = [
 
    {
    slug: '2026-10',
    month: 'October',
    monthUrdu: 'رمضان',
    year: 2026,
    coverId: 'JbLbbB4UhHwSP-EO7-ZE76XK-wPk4prm',
    englishPdfId: '1Tlb5dsgyewl-w_elAeYSHyEoiGHO6MVL',
    note: 'Urdu edition coming soon',
  },
  {
    slug: '2026-09',
    month: 'September',
    monthUrdu: 'رمضان',
    year: 2026,
    coverId: '1JbLbbB4UhHwSP-EO7-ZE76XK-wPk4prm',
    englishPdfId: '1Tlb5dsgyewl-w_elAeYSHyEoiGHO6MVL',
    note: 'Urdu edition coming soon',
  },
  {
    slug: '2026-08',
    month: 'August',
    monthUrdu: 'شعبان',
    year: 2026,
    coverId: '1-dSbcXwtY-CDGBQ0BHxun0smLo7WiRU-',
    englishPdfId: '1_nvdhrcJ2tJfA2zmgR2JYK05YIZpsb9F',
    urduPdfId: '1xcLd6rGssZF7BiR1IdWj2nPT40e0DJ5T',
  },
  {
    slug: '2026-07',
    month: 'July',
    monthUrdu: 'رجب',
    year: 2026,
    coverId: '104oJIVp1IdvzbnHnck-hZta5NaV9rQhY',
    englishPdfId: '1exKWQx0XmtxyqjPcsO3zC_Mdd4CbzI2w',
    urduPdfId: '1VGcB44H9mw-nz8vkdz18tGs-Ogvbf5qN',
  },
  {
    slug: '2026-06',
    month: 'June',
    monthUrdu: 'جمادی الثانی',
    year: 2026,
    coverId: '1qfStWic1_0bgZoAZLBfq1w2CFZxyHcRm',
    englishPdfId: '13xDOzVnMHZJImoZJZJAaPcapdKyIr9nO',
    urduPdfId: '1wCXW2aGBkXflco0S6SoIhjn4RE2q3xQg',
  },
  {
    slug: '2026-05',
    month: 'May',
    monthUrdu: 'جمادی الاول',
    year: 2026,
    coverId: '1KhUaB0mZYpnezTEW3KE9RL8j3_BbNhaO',
    englishPdfId: '1mPx54xYo090vYE7ElEyng_r6OxnSn0hD',
    urduPdfId: '19Pzf-a9AwTXqWXrxwg9FTt2xHE9pOHzs',
  },
  {
    slug: '2026-04',
    month: 'April',
    monthUrdu: 'ربیع الثانی',
    year: 2026,
    coverId: '1rC3k5awox359JfSI1QryUeCxLMU3qt9u',
    englishPdfId: '1t5d5orv5Qs1secV9CeaeQ_fq9JRLvHEK',
    urduPdfId: '1MAqeRPICgefAZHN4n7wJuAJt4rG15LqR',
  },
  {
    slug: '2026-03',
    month: 'March',
    monthUrdu: 'ربیع الاول',
    year: 2026,
    coverId: '1alO-fu5WBwiAG09oVZC6HVTtY7UGVqaa',
    englishPdfId: '10C8-JYkxt7Gh1lCYGFowRX96l5pDhrA_',
    urduPdfId: '1b-bAqtuL9g9QT78HiuiwD9K6iBoW2JYL',
  },
  {
    // January and February were published together as one double issue.
    slug: '2026-01',
    month: 'January – February',
    monthUrdu: 'محرم – صفر',
    year: 2026,
    coverId: '1pIglQ7LgaaqbqtKrQ_BTJJKNCe2XqO_2',
    englishPdfId: '1YnWVBUxBR1Ohlo1DQU7y-S7GZUJWYbQq',
    urduPdfId: '1KpE72KchBsJMZgK7QvbO-XElhOWsHmFb',
    note: 'Double issue',
  },
]

export const upcoming: UpcomingEdition[] = [
  { month: 'October', monthUrdu: 'شوال', year: 2026 },
  { month: 'November', monthUrdu: 'ذی القعدہ', year: 2026 },
  { month: 'December', monthUrdu: 'ذی الحجہ', year: 2026 },
]

export const LOGO_ID = '1iWganp5qKf6fNdCWLh5KJFJBNq-iIa8U'
export const TWITTER_URL = 'https://twitter.com/konnect_kashmir'
export const TWITTER_HANDLE = '@konnect_kashmir'

/** Google-hosted image, resized server-side to the requested width. */
export const driveImage = (id: string, width = 800) =>
  `https://lh3.googleusercontent.com/d/${id}=w${width}`

export const drivePreview = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`

export const driveView = (id: string) =>
  `https://drive.google.com/file/d/${id}/view`

export const getEdition = (slug: string) =>
  editions.find((e) => e.slug === slug)

export const editionTitle = (e: { month: string; year: number }) =>
  `${e.month} ${e.year}`
