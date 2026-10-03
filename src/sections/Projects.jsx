// import the React hooks for references, state and effects
import { useCallback, useEffect, useRef, useState } from 'react'
// import the arrow used in the "View project" link
import ArrowIcon from '../components/ArrowIcon'
// import the reusable button and heading
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

// the project cards; copy one object to add more
const projects = [
  {
    // card title
    title: 'Custom Extrusion Solution',
    // card description
    text: 'A specialised rubber extrusion profile engineered to meet strict performance and dimensional requirements.',
    // photo inside public/images (change to your real file name)
    image: '/images/project-1.png',
    // description of the photo for screen readers
    alt: 'Hands holding a black rubber extrusion profile in a white mould',
    // small labels shown on the photo
    tags: ['Mining', 'EPDM', 'Extrusion', 'Conveyor System'],
    // where the card goes when clicked
    href: '#',
  },
  {
    // second card
    title: 'Custom Extrusion Solution',
    // description
    text: 'A specialised rubber extrusion profile engineered to meet strict performance and dimensional requirements.',
    // photo
    image: '/images/project-2.png',
    // photo description
    alt: 'Hands holding a metal extrusion die with five black rubber plugs',
    // labels
    tags: ['Mining', 'EPDM', 'Extrusion', 'Conveyor System'],
    // link
    href: '#',
  },
  {
    // third card, the one that sticks out on the right in the design
    title: 'Custom Extrusion Solution',
    // description
    text: 'A specialised rubber extrusion profile engineered to meet strict performance and dimensional requirements.',
    // photo
    image: '/images/project-2.png',
    // photo description
    alt: 'Custom rubber extrusion project',
    // labels
    tags: ['Mining', 'EPDM', 'Extrusion', 'Conveyor System'],
    // link
    href: '#',
  },
]

// side space before the first card: the same left edge as the page container, also on screens wider than 1440px; used as an inline style so Tailwind does not need to find it
const EDGE = 'calc(max(0px, (100% - 1440px) / 2) + var(--gutter))'

