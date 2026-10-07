import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLang } from '../i18n'

// In-page image viewer. Galleries call `useLightbox()(images, index)` to open it.
// Built on the native <dialog>: focus handling and Esc to close come for free.

export type LightboxImage = { src: string; alt: string; caption?: string }

const LightboxContext = createContext<(images: LightboxImage[], index: number) => void>(() => {})

export const useLightbox = () => useContext(LightboxContext)

// Gallery figures → viewer images, using the large version when there is one.
export const toLightbox = (figures: { src: string; href?: string; alt: string; caption?: string }[] = []) =>
  figures.map((f) => ({ src: f.href ?? f.src, alt: f.alt, caption: f.caption }))

export function LightboxProvider({ children }: { children: ReactNode }) {
  const { c } = useLang()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [images, setImages] = useState<LightboxImage[]>([])
  const [index, setIndex] = useState(0)
  const touchStart = useRef<number | null>(null)

  const open = useCallback((list: LightboxImage[], i: number) => {
    setImages(list)
    setIndex(i)
    dialogRef.current?.showModal()
    document.documentElement.style.overflow = 'hidden' // no page scroll behind the viewer
  }, [])

  const close = () => dialogRef.current?.close()
  const step = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => (document.documentElement.style.overflow = '')
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [])

  const image = images[index]
  const many = images.length > 1

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={image?.alt}
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => {
          if (!many) return
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (!many || touchStart.current === null) return
          const dx = e.changedTouches[0].clientX - touchStart.current
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
          touchStart.current = null
        }}
      >
        {image && (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && close()}>
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="lightbox-image max-h-[82dvh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <p className="max-w-2xl text-center text-sm text-white/75">
              {image.caption ?? image.alt}
              {many && (
                <span className="ml-2 text-white/50">
                  {index + 1} / {images.length}
                </span>
              )}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={close}
          aria-label={c.ui.lightbox.close}
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:top-5 sm:right-5"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {many && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={c.ui.lightbox.previous}
              className="absolute top-1/2 left-2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-5 sm:grid"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={c.ui.lightbox.next}
              className="absolute top-1/2 right-2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-5 sm:grid"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </dialog>
    </LightboxContext.Provider>
  )
}
