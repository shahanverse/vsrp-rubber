// import the React hooks for state and timers
import { useEffect, useState } from 'react'
// import the reusable button and heading
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

// how long each industry stays on screen, in milliseconds
const INTERVAL = 5000

// the one photo on the right side (change to your real file name inside public/images)
const IMAGE_SRC = '/images/mining.png'

// the list shown in the wheel, in the same order as the design
const industries = [
  // each item has an id and the big title
  { id: 'civil', title: 'Civil' },
  // sits above Mining in the design
  { id: 'agriculture', title: 'Agriculture & Irrigation' },
  // the item that is centered in the design
  { id: 'mining', title: 'Mining' },
  // sits below Mining in the design
  { id: 'defence', title: 'Defence' },
  // building industry
  { id: 'building', title: 'Building' },
  // transport industry
  { id: 'transport', title: 'Transport & Infrastructure' },
]

// the five tabs in the design order; each one points to a wheel item by its id
const tabs = [
  // tab label and the id of the industry it opens
  { id: 'civil', label: 'Civil' },
  // second tab
  { id: 'mining', label: 'Mining' },
  // third tab
  { id: 'agriculture', label: 'Agriculture' },
  // fourth tab
  { id: 'building', label: 'Building' },
  // fifth tab
  { id: 'transport', label: 'Transport & Infrastructure' },
]

// work out how many steps an item is from the active one (negative = above, positive = below)
const getOffset = (index, active, total) => {
  // distance going forward, always between 0 and total - 1
  let d = (index - active + total) % total
  // past the halfway point it is closer going backwards, so make it negative
  if (d > total / 2) d -= total
  // return the signed distance
  return d
}

