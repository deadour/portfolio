import type { Lang } from '../content'
import type { Text, YearMonth } from './types'

// Picks the text for a language. Plain strings read the same in both.
export function t(value: Text, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang]
}

const MONTHS: Record<Lang, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
}
const PRESENT: Record<Lang, string> = { en: 'Present', es: 'Actualidad' }

export function formatMonth(date: YearMonth, lang: Lang) {
  const [year, month] = date.split('-').map(Number)
  return `${MONTHS[lang][month - 1]} ${year}`
}

// "Nov 2023 – Present" / "Nov 2023 – Actualidad".
export function formatPeriod(start: YearMonth, end: YearMonth | undefined, lang: Lang) {
  return `${formatMonth(start, lang)} – ${end ? formatMonth(end, lang) : PRESENT[lang]}`
}

// Bare host and path of a URL, for printed links: "github.com/deadour".
export function displayUrl(href: string) {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}
