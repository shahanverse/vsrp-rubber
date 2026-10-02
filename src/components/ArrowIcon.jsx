// small arrow icon used inside buttons and links
const ArrowIcon = ({ className = '' }) => (
  // inline SVG so we don't need an icon library
  <svg
    // 24x24 drawing area
    viewBox="0 0 24 24"
    // no fill, we only draw lines
    fill="none"
    // line color follows the parent's text color
    stroke="currentColor"
    // line thickness
    strokeWidth="2.5"
    // rounded line ends
    strokeLinecap="round"
    // rounded corners where lines meet
    strokeLinejoin="round"
    // size and extra styles come from the parent
    className={className}
    // decorative icon, hide it from screen readers
    aria-hidden="true"
  >
    {/* horizontal line of the arrow */}
    <path d="M5 12h14" />
    {/* arrow head */}
    <path d="m13 6 6 6-6 6" />
  </svg>
)

// export so other files can import it
export default ArrowIcon