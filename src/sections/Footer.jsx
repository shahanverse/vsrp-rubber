const companyLinks = [
  { label: 'About', href: '#about' },
  { label: 'Case Studies', href: '#projects' },
  { label: 'Blogs', href: '#insights' },
  { label: 'Contact', href: '#contact' },
]

const industryLinks = [
  'Agriculture & Irrigation',
  'Plumbing',
  'Civil Engineering and Construction',
  'Mining',
  'Defence',
  'Architectural Industry',
  'Road Transport',
]

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socials = [
  { name: 'Instagram', href: '#', Icon: InstagramIcon },
  { name: 'Facebook', href: '#', Icon: FacebookIcon },
  { name: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { name: 'X', href: '#', Icon: XIcon },
]

const FooterGroup = ({ title, children }) => (
  <div className="border-t border-dotted border-white/20 pt-[clamp(20px,1.95vw,28px)]">
    <h2 className="text-[13px] font-medium uppercase leading-none text-brand">{title}</h2>
    <div className="mt-5">{children}</div>
  </div>
)

const Footer = () => (
  <footer className="relative isolate overflow-hidden bg-night text-white">
    <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-[clamp(260px,40vw,580px)]">
      <div className="absolute inset-0 bg-white/[0.03] [clip-path:polygon(0%_38%,10%_38%,48%_100%,36%_100%)]" />
      <div className="absolute inset-0 bg-white/[0.03] [clip-path:polygon(36%_100%,48%_100%,92%_0%,74%_0%)]" />
    </div>

    <div className="mx-auto max-w-[1440px] px-5 pb-[clamp(48px,6.9vw,100px)] pt-[clamp(56px,6.9vw,100px)] sm:px-8 lg:px-12 xl:px-20">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2">
        <div className="flex flex-col">
          <a href="/" aria-label="VSRP home" className="self-start">
            <img src="/images/vsrp-logo.svg" alt="VSRP Engineered Rubber" className="h-14 w-auto lg:h-[79px]" />
          </a>
          <p className="mt-10 max-w-[295px] text-sm leading-5 text-white/60">
            For over 20 years, VSRP has delivered engineered rubber solutions built around the unique requirements of Australian businesses.
          </p>
          <ul className="m-0 mt-10 flex list-none gap-4 p-0">
            {socials.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="grid h-[42px] w-[42px] place-items-center border border-dotted border-white/35 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-12 lg:mt-auto lg:pt-12">
            <img src="/images/iso-badge.png" alt="ISO 9001 certification mark" className="h-14 w-auto" />
            <p className="mt-2 text-sm leading-none">ISO9001:2015 Accredited</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-[50px] gap-y-[clamp(32px,4.2vw,60px)] sm:grid-cols-2">
          <FooterGroup title="Company">
            <ul className="m-0 list-none p-0">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="block text-base leading-[30px] text-white/80 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterGroup>

          <FooterGroup title="Industries">
            <ul className="m-0 list-none p-0">
              {industryLinks.map((name) => (
                <li key={name}>
                  <a href="#industries" className="block text-base leading-[30px] text-white/80 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-white">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterGroup>

          <FooterGroup title="Contact">
            <div className="space-y-3 text-base font-semibold leading-snug">
              <p className="m-0">
                <a href="tel:1800787777" className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-white">1800 787 777</a>
                {', '}
                <a href="tel:+61288349958" className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-white">+61 (2) 8834 9958</a>
              </p>
              <p className="m-0">
                <a href="mailto:enquiries@vsrp.com.au" className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-white">enquiries@vsrp.com.au</a>
              </p>
            </div>
          </FooterGroup>

          <FooterGroup title="Location">
            <address className="text-base font-semibold not-italic leading-snug">
              Unit 3, 10 Banksia Place,
              <br />
              South Windsor NSW 2756
            </address>
          </FooterGroup>
        </div>
      </div>
    </div>

    <div className="border-t border-dotted border-white/20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-3 px-5 py-[clamp(24px,2.8vw,40px)] text-xs font-semibold uppercase leading-none sm:grid-cols-3 sm:px-8 lg:px-12 xl:px-20">
        <p className="m-0">Copyright © {new Date().getFullYear()} VSRP</p>
        <p className="m-0 sm:text-center">Site by Acodez</p>
        <p className="m-0 flex items-center gap-3 sm:justify-end">
          <a href="#" className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-white">Privacy Policy</a>
          <span aria-hidden="true" className="h-3 w-px bg-white/40" />
          <span>All rights reserved</span>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer