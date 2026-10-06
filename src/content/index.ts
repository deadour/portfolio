import { en } from './en'
import { es } from './es'
import type { Content } from './types'

export type Lang = 'en' | 'es'

export const languages: Lang[] = ['en', 'es']
export const defaultLang: Lang = 'en'

export const content: Record<Lang, Content> = { en, es }