// Industries is the white section with the dark wheel panel and the photo panel
const Industries = () => {
  // index of the industry in the centre of the wheel; it starts on Mining like the design
  const [active, setActive] = useState(industries.findIndex((item) => item.id === 'mining'))
  // true while the mouse is over the left (dark) panel
  const [hovered, setHovered] = useState(false)
  // true while keyboard focus is inside the section
  const [focused, setFocused] = useState(false)
  // counter that restarts the timer and the progress line when it changes
  const [cycle, setCycle] = useState(0)
  // auto play is paused when either of the two above is true
  const paused = hovered || focused

  // auto play: move to the next industry after INTERVAL milliseconds
  useEffect(() => {
    // do nothing while the section is paused
    if (paused) return
    // people who asked their system for reduced motion never get automatic changes
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // after INTERVAL milliseconds go to the next item, wrapping back to the first
    const timer = setTimeout(() => setActive((current) => (current + 1) % industries.length), INTERVAL)
    // cancel the timer when something changes or the component unmounts
    return () => clearTimeout(timer)
    // run again whenever the active item, pause state or cycle changes
  }, [active, paused, cycle])

  // called when the mouse leaves the left panel
  const handleLeave = () => {
    // the mouse is no longer over the panel
    setHovered(false)
    // restart the timer and progress line from zero
    setCycle((current) => current + 1)
  }

  // called when something inside the section gets focus
  const handleFocus = (event) => {
    // only real keyboard focus pauses; clicking a tab with the mouse does not
    if (event.target.matches(':focus-visible')) setFocused(true)
  }

  // called when something inside the section loses focus
  const handleBlur = (event) => {
    // ignore focus moving from one element to another inside the section
    if (event.currentTarget.contains(event.relatedTarget)) return
    // keyboard focus has left the section
    setFocused(false)
    // restart the timer and progress line from zero
    setCycle((current) => current + 1)
  }

  // called when a tab is clicked
  const selectTab = (id) => {
    // find the wheel position of the industry this tab points to
    setActive(industries.findIndex((item) => item.id === id))
    // restart the timer and progress line from zero
    setCycle((current) => current + 1)
  }

  // return the section
  return (
    // id="industries" is what the navbar link scrolls to; white background
    <section id="industries" className="bg-white">
      {/* container: top space 100px and bottom space 80px at 1440px wide, side padding like the other sections */}
      <div className="mx-auto max-w-[1440px] px-5 pb-[clamp(48px,5.5vw,80px)] pt-[clamp(64px,6.9vw,100px)] sm:px-8 lg:px-12 xl:px-20">
        {/* centered heading with the orange last word */}
        <SectionTitle className="text-balance text-center">
          {/* normal words */}
          Rubber Solutions Built For{' '}
          {/* orange highlighted word */}
          <span className="text-brand">Industry.</span>
        </SectionTitle>

        {/* centered subtitle, 16px, 28px under the heading */}
        <p className="mx-auto mt-7 max-w-[640px] text-center text-base leading-snug text-body">
          {/* first line */}
          From infrastructure and mining to agriculture and transport, we help businesses solve
          {/* forced line break from 768px up so the text breaks like the design */}
          <br className="hidden md:block" />
          {/* a space so the words do not touch when the break is hidden */}
          {' '}complex challenges with engineered rubber solutions.
        </p>

        {/* two panels: stacked below 1024px, side by side from 1024px with a 20px gap; keyboard focus handlers live here */}
        <div
          // 42px under the subtitle at 1440px wide
          className="mt-[clamp(32px,2.9vw,42px)] grid grid-cols-1 gap-5 lg:grid-cols-2"
          // pause when keyboard focus enters
          onFocus={handleFocus}
          // resume when keyboard focus leaves
          onBlur={handleBlur}
        >
          {/* left panel: dark, square from 1024px up; --step is the distance between wheel items (105px at 1440px wide) */}
          <div
            // column layout: label on top, wheel in the middle, tabs at the bottom
            className="flex min-h-[480px] flex-col bg-night px-5 pb-8 pt-10 sm:px-8 lg:aspect-square lg:px-10"
            // CSS variable read by the wheel items
            style={{ '--step': 'clamp(64px,7.3vw,105px)' }}
            // pause the auto play when the mouse enters the left panel
            onMouseEnter={() => setHovered(true)}
            // resume (with a fresh timer) when the mouse leaves the left panel
            onMouseLeave={handleLeave}
          >
            {/* small label at the top, centered */}
            <p className="text-center text-sm font-medium uppercase text-white">Our industries</p>

            {/* wheel area: takes all the free height; decorative, because the tabs carry the meaning */}
            <div aria-hidden="true" className="relative min-h-[300px] flex-1">
              {/* loop over all industries and place each one by its distance from the active item */}
              {industries.map((item, index) => {
                // steps away from the centered item
                const d = getOffset(index, active, industries.length)
                // absolute distance, 0 means active
                const distance = Math.abs(d)
                // the active item is full size, neighbours shrink to 47%, others shrink further and vanish
                const scale = distance === 0 ? 1 : distance === 1 ? 0.47 : 0.3
                // the active item is solid white, neighbours are faded, others are invisible
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.25 : 0
                // return one wheel item
                return (
                  <p
                    // key helps React track each item
                    key={item.id}
                    // stacked in the middle of the wheel area, centered text, 36px to 60px, smooth slide and fade
                    className="absolute inset-x-0 top-1/2 text-balance px-2 text-center font-display text-[clamp(36px,4.17vw,60px)] font-semibold leading-none text-white transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none"
                    // move up or down by d steps and scale; fade by distance
                    style={{ transform: `translateY(calc(-50% + ${d} * var(--step))) scale(${scale})`, opacity }}
                  >
                    {/* the industry name */}
                    {item.title}
                  </p>
                )
              })}
            </div>

            {/* bottom block: divider and tabs */}
            <div>
              {/* dotted grey divider with the orange progress line on top of it */}
              <div aria-hidden="true" className="relative border-t border-dotted border-white/25">
                {/* progress line: key restarts the animation on every change; hidden for reduced motion */}
                <span
                  // restart the animation whenever the active item or cycle changes
                  key={`${active}-${cycle}`}
                  // orange dotted line sitting exactly over the grey one
                  className="absolute -top-px left-0 border-t border-dotted border-brand motion-reduce:hidden"
                  // grow from 0 to full width over INTERVAL, and freeze while paused
                  style={{ animation: `industry-progress ${INTERVAL}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                />
              </div>
              {/* tabs: spread across the full width on desktop, wrap onto more lines on phones */}
              <div role="group" aria-label="Choose an industry" className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-3">
                {/* loop over the five tabs */}
                {tabs.map((tab) => {
                  // is this tab pointing at the centered industry?
                  const isActive = industries[active].id === tab.id
                  // return one tab button
                  return (
                    <button
                      // key helps React track each tab
                      key={tab.id}
                      // plain button, not a form submit
                      type="button"
                      // move the wheel to this industry
                      onClick={() => selectTab(tab.id)}
                      // tells screen readers which tab is current
                      aria-current={isActive ? 'true' : undefined}
                      // 16px text; orange when active, white otherwise, orange on hover, visible keyboard focus ring
                      className={`text-base leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-white ${isActive ? 'text-brand' : 'text-white hover:text-brand'}`}
                    >
                      {/* tab text */}
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* right panel: one fixed photo; "group" lets it turn black and white on hover; hovering here does not pause the wheel; 4:3 on phones and square from 1024px up */}
          <div className="group relative aspect-[4/3] overflow-hidden bg-night lg:aspect-square">
            {/* the single photo: fills the card, crops instead of stretching, fades to black and white over 700ms on hover */}
            <img
              // photo file from public/images
              src={IMAGE_SRC}
              // description for screen readers
              alt="Haul trucks working in an open-pit mine"
              // fill the card and crop instead of stretch; color change takes 700ms; turns black and white while the card is hovered
              className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:grayscale motion-reduce:transition-none"
            />
            {/* soft dark layer at the bottom so the button stays readable */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* white circle with the icon, 70px at 1440px wide, 40px from the top left corner */}
            <div aria-hidden="true" className="absolute left-[clamp(16px,2.8vw,40px)] top-[clamp(16px,2.8vw,40px)] grid aspect-square w-[clamp(48px,4.86vw,70px)] place-items-center rounded-full bg-white text-black">
              {/* placeholder hard-hat icon; replace with your exported excavator icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-[52%] w-[52%]">
                {/* base of the hat */}
                <rect x="2" y="15" width="20" height="4" rx="1" />
                {/* centre ridge */}
                <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
                {/* right side of the dome */}
                <path d="M14 6a6 6 0 0 1 6 6v3" />
                {/* left side of the dome */}
                <path d="M4 15v-3a6 6 0 0 1 6-6" />
              </svg>
            </div>

            {/* button pinned bottom right, 40px from the edges at 1440px wide */}
            <div className="absolute bottom-[clamp(16px,2.8vw,40px)] right-[clamp(16px,2.8vw,40px)]">
              {/* translucent button with the roll-up animation */}
              <Button href="#capabilities" variant="glass">
                See our capabilities
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// export so App.jsx can import it
export default Industries