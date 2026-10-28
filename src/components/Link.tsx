import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useLang } from '../i18n'

// Internal link: plain clicks change the route without a reload; Ctrl/Cmd/middle-click still open a new tab.
export default function Link({
  href,
  keepScroll = false,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; keepScroll?: boolean }) {
  const { go } = useLang()
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(href, !keepScroll)
  }
  return <a href={href} onClick={handle} {...props} />
}