// Projects is the white section with the heading, the sliding cards and the progress line
const Projects = () => {
  // reference to the scrolling element
  const scrollerRef = useRef(null)
  // remembers the state of a mouse drag between events
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  // true while the mouse is dragging the cards (the snapping is switched off during that time)
  const [dragging, setDragging] = useState(false)
  // size and position of the orange progress line, in percent of the dotted line
  const [thumb, setThumb] = useState({ size: 100, offset: 0 })

  // measure the scroller and update the orange progress line
  const update = useCallback(() => {
    // get the real element
    const el = scrollerRef.current
    // stop if it is not there yet
    if (!el) return
    // how far the cards can scroll in total
    const max = el.scrollWidth - el.clientWidth
    // the orange line is as wide as the visible part of the content (100% when nothing scrolls)
    const size = max > 0 ? (el.clientWidth / el.scrollWidth) * 100 : 100
    // the orange line moves along the track as the cards scroll
    const offset = max > 0 ? (el.scrollLeft / max) * (100 - size) : 0
    // save both numbers
    setThumb({ size, offset })
  }, [])

  // measure once, and again whenever the window size changes
  useEffect(() => {
    // first measurement
    update()
    // measure again on resize
    window.addEventListener('resize', update)
    // stop listening when the component unmounts
    return () => window.removeEventListener('resize', update)
    // run once
  }, [update])

  // mouse button pressed on the scroller: remember where the drag started
  const handlePointerDown = (event) => {
    // only the left mouse button; touch and pen already scroll natively
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    // store the starting mouse position and scroll position
    drag.current = { active: true, startX: event.clientX, startScroll: scrollerRef.current.scrollLeft, moved: false }
  }

  // mouse moved over the scroller: scroll the cards by the same distance
  const handlePointerMove = (event) => {
    // do nothing unless the button is held down
    if (!drag.current.active) return
    // how far the mouse moved since the press
    const dx = event.clientX - drag.current.startX
    // small shakes are still a click, only a real move starts a drag
    if (Math.abs(dx) > 5 && !drag.current.moved) {
      // remember that this press became a drag
      drag.current.moved = true
      // switch the snapping off while dragging
      setDragging(true)
    }
    // move the cards opposite to the mouse, like grabbing them
    if (drag.current.moved) scrollerRef.current.scrollLeft = drag.current.startScroll - dx
  }

  // mouse released or left the scroller: finish the drag
  const endDrag = () => {
    // nothing to finish if no drag was started
    if (!drag.current.active) return
    // the press is over
    drag.current.active = false
    // switch the snapping back on so the cards settle into place
    setDragging(false)
  }

  // a click that comes right after a drag must not open the card
  const handleClickCapture = (event) => {
    // only block it when this press was a drag
    if (drag.current.moved) {
      // stop the link from opening
      event.preventDefault()
      // stop the click from reaching the card
      event.stopPropagation()
      // reset for the next press
      drag.current.moved = false
    }
  }

  // return the section
  return (
    // id="projects" is what the navbar link scrolls to; --gutter is the side space and matches the other sections at every screen size
    <section id="projects" className="bg-white [--gutter:20px] sm:[--gutter:32px] lg:[--gutter:48px] xl:[--gutter:80px]">
      {/* top row: heading on the left and the "View all projects" button on the right; top space is 104px at 1440px wide */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6 px-[var(--gutter)] pt-[clamp(64px,7.2vw,104px)] sm:flex-row sm:items-center sm:justify-between">
        {/* large heading with the orange highlight */}
        <SectionTitle>
          {/* first line */}
          Wherever Precision Is
          {/* forced line break from 640px up so the heading breaks after "Is" like the design */}
          <br className="hidden sm:block" />
          {/* a space so the words do not touch when the break is hidden */}
          {' '}Needed, <span className="text-brand">VSRP Delivers.</span>
        </SectionTitle>
        {/* light button with the roll-up animation; change the href to your projects page */}
        <Button href="#projects" variant="light">
          View all projects
        </Button>
      </div>

      {/* the slider window: scrolls sideways, snaps card by card, scrollbar hidden; 45px under the heading at 1440px wide */}
      <div
        // lets the code move and measure the scrolling
        ref={scrollerRef}
        // keeps the progress line in sync while scrolling
        onScroll={update}
        // start a mouse drag
        onPointerDown={handlePointerDown}
        // follow the mouse while dragging
        onPointerMove={handlePointerMove}
        // finish the drag when the button is released
        onPointerUp={endDrag}
        // finish the drag when the mouse leaves the slider
        onPointerLeave={endDrag}
        // block the click that follows a drag
        onClickCapture={handleClickCapture}
        // keyboard users can focus the slider and scroll it with the arrow keys
        tabIndex={0}
        // screen readers announce what this region is
        role="region"
        // the name of the region
        aria-label="Projects"
        // snapped cards stop at the same left edge as the heading
        style={{ scrollPaddingLeft: EDGE }}
        // sideways scroll with no visible scrollbar, no text selection while dragging, snapping to each card (off while dragging)
        className={`mt-[clamp(32px,3.1vw,45px)] select-none overflow-x-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-brand [&::-webkit-scrollbar]:hidden ${dragging ? 'snap-none' : 'snap-x snap-mandatory'}`}
      >
        {/* row of cards: as wide as all cards together; the left space comes from the inline style so the first card lines up with the heading */}
        <ul
          // the left space before the first card
          style={{ paddingLeft: EDGE }}
          // cards in a row, no list bullets, space on the right end, gaps that grow with the screen
          className="m-0 flex w-max list-none gap-4 p-0 pr-[var(--gutter)] sm:gap-6 lg:gap-[30px]"
        >
          {/* loop over the projects */}
          {projects.map((project, index) => (
            // card width: 82% of the screen on phones, 52% on tablets, 617px at 1440px wide; each card is a snap point
            <li key={`${project.image}-${index}`} className="w-[82vw] shrink-0 snap-start sm:w-[52vw] lg:w-[min(42.8vw,617px)]">
              {/* the whole card is one link; "group" lets the photo and the link react to hover */}
              <a href={project.href} draggable={false} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                {/* photo frame: 4:3 on phones, 617 x 501 from 1024px up */}
                <div className="relative aspect-[4/3] overflow-hidden bg-night lg:aspect-[617/501]">
                  {/* the photo: fills the frame, and fades to black and white while the card is hovered */}
                  <img
                    // photo file from public/images
                    src={project.image}
                    // description for screen readers
                    alt={project.alt}
                    // the first two cards load right away, the rest wait until needed
                    loading={index < 2 ? 'eager' : 'lazy'}
                    // stops the browser from dragging the picture around
                    draggable={false}
                    // fill the frame, crop instead of stretch, colour change takes 700ms
                    className="h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:grayscale motion-reduce:transition-none"
                  />

                  {/* "View project" link in the top right: always visible on touch screens, only on hover or keyboard focus with a mouse */}
                  <span className="absolute right-[clamp(16px,2.9vw,42px)] top-[clamp(16px,3.2vw,46px)] inline-flex items-center gap-1.5 text-sm font-medium uppercase text-white transition-opacity duration-300 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100 motion-reduce:transition-none">
                    {/* only the text gets the dotted underline */}
                    <span className="underline decoration-dotted underline-offset-[6px]">View project</span>
                    {/* small arrow */}
                    <ArrowIcon className="h-4 w-4" />
                  </span>

                  {/* tags in the bottom left: translucent dark pills that wrap onto more lines on small screens */}
                  <ul className="absolute bottom-[clamp(12px,2.1vw,30px)] left-[clamp(12px,2.1vw,30px)] right-3 m-0 flex list-none flex-wrap gap-1.5 p-0">
                    {/* loop over the tags */}
                    {project.tags.map((tag) => (
                      // one pill: 13px uppercase white text on a blurred dark background
                      <li key={tag} className="rounded-full bg-black/55 px-[18px] py-2 text-[13px] font-medium uppercase leading-normal text-white backdrop-blur-sm">
                        {/* tag text */}
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* card title as h3 because the section heading is the h2; 33px under the photo at 1440px wide */}
                <SectionTitle as="h3" size="sm" className="mt-[clamp(20px,2.3vw,33px)]">
                  {/* title text */}
                  {project.title}
                </SectionTitle>
                {/* card description: 16px, soft grey, 12px under the title, 470px wide at most */}
                <p className="mt-3 max-w-[470px] text-base leading-snug text-body">{project.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* progress line under the slider: same width as the page container, with the space around it scaling with the screen */}
           <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-0 pt-[clamp(40px,7vw,100px)]">
        {/* grey dotted track; decorative, because the cards themselves are scrollable and focusable */}
        <div aria-hidden="true" className="relative border-t border-dotted border-black/25">
          {/* orange dotted part: its width shows how much is visible and it moves as the cards scroll */}
          <span className="absolute -top-px block border-t border-dotted border-brand" style={{ width: `${thumb.size}%`, left: `${thumb.offset}%` }} />
        </div>
      </div>
    </section>
  )
}

// export so App.jsx can import it
export default Projects