// import the React hooks for state, timers and the section reference
import { useEffect, useRef, useState } from 'react'
// import the reusable heading and scroll down link
import SectionTitle from '../components/SectionTitle'
import ScrollDown from '../components/ScrollDown'

// how long each step stays active, in milliseconds
const INTERVAL = 5000
// delay between one step's entrance and the next, in milliseconds
const STAGGER = 150

// the four steps: text and the picture that shows while the step is active (files are in public/images)
const steps = [
  // step 1
  { title: 'Tell Us What You Need', text: 'Send us a drawing, sample or specification.', image: '/images/process-1.svg' },
  // step 2
  { title: "We'll Engineer The Solution", text: 'Materials, tooling and manufacturing approach.', image: '/images/process-2.png' },
  // step 3
  { title: "We'll Make It", text: 'Materials, tooling and manufacturing approach.', image: '/images/process-3.png' },
  // step 4
  { title: "We'll Deliver It", text: 'Materials, tooling and manufacturing approach.', image: '/images/process-4.png' },
]

// Process is the light grey section with the numbered steps and the changing illustration
const Process = () => {
  // index of the active step; it starts on the first one like the design
  const [active, setActive] = useState(0)
  // true while the mouse is over the steps list
  const [hovered, setHovered] = useState(false)
  // true while keyboard focus is inside the steps list
  const [focused, setFocused] = useState(false)
  // counter that restarts the timer and the progress line when it changes
  const [cycle, setCycle] = useState(0)
  // true once the section has scrolled into view; the entrance animation and the timer wait for this
  const [visible, setVisible] = useState(false)
  // reference to the section element so we can watch it
  const sectionRef = useRef(null)
  // auto play is paused when either the mouse or the keyboard focus is in the list
  const paused = hovered || focused

  // watch the section and flip "visible" the first time a quarter of it is on screen
  useEffect(() => {
    // get the real section element
    const element = sectionRef.current
    // stop if the element is not there yet
    if (!element) return
    // very old browsers without IntersectionObserver just show everything straight away
    if (!('IntersectionObserver' in window)) {
      // mark as visible
      setVisible(true)
      // nothing to clean up
      return
    }
    // create the observer; it calls this function whenever the visibility changes
    const observer = new IntersectionObserver(
      // the first entry is our section
      ([entry]) => {
        // when it is on screen, start the animation and stop watching
        if (entry.isIntersecting) {
          // mark as visible
          setVisible(true)
          // we only need the first time
          observer.disconnect()
        }
      },
      // fire when 25% of the section is visible
      { threshold: 0.25 },
    )
    // start watching the section
    observer.observe(element)
    // stop watching when the component unmounts
    return () => observer.disconnect()
    // run once
  }, [])

  // auto play: move to the next step after INTERVAL milliseconds
  useEffect(() => {
    // wait until the section is on screen, and do nothing while paused
    if (!visible || paused) return
    // people who asked their system for reduced motion never get automatic changes
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // after INTERVAL milliseconds go to the next step, wrapping back to the first
    const timer = setTimeout(() => setActive((current) => (current + 1) % steps.length), INTERVAL)
    // cancel the timer when something changes or the component unmounts
    return () => clearTimeout(timer)
    // run again whenever the step, pause state, cycle or visibility changes
  }, [active, paused, cycle, visible])

  // called when the mouse leaves the steps list
  const handleMouseLeave = () => {
    // the mouse is no longer over the list
    setHovered(false)
    // restart the timer and progress line from zero
    setCycle((current) => current + 1)
  }

  // called when something inside the list gets focus
  const handleFocus = (event) => {
    // only real keyboard focus pauses; clicking a step with the mouse does not
    if (event.target.matches(':focus-visible')) setFocused(true)
  }

  // called when something inside the list loses focus
  const handleBlur = (event) => {
    // ignore focus moving from one step to another inside the list
    if (event.currentTarget.contains(event.relatedTarget)) return
    // keyboard focus has left the list
    setFocused(false)
    // restart the timer and progress line from zero
    setCycle((current) => current + 1)
  }

  // called when a step is clicked
  const selectStep = (index) => {
    // jump to the clicked step
    setActive(index)
    // restart the timer and progress line from zero
    setCycle((current) => current + 1)
  }

  // return the section
  return (
    // same pale background as the About section; ref lets us watch when it scrolls into view
    <section id="process" ref={sectionRef} className="bg-surface">
      {/* container: top space 104px and bottom space 108px at 1440px wide, side padding like the other sections */}
      <div className="mx-auto max-w-[1440px] px-5 pb-[clamp(56px,7.5vw,108px)] pt-[clamp(64px,7.2vw,104px)] sm:px-8 lg:px-12 xl:px-20">
        {/* centered heading with the orange last word */}
        <SectionTitle className="text-balance text-center">
          {/* first line */}
          From Concept to Delivery,
          {/* forced line break from 640px up so the heading breaks like the design */}
          <br className="hidden sm:block" />
          {/* a space so the words do not touch when the break is hidden */}
          {' '}We Make it <span className="text-brand">Happen</span>
        </SectionTitle>

        {/* centered subtitle, 16px, 24px under the heading, 460px wide at most */}
        <p className="mx-auto mt-6 max-w-[460px] text-center text-base leading-snug text-body">
          A proven process built around collaboration, precision and a commitment to quality at every step.
        </p>

        {/* two columns from 1024px: a 415px steps column and a flexible picture column; one column below */}
        <div className="mt-[clamp(40px,6.4vw,92px)] grid grid-cols-1 gap-y-12 lg:grid-cols-[415px_1fr]">
          {/* numbered list of steps; pausing handlers live here */}
          <ol
            // no bullets, no default spacing
            className="m-0 list-none p-0"
            // pause when the mouse enters the list
            onMouseEnter={() => setHovered(true)}
            // resume when the mouse leaves the list
            onMouseLeave={handleMouseLeave}
            // pause when keyboard focus enters the list
            onFocus={handleFocus}
            // resume when keyboard focus leaves the list
            onBlur={handleBlur}
          >
            {/* loop over the four steps */}
            {steps.map((step, index) => {
              // is this the active step?
              const isActive = index === active
              // is this a step that is already finished (before the active one)?
              const isDone = index < active
              // is this the last step? it gets no connecting line below it
              const isLast = index === steps.length - 1
              // return one step row
              return (
                // each row fades up and slides up 24px into place, one after another; reduced motion shows it straight away
                <li
                  // key helps React track each step
                  key={step.title}
                  // start hidden and low, then become visible; the transition is skipped for reduced motion
                  className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                  // step 1 starts first, step 2 150ms later, and so on
                  style={{ transitionDelay: visible ? `${index * STAGGER}ms` : '0ms' }}
                >
                  <button
                    // plain button, not a form submit
                    type="button"
                    // jump to this step when clicked
                    onClick={() => selectStep(index)}
                    // tells screen readers which step is current
                    aria-current={isActive ? 'step' : undefined}
                    // group lets the title react to hover; every step but the last is 135px tall at 1440px wide so the pitch is equal; keyboard focus ring included
                    className={`group flex w-full gap-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${isLast ? '' : 'min-h-[clamp(112px,9.4vw,135px)]'}`}
                  >
                    {/* left part: the numbered circle with the dotted line below it */}
                    <span className="flex shrink-0 flex-col items-center">
                      {/* 56px circle with a dotted border; orange when active or finished, grey otherwise */}
                      <span className={`grid h-14 w-14 place-items-center rounded-full border border-dotted font-display text-lg transition-colors duration-500 motion-reduce:transition-none ${isActive ? 'border-brand text-brand' : isDone ? 'border-brand text-body' : 'border-black/35 text-body'}`}>
                        {/* step number with a leading zero: 01, 02, 03, 04 */}
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {/* dotted line that fills the rest of the step height and reaches the next circle; not drawn after the last step */}
                      {!isLast && (
                        // grey dotted track
                        <span aria-hidden="true" className="relative w-0 flex-1 border-l border-dotted border-black/25">
                          {/* finished steps keep a full orange line */}
                          {isDone && <span className="absolute -left-px top-0 h-full border-l border-dotted border-brand" />}
                          {/* the active step's line grows from top to bottom over INTERVAL */}
                          {isActive && (
                            <span
                              // restart the growth whenever the active step or the cycle changes
                              key={`${active}-${cycle}`}
                              // orange dotted line sitting exactly over the grey one; hidden for reduced motion
                              className="absolute -left-px top-0 border-l border-dotted border-brand motion-reduce:hidden"
                              // grow over INTERVAL, and freeze while paused
                              style={{ animation: `process-progress ${INTERVAL}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                            />
                          )}
                        </span>
                      )}
                    </span>

                    {/* right part: title and description, 330px wide at most */}
                    <span className="mt-[15px] block max-w-[330px]">
                      {/* title: 25px at 1440px wide, orange when active, turns orange on hover */}
                      <span className={`block font-display text-[clamp(20px,1.74vw,25px)] font-semibold leading-none transition-colors duration-500 motion-reduce:transition-none ${isActive ? 'text-brand' : 'text-ink group-hover:text-brand'}`}>
                        {/* step title */}
                        {step.title}
                      </span>
                      {/* description: 16px, soft grey, 18px under the title */}
                      <span className="mt-[18px] block text-base leading-snug text-body">
                        {/* step description */}
                        {step.text}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* right column: the illustration on top, the scroll down link at the bottom right */}
          <div className="flex flex-col justify-between gap-10">
            {/* picture frame, 8:7 like the design: 34vw wide on desktop (about 490px at 1440px), centered; it fades in after the steps */}
            <div
              // fills the column width up to 520px; hidden until the section is visible; reduced motion shows it straight away
              className={`relative mx-auto aspect-[8/7] w-full max-w-[520px] transition-opacity duration-700 ease-out motion-reduce:opacity-100 motion-reduce:transition-none lg:w-[34vw] ${visible ? 'opacity-100' : 'opacity-0'}`}
              // starts after all four steps have appeared
              style={{ transitionDelay: visible ? `${steps.length * STAGGER}ms` : '0ms' }}
            >
              {/* all four pictures are stacked here; only the active one is visible, so they cross-fade */}
              {steps.map((step, index) => (
                <img
                  // key helps React track each picture
                  key={step.image}
                  // picture file from public/images
                  src={step.image}
                  // only the visible picture gets a description for screen readers
                  alt={index === active ? `Illustration for step ${index + 1}: ${step.title}` : ''}
                  // hide the invisible pictures from screen readers
                  aria-hidden={index !== active}
                  // only the first picture loads right away
                  loading={index === 0 ? 'eager' : 'lazy'}
                  // fill the frame without cropping, and cross-fade over 500ms
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out motion-reduce:transition-none ${index === active ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>

            {/* scroll down link pinned to the bottom right of the column, dark version; change the href to the next section */}
            <div className="flex justify-end">
              {/* shared scroll down link, colored by the parent text color */}
              <ScrollDown href="#projects" className="text-ink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// export so App.jsx can import it
export default Process