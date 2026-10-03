import { useState } from 'react'
import Button from './Button'

const navLinks = [
  { label: 'About', href: '#about', hasDropdown: false },
  { label: 'Industries', href: '#industries', hasDropdown: true },
  { label: 'Products', href: '#products', hasDropdown: false },
  { label: 'Projects', href: '#projects', hasDropdown: false },
  { label: 'Insights', href: '#insights', hasDropdown: false },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav aria-label="Main" className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-9 xl:px-20">
        <a href="/" aria-label="VSRP home">
          <img src="/images/vsrp-logo.svg" alt="VSRP Engineered Rubber" className="h-10 w-auto sm:h-12 lg:h-[59px]" />
        </a>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium uppercase text-white transition hover:text-brand focus-visible:outline-2 focus-visible:outline-white"
              >
                {link.label}
                {link.hasDropdown && (
                  <svg viewBox="0 0 10 6" className="h-[5px] w-2" fill="currentColor" aria-hidden="true">
                    <path d="M0 0h10L5 6z" />
                  </svg>
                )}
              </a>
            </li>
          ))}
          <li>
            <Button href="#contact">Contact</Button>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur focus-visible:outline-2 focus-visible:outline-white lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="mx-5 rounded-2xl bg-black/85 p-6 backdrop-blur sm:mx-8 lg:hidden">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium uppercase text-white transition hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li onClick={() => setOpen(false)}>
              <Button href="#contact">Contact</Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar