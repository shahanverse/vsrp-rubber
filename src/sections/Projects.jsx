import { useCallback, useEffect, useRef, useState } from 'react'
import ArrowIcon from '../components/ArrowIcon'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const projects = [
  {
    title: 'Custom Extrusion Solution',
    text: 'A specialised rubber extrusion profile engineered to meet strict performance and dimensional requirements.',
    image: '/images/project-1.png',
    alt: 'Hands holding a black rubber extrusion profile in a white mould',
    tags: ['Mining', 'EPDM', 'Extrusion', 'Conveyor System'],
    href: '#',
  },
  {
    title: 'Custom Extrusion Solution',
    text: 'A specialised rubber extrusion profile engineered to meet strict performance and dimensional requirements.',
    image: '/images/project-2.png',
    alt: 'Hands holding a metal extrusion die with five black rubber plugs',
    tags: ['Mining', 'EPDM', 'Extrusion', 'Conveyor System'],
    href: '#',
  },
  {
    title: 'Custom Extrusion Solution',
    text: 'A specialised rubber extrusion profile engineered to meet strict performance and dimensional requirements.',
    image: '/images/project-2.png',
    alt: 'Custom rubber extrusion project',
    tags: ['Mining', 'EPDM', 'Extrusion', 'Conveyor System'],
    href: '#',
  },
]

const EDGE = 'calc(max(0px, (100% - 1440px) / 2) + var(--gutter))'

const Projects = () => {
  const scrollerRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const [dragging, setDragging] = useState(false)
  const [thumb, setThumb] = useState({ size: 100, offset: 0 })

  const update = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const size = max > 0 ? (el.clientWidth / el.scrollWidth) * 100 : 100
    const offset = max > 0 ? (el.scrollLeft / max) * (100 - size) : 0
    setThumb({ size, offset })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    drag.current = { active: true, startX: event.clientX, startScroll: scrollerRef.current.scrollLeft, moved: false }
  }

  const handlePointerMove = (event) => {
    if (!drag.current.active) return
    const dx = event.clientX - drag.current.startX
    if (Math.abs(dx) > 5 && !drag.current.moved) {
      drag.current.moved = true
      setDragging(true)
    }
    if (drag.current.moved) scrollerRef.current.scrollLeft = drag.current.startScroll - dx
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    setDragging(false)
  }

  const handleClickCapture = (event) => {
    if (drag.current.moved) {
      event.preventDefault()
      event.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <section id="projects" className="bg-white [--gutter:20px] sm:[--gutter:32px] lg:[--gutter:48px] xl:[--gutter:80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6 px-[var(--gutter)] pt-[clamp(64px,7.2vw,104px)] sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle>
          Wherever Precision Is
          <br className="hidden sm:block" />
          {' '}Needed, <span className="text-brand">VSRP Delivers.</span>
        </SectionTitle>
        <Button href="#projects" variant="light">
          View all projects
        </Button>
      </div>

      <div
        ref={scrollerRef}
        onScroll={update}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={handleClickCapture}
        tabIndex={0}
        role="region"
        aria-label="Projects"
        style={{ scrollPaddingLeft: EDGE }}
        className={`mt-[clamp(32px,3.1vw,45px)] select-none overflow-x-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-brand [&::-webkit-scrollbar]:hidden ${dragging ? 'snap-none' : 'snap-x snap-mandatory'}`}
      >
        <ul
          style={{ paddingLeft: EDGE }}
          className="m-0 flex w-max list-none gap-4 p-0 pr-[var(--gutter)] sm:gap-6 lg:gap-[30px]"
        >
          {projects.map((project, index) => (
            <li key={`${project.image}-${index}`} className="w-[82vw] shrink-0 snap-start sm:w-[52vw] lg:w-[min(42.8vw,617px)]">
              <a href={project.href} draggable={false} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                <div className="relative aspect-[4/3] overflow-hidden bg-night lg:aspect-[617/501]">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:grayscale motion-reduce:transition-none"
                  />

                  <span className="absolute right-[clamp(16px,2.9vw,42px)] top-[clamp(16px,3.2vw,46px)] inline-flex items-center gap-1.5 text-sm font-medium uppercase text-white transition-opacity duration-300 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100 motion-reduce:transition-none">
                    <span className="underline decoration-dotted underline-offset-[6px]">View project</span>
                    <ArrowIcon className="h-4 w-4" />
                  </span>

                  <ul className="absolute bottom-[clamp(12px,2.1vw,30px)] left-[clamp(12px,2.1vw,30px)] right-3 m-0 flex list-none flex-wrap gap-1.5 p-0">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-black/55 px-[18px] py-2 text-[13px] font-medium uppercase leading-normal text-white backdrop-blur-sm">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <SectionTitle as="h3" size="sm" className="mt-[clamp(20px,2.3vw,33px)]">
                  {project.title}
                </SectionTitle>
                <p className="mt-3 max-w-[470px] text-base leading-snug text-body">{project.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-0 pt-[clamp(40px,7vw,100px)]">
        <div aria-hidden="true" className="relative border-t border-dotted border-black/25">
          <span className="absolute -top-px block border-t border-dotted border-brand" style={{ width: `${thumb.size}%`, left: `${thumb.offset}%` }} />
        </div>
      </div>
    </section>
  )
}

export default Projects