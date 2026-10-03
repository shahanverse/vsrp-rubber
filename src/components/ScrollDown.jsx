const ScrollDown = ({ href = '#', className = '' }) => (
  <a
    href={href}
    className={`inline-flex items-center gap-2 text-sm font-semibold uppercase focus-visible:outline-2 focus-visible:outline-current ${className}`}
  >
    <span className="grid h-8 w-8 place-items-center rounded-full border border-dashed border-current/70">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
    Scroll down
  </a>
)

export default ScrollDown