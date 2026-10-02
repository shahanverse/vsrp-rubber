// import the arrow shown inside the round circle
import ArrowIcon from './ArrowIcon'

// the two button looks from the design
const styles = {
  // orange pill with a white circle (CONTACT)
  primary: { wrapper: 'bg-brand text-white', circle: 'bg-white text-brand' },
  // translucent grey pill with a soft edge and an orange circle (DISCUSS YOUR PROJECT)
  glass: { wrapper: 'bg-white/20 text-white ring-1 ring-white/20 backdrop-blur-sm', circle: 'bg-brand text-white' },
}

// shared animation classes: 300ms smooth slide, switched off for people who prefer reduced motion
const slide = 'transition-transform duration-300 ease-out motion-reduce:transition-none'

// Button is a link that looks like a pill with a circular arrow; label and arrow roll up on hover
const Button = ({ href = '#', variant = 'primary', children }) => {
  // pick the colors for the chosen variant
  const s = styles[variant]
  // return the link
  return (
    <a
      // where the button goes
      href={href}
      // group lets the children react to hover; 48px tall on phones and 56px from 640px up; keyboard focus ring included
      className={`group inline-flex h-12 items-center gap-4 rounded-full pl-4 pr-1 text-[13px] font-semibold uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-14 sm:gap-5 sm:pl-5 sm:text-sm ${s.wrapper}`}
    >
      {/* label window: overflow-hidden hides the copy that waits below, nowrap keeps both copies on one line */}
      <span className="relative overflow-hidden whitespace-nowrap">
        {/* first copy: sits in place, then slides up and out on hover or keyboard focus */}
        <span className={`block group-hover:-translate-y-full group-focus-visible:-translate-y-full ${slide}`}>
          {/* the real label that screen readers read */}
          {children}
        </span>
        {/* second copy: waits below the window, then slides up into view; hidden from screen readers */}
        <span
          // decorative duplicate, so screen readers skip it
          aria-hidden="true"
          // pinned to the top-left of the window and pushed one line down until hover
          className={`absolute left-0 top-0 block translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 ${slide}`}
        >
          {/* same label again */}
          {children}
        </span>
      </span>

      {/* circle window: 40px on phones and 48px from 640px up; overflow-hidden hides the arrow that waits below */}
      <span className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full sm:h-12 sm:w-12 ${s.circle}`}>
        {/* first arrow: centered, slides up and out on hover or keyboard focus */}
        <span className={`absolute inset-0 grid place-items-center group-hover:-translate-y-full group-focus-visible:-translate-y-full ${slide}`}>
          {/* the arrow icon */}
          <ArrowIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
        {/* second arrow: waits below the circle, then slides up into the center */}
        <span
          // decorative duplicate, so screen readers skip it
          aria-hidden="true"
          // pushed one full circle down until hover
          className={`absolute inset-0 grid translate-y-full place-items-center group-hover:translate-y-0 group-focus-visible:translate-y-0 ${slide}`}
        >
          {/* the arrow icon again */}
          <ArrowIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
      </span>
    </a>
  )
}

// export so other files can import it
export default Button