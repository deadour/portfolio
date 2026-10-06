import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-2 border-t border-line py-8 text-sm text-muted">
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      <p className="font-mono">{site.domain}</p>
    </footer>
  )
}
