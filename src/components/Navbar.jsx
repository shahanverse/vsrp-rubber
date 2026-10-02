// import useState so the menu can open and close
import { useState } from 'react'
// import the reusable button for CONTACT
import Button from './Button'

// links shown in the navbar, in the same order as the design
const navLinks = [
  // each link has a label, a target and whether it shows a dropdown caret
  { label: 'About', href: '#about', hasDropdown: false },
  // Industries has the small dropdown arrow in the design
  { label: 'Industries', href: '#industries', hasDropdown: true },
  // products link
  { label: 'Products', href: '#products', hasDropdown: false },
  // projects link
  { label: 'Projects', href: '#projects', hasDropdown: false },
  // insights link
  { label: 'Insights', href: '#insights', hasDropdown: false },
]

// Navbar floats over the hero video
const Navbar = () => {
  // open is true while the mobile menu is showing
  const [open, setOpen] = useState(false)

  // return the header
  return (
    // absolute so it sits over the video; z-40 keeps it above everything in the hero
    <header className="absolute inset-x-0 top-0 z-40">
      {/* padding grows with the screen: 20px on phones up to 80px on large desktops */}
      <nav aria-label="Main" className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-9 xl:px-20">
        {/* logo links back to the home page */}
        <a href="/" aria-label="VSRP home">
          {/* logo is 40px tall on phones and 59px on desktop, width follows automatically */}
          <img src="/images/vsrp-logo.svg" alt="VSRP Engineered Rubber" className="h-10 w-auto sm:h-12 lg:h-[59px]" />
        </a>

        {/* desktop link list: hidden below 1024px; the gap grows on bigger screens */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-9">
          {/* loop over the link data and render one item per link */}
          {navLinks.map((link) => (
            // key helps React track each list item
            <li key={link.label}>
              <a
                // where this link goes
                href={link.href}
                // 14px medium uppercase white text that turns orange on hover
                className="inline-flex items-center gap-1.5 text-sm font-medium uppercase text-white transition hover:text-brand focus-visible:outline-2 focus-visible:outline-white"
              >
                {/* link text */}
                {link.label}
                {/* show the dropdown caret only when the data says so */}
                {link.hasDropdown && (
                  // small down-pointing triangle, about 8px wide
                  <svg viewBox="0 0 10 6" className="h-[5px] w-2" fill="currentColor" aria-hidden="true">
                    {/* triangle shape */}
                    <path d="M0 0h10L5 6z" />
                  </svg>
                )}
              </a>
            </li>
          ))}
          {/* CONTACT button at the end of the list */}
          <li>
            <Button href="#contact">Contact</Button>
          </li>
        </ul>

        {/* hamburger button: only visible below 1024px */}
        <button
          // plain button, not a form submit
          type="button"
          // flip the open state on every click
          onClick={() => setOpen((prev) => !prev)}
          // tells screen readers whether the menu is open
          aria-expanded={open}
          // tells screen readers which element this button controls
          aria-controls="mobile-menu"
          // the icon has no text, so give it a label
          aria-label={open ? 'Close menu' : 'Open menu'}
          // 44px round touch target, translucent background, hidden on desktop
          className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur focus-visible:outline-2 focus-visible:outline-white lg:hidden"
        >
          {/* icon: X when open, three lines when closed */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
            {/* choose the icon path from the open state */}
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </nav>

      {/* mobile menu panel: only rendered while open, and never on desktop */}
      {open && (
        <div id="mobile-menu" className="mx-5 rounded-2xl bg-black/85 p-6 backdrop-blur sm:mx-8 lg:hidden">
          {/* stacked list of links */}
          <ul className="flex flex-col gap-5">
            {/* same link data as the desktop menu */}
            {navLinks.map((link) => (
              // key helps React track each list item
              <li key={link.label}>
                <a
                  // where this link goes
                  href={link.href}
                  // close the menu after a link is tapped
                  onClick={() => setOpen(false)}
                  // large tap-friendly uppercase text
                  className="block text-base font-medium uppercase text-white transition hover:text-brand"
                >
                  {/* link text */}
                  {link.label}
                </a>
              </li>
            ))}
            {/* CONTACT button at the bottom of the menu */}
            <li onClick={() => setOpen(false)}>
              <Button href="#contact">Contact</Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

// export so App.jsx can import it
export default Navbar