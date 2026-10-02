// import the React hooks we need for the video
import { useEffect, useRef } from 'react'
// import the reusable button and arrow
import Button from '../components/Button'
import ArrowIcon from '../components/ArrowIcon'

// all the text used in the hero
const content = {
  // left heading lines (the orange full stop is added by Title)
  titleLeft: ['Custom Rubber', 'Solutions'],
  // right heading lines
  titleRight: ['Engineered To', 'Perform'],
  // paragraph under the left heading
  description:
    "For more than 20 years, we've helped Australian businesses solve problems with engineered rubber solutions. From design and tooling to manufacturing and delivery, we make what you need, when you need it.",
}

// Title renders a two-line heading with an orange full stop; "as" picks the tag (h1 or h2)
const Title = ({ as: Tag = 'h2', lines, align }) => (
  // size scales with the screen width: 40px to 72px on phones and tablets, 52px to 82px on desktop
  <Tag className={`font-display font-semibold leading-none text-[clamp(40px,11vw,72px)] lg:text-[clamp(52px,5.69vw,82px)] ${align}`}>
    {/* first line as its own block so it always breaks in the same place */}
    <span className="block">{lines[0]}</span>
    {/* second line followed by the orange full stop */}
    <span className="block">
      {lines[1]}
      {/* the orange dot from the design */}
      <span className="text-brand">.</span>
    </span>
  </Tag>
)

// Hero is the first full-screen section
const Hero = () => {
  // ref gives us direct access to the <video> element
  const videoRef = useRef(null)

  // run once after the first render
  useEffect(() => {
    // get the real video element from the ref
    const video = videoRef.current
    // stop if the element is not there yet
    if (!video) return
    // React does not always set the muted attribute, and browsers block autoplay unless muted
    video.muted = true
    // try to start playback; play() returns a promise
    video.play().catch((error) => {
      // log the reason so we can read it in the console
      console.error('Hero video could not play:', error)
    })
    // empty array means this runs only once
  }, [])

  // return the section
  return (
    // min-h-svh fits phones whose browser bar changes the screen height; isolate keeps z-index layers contained
    <section className="relative isolate min-h-svh overflow-hidden bg-black text-white">
      {/* background video, behind everything */}
      <video
        // lets the effect above control the video
        ref={videoRef}
        // fills the whole section and crops instead of stretching
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        // start playing automatically
        autoPlay
        // browsers only allow autoplay when muted
        muted
        // repeat forever
        loop
        // stops iPhones from opening the video fullscreen
        playsInline
        // start downloading the video straight away
        preload="auto"
        // decorative video, hide from screen readers
        aria-hidden="true"
      >
        {/* the video file from the public folder; change the name to match yours */}
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* dark gradient on top of the video so the white text stays readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* one column on phones and tablets, two columns from 1024px; side padding and top spacing scale with the screen */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-6 px-5 pb-36 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-0 lg:px-12 lg:pt-[clamp(180px,18.1vw,261px)] xl:px-20">
        {/* left heading is the page's only h1, right-aligned on desktop like the design */}
        <Title as="h1" lines={content.titleLeft} align="text-left lg:text-right" />
        {/* right heading: pushed down on desktop for the staggered look, scaled with the screen width */}
        <div className="lg:mt-[min(11.1vw,160px)]">
          {/* second heading is an h2 so the page has one h1 */}
          <Title as="h2" lines={content.titleRight} align="text-left" />
        </div>

        {/* paragraph, 420px wide at most */}
        <p className="max-w-[420px] text-base leading-snug text-white/85 lg:mt-1">{content.description}</p>

        {/* buttons wrap onto a second line on very small screens */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:gap-x-10 lg:pt-[38px]">
          {/* translucent button with orange circle */}
          <Button href="#contact" variant="glass">
            Discuss your project
          </Button>
          {/* link with a dotted underline on the text only, plus a small arrow */}
          <a
            // jumps to the next section
            href="#about"
            // 14px uppercase semi bold text
            className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase transition hover:text-brand focus-visible:outline-2 focus-visible:outline-white"
          >
            {/* only the text gets the dotted underline */}
            <span className="underline decoration-dotted underline-offset-[6px]">See what we do</span>
            {/* small arrow */}
            <ArrowIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* scroll down link pinned bottom left; offsets grow with the screen */}
      <a
        // scrolls to the next section
        href="#about"
        // bottom-left position, 8px gap, 14px uppercase semi bold text
        className="absolute bottom-8 left-5 flex items-center gap-2 text-sm font-semibold uppercase focus-visible:outline-2 focus-visible:outline-white sm:bottom-10 sm:left-8 lg:bottom-[72px] lg:left-12 xl:left-20"
      >
        {/* 32px circle with a dashed border holding a down chevron */}
        <span className="grid h-8 w-8 place-items-center rounded-full border border-dashed border-white/70">
          {/* down chevron drawn as an SVG */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            {/* the chevron path */}
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
        {/* link text */}
        Scroll down
      </a>
    </section>
  )
}

// export so App.jsx can import it
export default Hero