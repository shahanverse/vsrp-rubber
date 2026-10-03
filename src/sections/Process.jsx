import { useEffect, useRef, useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import ScrollDown from '../components/ScrollDown'

const INTERVAL = 5000
const STAGGER = 150

const steps = [
  { title: 'Tell Us What You Need', text: 'Send us a drawing, sample or specification.', image: '/images/process-1.svg' },
  { title: "We'll Engineer The Solution", text: 'Materials, tooling and manufacturing approach.', image: '/images/process-2.png' },
  { title: "We'll Make It", text: 'Materials, tooling and manufacturing approach.', image: '/images/process-3.png' },
  { title: "We'll Deliver It", text: 'Materials, tooling and manufacturing approach.', image: '/images/process-4.png' },
]

const Process = () => {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [visible, setVisible] = useState(() => !('IntersectionObserver' in window))
  const sectionRef = useRef(null)
  const paused = hovered || focused

  useEffect(() => {
    const element = sectionRef.current
    if (!element || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [visible])

  useEffect(() => {
    if (!visible || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setTimeout(() => setActive((current) => (current + 1) % steps.length), INTERVAL)
    return () => clearTimeout(timer)
  }, [active, paused, cycle, visible])

  const handleMouseLeave = () => {
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

  const selectStep = (index) => {
    setActive(index)
    setCycle((current) => current + 1)
  }

  return (
    <section id="process" ref={sectionRef} className="bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 pb-[clamp(56px,7.5vw,108px)] pt-[clamp(64px,7.2vw,104px)] sm:px-8 lg:px-12 xl:px-20">
        <SectionTitle className="text-balance text-center">
          From Concept to Delivery,
          <br className="hidden sm:block" />
          {' '}We Make it <span className="text-brand">Happen</span>
        </SectionTitle>

        <p className="mx-auto mt-6 max-w-[460px] text-center text-base leading-snug text-body">
          A proven process built around collaboration, precision and a commitment to quality at every step.
        </p>

        <div className="mt-[clamp(40px,6.4vw,92px)] grid grid-cols-1 gap-y-12 lg:grid-cols-[415px_1fr]">
          <ol
            className="m-0 list-none p-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {steps.map((step, index) => {
              const isActive = index === active
              const isDone = index < active
              const isLast = index === steps.length - 1

              return (
                <li
                  key={step.title}
                  className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                  style={{ transitionDelay: visible ? `${index * STAGGER}ms` : '0ms' }}
                >
                  <button
                    type="button"
                    onClick={() => selectStep(index)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`group flex w-full gap-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${isLast ? '' : 'min-h-[clamp(112px,9.4vw,135px)]'}`}
                  >
                    <span className="flex shrink-0 flex-col items-center">
                      <span className={`grid h-14 w-14 place-items-center rounded-full border border-dotted font-display text-lg transition-colors duration-500 motion-reduce:transition-none ${isActive ? 'border-brand text-brand' : isDone ? 'border-brand text-body' : 'border-black/35 text-body'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {!isLast && (
                        <span aria-hidden="true" className="relative w-0 flex-1 border-l border-dotted border-black/25">
                          {isDone && <span className="absolute -left-px top-0 h-full border-l border-dotted border-brand" />}
                          {isActive && (
                            <span
                              key={`${active}-${cycle}`}
                              className="absolute -left-px top-0 border-l border-dotted border-brand motion-reduce:hidden"
                              style={{ animation: `process-progress ${INTERVAL}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                            />
                          )}
                        </span>
                      )}
                    </span>

                    <span className="mt-[15px] block max-w-[330px]">
                      <span className={`block font-display text-[clamp(20px,1.74vw,25px)] font-semibold leading-none transition-colors duration-500 motion-reduce:transition-none ${isActive ? 'text-brand' : 'text-ink group-hover:text-brand'}`}>
                        {step.title}
                      </span>
                      <span className="mt-[18px] block text-base leading-snug text-body">
                        {step.text}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex flex-col justify-between gap-10">
            <div
              className={`relative mx-auto aspect-[8/7] w-full max-w-[520px] transition-opacity duration-700 ease-out motion-reduce:opacity-100 motion-reduce:transition-none lg:w-[34vw] ${visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: visible ? `${steps.length * STAGGER}ms` : '0ms' }}
            >
              {steps.map((step, index) => (
                <img
                  key={step.image}
                  src={step.image}
                  alt={index === active ? `Illustration for step ${index + 1}: ${step.title}` : ''}
                  aria-hidden={index !== active}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out motion-reduce:transition-none ${index === active ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>

            <div className="flex justify-end">
              <ScrollDown href="#projects" className="text-ink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process