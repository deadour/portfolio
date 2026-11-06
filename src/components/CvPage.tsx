import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CvDocument from '../cv/CvDocument'
import '../cv/cv.css'
import { languages, type Lang } from '../content'
import { cvPath, cvProfiles, cvVariants } from '../data/cv'
import { t } from '../data/localize'
import type { CvProfile } from '../data/types'
import { useLang } from '../i18n'
import LinkIcon from './LinkIcon'

// /cv: pick a profile and a language, see the CV and download its PDF.
// The preview is the same component the PDFs are printed from (scripts/cv.mjs), scaled to fit.
// The choice lives in the URL (?profile=data&lang=en), so a specific CV can be shared.

const LANG_NAMES: Record<Lang, string> = { en: 'English', es: 'Español' }

function readQuery() {
  const params = new URLSearchParams(window.location.search)
  const profile = params.get('profile') as CvProfile | null
  const lang = params.get('lang') as Lang | null
  return {
    profile: profile && cvProfiles.includes(profile) ? profile : null,
    lang: lang && languages.includes(lang) ? lang : null,
  }
}

// A4 at 96 dpi.
const SHEET = { w: 793.7, h: 1122.5 }

function Preview({ profile, lang }: { profile: CvProfile; lang: Lang }) {
  const frame = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = frame.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / SHEET.w)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={frame} className="w-full">
      <div
        className="mx-auto overflow-hidden rounded-sm shadow-[0_1px_2px_rgb(0_0_0/0.08),0_12px_32px_-12px_rgb(0_0_0/0.25)] ring-1 ring-black/5"
        style={{ width: SHEET.w * scale, height: SHEET.h * scale }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: SHEET.w }}>
          <CvDocument profile={profile} lang={lang} embedded />
        </div>
      </div>
    </div>
  )
}

function Choice<T extends string>({
  legend,
  options,
  value,
  onChange,
  name,
}: {
  legend: string
  options: { value: T; label: string; lang?: string }[]
  value: T
  onChange: (value: T) => void
  name: string
}) {
  return (
    <fieldset>
      <legend className="text-xs font-medium tracking-wide text-muted uppercase">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            lang={option.lang}
            className="cursor-pointer rounded-md border border-line bg-surface px-3 py-2 text-sm text-fg hover:border-muted has-checked:border-fg has-checked:bg-fg has-checked:text-bg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function CvPage() {
  const { lang: siteLang, c } = useLang()
  const initial = useRef(readQuery())
  const [profile, setProfile] = useState<CvProfile>(initial.current.profile ?? 'software')
  // Until the visitor picks one, the CV follows the site's language.
  const [chosenLang, setChosenLang] = useState<Lang | null>(initial.current.lang)
  const lang = chosenLang ?? siteLang
  const pdf = cvPath(profile, lang)

  useEffect(() => {
    const params = new URLSearchParams({ profile, ...(chosenLang ? { lang: chosenLang } : {}) })
    window.history.replaceState(null, '', `${window.location.pathname}?${params}${window.location.hash}`)
  }, [profile, chosenLang])

  const fileName = `Eduardo-Ramirez-CV-${profile}-${lang}.pdf`

  return (
    <>
      <section aria-labelledby="cv-title" className="pt-10 pb-10 sm:pt-16">
        <h1 id="cv-title" className="enter text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {c.cv.title}
        </h1>
        <p className="enter mt-4 max-w-xl text-lg leading-relaxed">{c.cv.intro}</p>

        <div className="enter mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
            <Choice
              legend={c.cv.profile}
              name="cv-profile"
              value={profile}
              onChange={setProfile}
              options={cvProfiles.map((id) => ({ value: id, label: t(cvVariants[id].label, siteLang) }))}
            />
            <Choice
              legend={c.cv.language}
              name="cv-lang"
              value={lang}
              onChange={setChosenLang}
              options={languages.map((code) => ({ value: code, label: LANG_NAMES[code], lang: code }))}
            />
          </div>
        </div>

        <div className="enter mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a href={pdf} download={fileName} className="btn-primary">
            <LinkIcon name="download" />
            {c.cv.download}
          </a>
          <a href={pdf} target="_blank" rel="noreferrer" className="link text-sm">
            {c.cv.open}
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </section>

      <section id="cv-preview" aria-label={`${c.cv.title} · ${t(cvVariants[profile].label, siteLang)} · ${LANG_NAMES[lang]}`} className="pb-6">
        <Preview profile={profile} lang={lang} />
        <p className="mt-4 text-center text-sm text-muted">{c.cv.note}</p>
      </section>
    </>
  )
}
