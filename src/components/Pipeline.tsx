import { Fragment, type CSSProperties } from 'react'
import type { Pipeline as PipelineData } from '../content/types'

// Flow diagram: horizontal on desktop, vertical on mobile.
// Arrows carry an animated dashed line (see .flow in index.css).
export default function Pipeline({ data }: { data: PipelineData }) {
  const { steps, branch, caption } = data
  const columns = `repeat(${steps.length - 1}, minmax(0, 1fr) 1rem) minmax(0, 1fr)`

  return (
    <figure className="mt-6">
      <ol
        className="pipeline flex flex-col items-stretch gap-1 sm:grid sm:gap-0"
        style={{ '--pipeline-cols': columns } as CSSProperties}
      >
        {steps.map((step, i) => (
          <Fragment key={step.name}>
            <li
              className="pipeline-node flex flex-col justify-center rounded-md border border-line bg-bg px-3 py-2 sm:px-1.5 sm:text-center"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="block text-sm font-medium leading-tight text-fg sm:text-[13px]">{step.name}</span>
              <span className="mt-0.5 block text-xs leading-tight text-muted sm:text-[11px]">{step.detail}</span>
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden="true" className="flex h-5 items-center justify-center sm:h-auto">
                <span className="flow flow-v sm:hidden" />
                <span className="flow flow-h hidden sm:block" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>

      {branch && (
        <div
          className="pipeline mt-3 sm:mt-0 sm:grid"
          style={{ '--pipeline-cols': columns } as CSSProperties}
        >
          <div className="flex flex-col items-stretch sm:items-center" style={{ gridColumn: `${Math.max(branch.target * 2, 1)} / span 3` }}>
            <span aria-hidden="true" className="hidden h-5 justify-center sm:flex">
              <span className="flow flow-v flow-up" />
            </span>
            <div className="rounded-md border border-dashed border-line px-3 py-2 sm:w-full sm:px-2 sm:text-center">
              <span className="block text-sm font-medium leading-tight text-fg sm:text-[13px]">{branch.name}</span>
              <span className="mt-0.5 block text-xs leading-tight text-muted sm:text-[11px]">
                {branch.detail}
                <span className="sm:hidden"> → {steps[branch.target].name}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
    </figure>
  )
}
