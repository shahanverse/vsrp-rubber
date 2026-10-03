import { useEffect, useState } from 'react'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const INTERVAL = 5000

const IMAGE_SRC = '/images/mining.png'

const industries = [
  { id: 'civil', title: 'Civil' },
  { id: 'agriculture', title: 'Agriculture & Irrigation' },
  { id: 'mining', title: 'Mining' },
  { id: 'defence', title: 'Defence' },
  { id: 'building', title: 'Building' },
  { id: 'transport', title: 'Transport & Infrastructure' },
]

const tabs = [
  { id: 'civil', label: 'Civil' },
  { id: 'mining', label: 'Mining' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'building', label: 'Building' },
  { id: 'transport', label: 'Transport & Infrastructure' },
]

const getOffset = (index, active, total) => {
  let d = (index - active + total) % total
  if (d > total / 2) d -= total
  return d
}

const Industries = () => {
  const [active, setActive] = useState(industries.findIndex((item) => item.id === 'mining'))
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [cycle, setCycle] = useState(0)
  const paused = hovered || focused

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => setActive((current) => (current + 1) % industries.length), INTERVAL)
    return () => clearTimeout(timer)
  }, [active, paused, cycle])

  const handleLeave = () => {
    setHovered(false)
    setCycle((current) => current + 1)
  }

  const handleFocus = (event) => {
    if (event.target.matches(':focus-visible')) setFocused(true)
  }

  const handleBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return
    setFocused(false)
    setCycle((current) => current + 1)
  }

  const selectTab = (id) => {
    setActive(industries.findIndex((item) => item.id === id))
    setCycle((current) => current + 1)
  }

  return (
    <section id="industries" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-[clamp(48px,5.5vw,80px)] pt-[clamp(64px,6.9vw,100px)] sm:px-8 lg:px-12 xl:px-20">
        <SectionTitle className="text-balance text-center">
          Rubber Solutions Built For{' '}
          <span className="text-brand">Industry.</span>
        </SectionTitle>

        <p className="mx-auto mt-7 max-w-[640px] text-center text-base leading-snug text-body">
          From infrastructure and mining to agriculture and transport, we help businesses solve
          <br className="hidden md:block" />
          {' '}complex challenges with engineered rubber solutions.
        </p>

        <div
          className="mt-[clamp(32px,2.9vw,42px)] grid grid-cols-1 gap-5 lg:grid-cols-2"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div
            className="flex min-h-[480px] flex-col bg-night px-5 pb-8 pt-10 sm:px-8 lg:aspect-square lg:px-10"
            style={{ '--step': 'clamp(64px,7.3vw,105px)' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleLeave}
          >
            <p className="text-center text-sm font-medium uppercase text-white">Our industries</p>

            <div aria-hidden="true" className="relative min-h-[300px] flex-1">
              {industries.map((item, index) => {
                const d = getOffset(index, active, industries.length)
                const distance = Math.abs(d)
                const scale = distance === 0 ? 1 : distance === 1 ? 0.47 : 0.3
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.25 : 0

                return (
                  <p
                    key={item.id}
                    className="absolute inset-x-0 top-1/2 text-balance px-2 text-center font-display text-[clamp(36px,4.17vw,60px)] font-semibold leading-none text-white transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none"
                    style={{ transform: `translateY(calc(-50% + ${d} * var(--step))) scale(${scale})`, opacity }}
                  >
                    {item.title}
                  </p>
                )
              })}
            </div>

            <div>
              <div aria-hidden="true" className="relative border-t border-dotted border-white/25">
                <span
                  key={`${active}-${cycle}`}
                  className="absolute -top-px left-0 border-t border-dotted border-brand motion-reduce:hidden"
                  style={{ animation: `industry-progress ${INTERVAL}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                />
              </div>
              <div role="group" aria-label="Choose an industry" className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-3">
                {tabs.map((tab) => {
                  const isActive = industries[active].id === tab.id

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => selectTab(tab.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`text-base leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-white ${isActive ? 'text-brand' : 'text-white hover:text-brand'}`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="group relative aspect-[4/3] overflow-hidden bg-night lg:aspect-square">
            <img
              src={IMAGE_SRC}
              alt="Haul trucks working in an open-pit mine"
              className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:grayscale motion-reduce:transition-none"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <div aria-hidden="true" className="absolute left-[clamp(16px,2.8vw,40px)] top-[clamp(16px,2.8vw,40px)] grid aspect-square w-[clamp(48px,4.86vw,70px)] place-items-center rounded-full bg-white text-black">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-[52%] w-[52%]">
                <rect x="2" y="15" width="20" height="4" rx="1" />
                <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
                <path d="M14 6a6 6 0 0 1 6 6v3" />
                <path d="M4 15v-3a6 6 0 0 1 6-6" />
              </svg>
            </div>

            <div className="absolute bottom-[clamp(16px,2.8vw,40px)] right-[clamp(16px,2.8vw,40px)]">
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

export default Industries