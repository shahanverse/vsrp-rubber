// ScrollDown is the dashed circle with a chevron plus the "Scroll down" label; its color follows the parent's text color
const ScrollDown = ({ href = '#', className = '' }) => (
  <a
    // where the link scrolls to
    href={href}
    // inline-flex so it can be centered by a parent; 14px uppercase semi bold; focus ring uses the current color
    className={`inline-flex items-center gap-2 text-sm font-semibold uppercase focus-visible:outline-2 focus-visible:outline-current ${className}`}
  >
    {/* 32px circle with a dashed border in the current text color */}
    <span className="grid h-8 w-8 place-items-center rounded-full border border-dashed border-current/70">
      {/* down chevron drawn as an SVG */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        {/* the chevron path */}
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
    {/* link text */}
    Scroll down
  </a>
)

// export so sections can import it
export default ScrollDown