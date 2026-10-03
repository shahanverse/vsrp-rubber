import ScrollDown from '../components/ScrollDown'
import { useEffect, useRef } from 'react'
import Button from '../components/Button'
import ArrowIcon from '../components/ArrowIcon'

const content = {
  titleLeft: ['Custom Rubber', 'Solutions'],
  titleRight: ['Engineered To', 'Perform'],
  description:
    "For more than 20 years, we've helped Australian businesses solve problems with engineered rubber solutions. From design and tooling to manufacturing and delivery, we make what you need, when you need it.",
}

const Title = ({ as: Tag = 'h2', lines, align }) => (
  <Tag className={`font-display font-semibold leading-none text-[clamp(40px,11vw,72px)] lg:text-[clamp(52px,5.69vw,82px)] ${align}`}>
    <span className="block">{lines[0]}</span>
    <span className="block">
      {lines[1]}
      <span className="text-brand">.</span>
    </span>
  </Tag>
)

const Hero = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch((error) => {
      console.error('Hero video could not play:', error)
    })
  }, [])

  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-6 px-5 pb-36 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-0 lg:px-12 lg:pt-[clamp(180px,18.1vw,261px)] xl:px-20">
        <Title as="h1" lines={content.titleLeft} align="text-left lg:text-right" />
        <div className="lg:mt-[min(11.1vw,160px)]">
          <Title as="h2" lines={content.titleRight} align="text-left" />
        </div>

        <p className="max-w-[420px] text-base leading-snug text-white/85 lg:mt-1">{content.description}</p>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:gap-x-10 lg:pt-[38px]">
          <Button href="#contact" variant="glass">
            Discuss your project
          </Button>
          <a
            href="#about"
            className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase transition hover:text-brand focus-visible:outline-2 focus-visible:outline-white"
          >
            <span className="underline decoration-dotted underline-offset-[6px]">See what we do</span>
            <ArrowIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <ScrollDown href="#about" className="absolute bottom-8 left-5 text-white sm:bottom-10 sm:left-8 lg:bottom-[72px] lg:left-12 xl:left-20" />
    </section>
  )
}

export default Hero