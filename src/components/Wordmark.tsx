import { useEffect, useState } from 'react'

export default function Wordmark({ value }: { value: string }) {
  const [typed, setTyped] = useState(value)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) {
      setTyped(value)
      return
    }

    let index = 0
    setTyped('')
    const timer = window.setInterval(() => {
      index += 1
      setTyped(value.slice(0, index))
      if (index >= value.length) window.clearInterval(timer)
    }, 65)

    return () => window.clearInterval(timer)
  }, [value])

  return (
    <span className="wordmark" aria-hidden="true">
      <span className="wordmark-reserve">{value}</span>
      <span className="wordmark-typed">{typed}</span>
    </span>
  )
}

