import { Fragment, type CSSProperties } from 'react'
import type { Pipeline as PipelineData } from '../content/types'

// Flow diagram. Desktop: boxes and arrows revealed left to right once, on first view (see .flow in index.css).
// Mobile: a compact line of chips that wraps, so it doesn't eat the screen.
export default function Pipeline({ data }: { data: PipelineData }) {
  const { steps, branch, caption } = data
  const columns = `repeat(${steps.length - 1}, minmax(0, 1fr) 1rem) minmax(0, 1fr)`

  return (
    <figure className="mt-5">
      {/* Mobile */}
      <div className="sm:hidden">
        <p className="flex flex-wrap items-center gap-x-1 gap-y-1.5 text-xs">
          {steps.map((step, i) => (
            <Fragment key={step.name}>
              <span className="rounded border border-line bg-bg px-1.5 py-0.5 font-medium text-fg">
                {step.name}
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              )}
            </Fragment>
          ))}
        </p>
        {branch && (
          <p className="mt-2 text-xs text-muted">
            + {branch.name} ({branch.detail}) → {steps[branch.target].name}
          </p>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <ol className="pipeline grid" style={{ '--pipeline-cols': columns } as CSSProperties}>
          {steps.map((step, i) => (
            <Fragment key={step.name}>
              <li
                className="pipeline-node flex flex-col justify-center rounded-md border border-line bg-bg px-1.5 py-2 text-center"
                style={{ '--i': i } as CSSProperties}
              >
                <span className="block text-[13px] leading-tight font-medium text-fg">{step.name}</span>
                <span className="mt-0.5 block text-[11px] leading-tight text-muted">{step.detail}</span>
              </li>
              {i < steps.length - 1 && (
                <li aria-hidden="true" className="flex items-center" style={{ '--i': i } as CSSProperties}>
                  <span className="flow flow-h" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>

        {branch && (
          <div className="pipeline grid" style={{ '--pipeline-cols': columns } as CSSProperties}>
            <div
              className="flex flex-col items-center"
              style={{ gridColumn: `${Math.max(branch.target * 2, 1)} / span 3`, '--i': branch.target } as CSSProperties}
            >
              <span aria-hidden="true" className="flex h-5 justify-center">
                <span className="flow flow-v flow-up" />
              </span>
              <div className="w-full rounded-md border border-dashed border-line px-2 py-2 text-center">
                <span className="block text-[13px] leading-tight font-medium text-fg">{branch.name}</span>
                <span className="mt-0.5 block text-[11px] leading-tight text-muted">{branch.detail}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
    </figure>
  )
}
