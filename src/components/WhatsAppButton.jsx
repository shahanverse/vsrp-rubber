// floating WhatsApp button; pass the real number with country code and no + sign
const WhatsAppButton = ({ phone = '910000000000' }) => (
  <a
    // wa.me is WhatsApp's official chat link format
    href={`https://wa.me/${phone}`}
    // open in a new tab
    target="_blank"
    // security best practice for new-tab links
    rel="noreferrer"
    // the icon has no text, so give screen readers a label
    aria-label="Chat on WhatsApp"
    // 48px on phones and 60px from 640px up, fixed bottom right; desktop offsets match Figma
    className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-white sm:bottom-6 sm:right-6 sm:h-[60px] sm:w-[60px] lg:bottom-[60px] lg:right-[22px]"
  >
    {/* inline SVG so no image file is needed; WhatsApp green */}
    <svg
      // 24x24 drawing area
      viewBox="0 0 24 24"
      // no fill, we only draw lines
      fill="none"
      // line color comes from the text color below
      stroke="currentColor"
      // line thickness
      strokeWidth="2"
      // rounded line ends
      strokeLinecap="round"
      // rounded corners
      strokeLinejoin="round"
      // icon size grows with the button, colored WhatsApp green
      className="h-6 w-6 text-[#25D366] sm:h-8 sm:w-8"
      // decorative icon, the link already has a label
      aria-hidden="true"
    >
      {/* the chat bubble outline */}
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      {/* the phone handset, scaled down and centered inside the bubble */}
      <g transform="translate(7 7) scale(0.4167)" strokeWidth="4">
        {/* handset shape */}
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </g>
    </svg>
  </a>
)

// export so other files can import it
export default WhatsAppButton