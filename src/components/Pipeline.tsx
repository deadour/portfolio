import { Fragment, type CSSProperties } from 'react'
import type { Pipeline as PipelineData } from '../data/types'
import { t } from '../data/localize'
import { useLang } from '../i18n'

function StepIcon({ name }: { name: string }) {
  const label = name.toLowerCase()
  const path = /worker|nightly|celery/.test(label) ? 'M12 3a9 9 0 1 0 9 9M12 6v6l4 2M16 3h5v5'
    : /erp|warehouse|bronze|silver|gold|sql/.test(label) ? 'M4 6c0-4 16-4 16 0s-16 4-16 0m0 0v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0'
    : /react|dashboard|pwa/.test(label) ? 'M3 4h18v13H3zM8 21h8M12 17v4'
    : /evalu/.test(label) ? 'M5 12l4 4L19 6M4 21h16'
    : /enrich|enriq|search/.test(label) ? 'M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0'
    : /recommend|recom/.test(label) ? 'M12 3v6M5 21v-6h14v6M12 9v6M9 3h6'
    : 'M8 5l-6 7 6 7M16 5l6 7-6 7'
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="mr-1 inline-block size-3.5 shrink-0 align-[-2px] text-muted opacity-70"><path d={path} /></svg>
}

// Flow diagram. Desktop: boxes and arrows revealed left to right once, on first view (see .flow in index.css).
// The same diagram on every screen; narrow viewports scroll within the figure.
export default function Pipeline({ data }: { data: PipelineData }) {
  const { lang } = useLang()
  const steps = data.steps.map((step) => ({ name: t(step.name, lang), detail: t(step.detail, lang) }))
  const branches = [...(data.branch ? [data.branch] : []), ...(data.branches ?? [])].map(b => ({ name: t(b.name, lang), detail: t(b.detail, lang), target: b.target }))
  const caption = t(data.caption, lang)
  const columns = `repeat(${steps.length - 1}, minmax(max-content, 1fr) 1rem) minmax(max-content, 1fr)`

  return (
    <figure className="mt-5">
      <p className="mb-2 text-xs text-muted sm:hidden">{lang === 'es' ? 'Deslizá para recorrer el flujo →' : 'Swipe to explore the workflow →'}</p>
      <div className="workflow-scroll overflow-x-auto overscroll-x-contain pb-2" tabIndex={0} role="region" aria-label={caption}>
        <div className="grid" style={{ width: 'max-content', minWidth: '100%', gridTemplateColumns: columns }}>
        <ol className="grid col-span-full" style={{ gridTemplateColumns: 'subgrid' }}>
          {steps.map((step, i) => (
            <Fragment key={step.name}>
              <li
                className="pipeline-node flex flex-col items-center justify-center rounded-md border border-line bg-bg px-3 py-2 text-center"
                style={{ '--i': i } as CSSProperties}
              >
                <span className="block whitespace-nowrap text-[13px] leading-tight font-medium text-fg"><StepIcon name={step.name} /> {step.name}</span>
                <span className="mt-1 block max-w-40 text-xs leading-relaxed text-muted [overflow-wrap:normal] [word-break:normal]">{step.detail}</span>
              </li>
              {i < steps.length - 1 && (
                <li aria-hidden="true" className="flex items-center" style={{ '--i': i } as CSSProperties}>
                  <span className="flow flow-h" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>

        {[...new Set(branches.map(branch => branch.target))].map(target => (
            <div
              key={target}
              className="hidden flex-col items-center sm:flex"
              style={{ gridColumn: target * 2 + 1, gridRow: 2, '--i': target } as CSSProperties}
            >
              <span aria-hidden="true" className="flex h-5 justify-center">
                <span className="flow flow-v flow-up" />
              </span>
              <div className="min-w-0 w-full max-w-48 space-y-3 [overflow-wrap:normal] [word-break:normal] rounded-md border border-dashed border-line px-2 py-2 text-center">
                {branches.filter(branch => branch.target === target).map(branch => <div key={branch.name}>
                <span className="block text-[13px] leading-tight font-medium text-fg"><StepIcon name={branch.name} />{branch.name}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">{branch.detail}</span>
                </div>)}
              </div>
            </div>
        ))}
      </div>
      </div>

      {branches.length > 0 && (
        <details className="mt-2 rounded-md border border-line px-3 py-2 text-xs sm:hidden">
          <summary className="flex min-h-7 cursor-pointer items-center gap-2 font-medium text-fg">
            <span aria-hidden="true">＋</span>{lang === 'es' ? 'Entradas e integraciones' : 'Inputs and integrations'} ({branches.length})
          </summary>
          <ul className="mt-2 space-y-3 pb-1">
            {branches.map((branch) => (
              <li key={branch.name}>
                <p className="font-medium text-fg"><StepIcon name={branch.name} />{branch.name} → {steps[branch.target].name}</p>
                <p className="mt-1 leading-relaxed text-muted">{branch.detail}</p>
              </li>
            ))}
          </ul>
        </details>
      )}

      <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
    </figure>
  )
}
