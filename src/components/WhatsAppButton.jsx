const WhatsAppButton = ({ phone = '910000000000' }) => (
  <a
    href={`https://wa.me/${phone}`}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-body/15 backdrop-blur transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-white sm:bottom-6 sm:right-6 sm:h-[60px] sm:w-[60px] lg:bottom-[60px] lg:right-[22px]"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-[#25D366] sm:h-8 sm:w-8"
      aria-hidden="true"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <g transform="translate(7 7) scale(0.4167)" strokeWidth="4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </g>
    </svg>
  </a>
)

export default WhatsAppButton