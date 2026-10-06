import { site } from '../data/site'

const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <a href="#top" className="font-mono text-sm text-zinc-400 hover:text-zinc-100">
        {site.domain}
      </a>
      <nav aria-label="Main">
        <ul className="flex gap-5 text-sm text-zinc-400 sm:gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-zinc-100">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
