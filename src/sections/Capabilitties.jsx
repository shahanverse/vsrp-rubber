import { useEffect, useRef } from 'react'
import SectionTitle from '../components/SectionTitle'
import ScrollDown from '../components/ScrollDown'

const MASK_SRC = '/images/v-mask.svg'
const VIDEO_SRC = '/videos/capabilities.mp4'

const maskStyle = {
  WebkitMaskImage: `url(${MASK_SRC})`,
  maskImage: `url(${MASK_SRC})`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  clipPath: 'inset(2px)',
}

const Capabilities = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch((error) => {
      console.error('Capabilities video could not play:', error)
    })
  }, [])

  return (
    <section id="capabilities" className="bg-white px-5 pb-[clamp(56px,7.5vw,108px)] pt-[clamp(72px,10.4vw,150px)] text-center sm:px-8">
      <SectionTitle className="text-balance">
        What Can We Help You{' '}
        <span className="text-brand">Build?</span>
      </SectionTitle>

      <p className="mx-auto mt-6 max-w-[800px] text-base text-body">
        We work with you to design, engineer and manufacture rubber solutions that meet your exact requirements.
      </p>

      <div
        role="img"
        aria-label="VSRP logo mark with rubber texture"
        className="mx-auto mt-[clamp(40px,6.7vw,97px)] aspect-[644/514] w-[clamp(240px,40vw,368px)] lg:w-[min(25.6vw,368px)]"
        style={maskStyle}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      <div className="mt-[clamp(32px,4.6vw,66px)]">
        <ScrollDown href="#industries" className="text-ink" />
      </div>
    </section>
  )
}

export default Capabilities