// import the React hooks we need for the video
import { useEffect, useRef } from 'react'
// import the reusable heading
import SectionTitle from '../components/SectionTitle'
// import the reusable scroll down link
import ScrollDown from '../components/ScrollDown'

// the V-shaped file you exported from Figma (change to .png if you exported a PNG)
const MASK_SRC = '/images/v-mask.svg'
// the video that plays inside the V (change to your real file name)
const VIDEO_SRC = '/videos/capabilities.mp4'

// CSS mask: the video is only visible where the V image is not transparent
const maskStyle = {
  // Safari and Chrome version of the mask image
  WebkitMaskImage: `url(${MASK_SRC})`,
  // standard version of the mask image
  maskImage: `url(${MASK_SRC})`,
  // draw the mask once, not tiled
  WebkitMaskRepeat: 'no-repeat',
  // standard version
  maskRepeat: 'no-repeat',
  // keep the mask in the center of its box
  WebkitMaskPosition: 'center',
  // standard version
  maskPosition: 'center',
  // scale the mask to fit inside the box without cropping
  WebkitMaskSize: 'contain',
  // standard version
  maskSize: 'contain',
  
  clipPath: 'inset(2px)',
}

// Capabilities is the white section under About
const Capabilities = () => {
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
      console.error('Capabilities video could not play:', error)
    })
    // empty array means this runs only once
  }, [])

  // return the section
  return (
    // centered text on a white background; top and bottom space scale with the screen (150px and 108px at 1440px wide)
    <section id="capabilities" className="bg-white px-5 pb-[clamp(56px,7.5vw,108px)] pt-[clamp(72px,10.4vw,150px)] text-center sm:px-8">
      {/* heading, balanced so it wraps evenly on small screens */}
      <SectionTitle className="text-balance">
        {/* normal words */}
        What Can We Help You{' '}
        {/* orange highlighted word */}
        <span className="text-brand">Build?</span>
      </SectionTitle>

      {/* subtitle: 16px, centered, 24px under the heading, 800px wide at most */}
      <p className="mx-auto mt-6 max-w-[800px] text-base text-body">
        We work with you to design, engineer and manufacture rubber solutions that meet your exact requirements.
      </p>

      {/* V-shaped window: 368px wide at 1440px; the aspect ratio matches the design (644 x 514) */}
      <div
        // the picture is decorative, so one short description for screen readers
        role="img"
        // description read by screen readers
        aria-label="VSRP logo mark with rubber texture"
        // centered, gap above scales with the screen (97px at 1440px), width grows with the screen and stops at 368px
        className="mx-auto mt-[clamp(40px,6.7vw,97px)] aspect-[644/514] w-[clamp(240px,40vw,368px)] lg:w-[min(25.6vw,368px)]"
        // apply the V mask
        style={maskStyle}
      >
        <video
          // lets the effect above control the video
          ref={videoRef}
          // fill the V window and crop instead of stretching
          className="h-full w-full object-cover"
          // start playing automatically
          autoPlay
          // browsers only allow autoplay when muted
          muted
          // repeat forever
          loop
          // stops iPhones from opening the video fullscreen
          playsInline
          // this section is below the fold, so load only the basics first
          preload="metadata"
          // decorative video, hide from screen readers
          aria-hidden="true"
        >
          {/* the video file from the public folder */}
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      {/* space above the scroll down link scales with the screen (66px at 1440px) */}
      <div className="mt-[clamp(32px,4.6vw,66px)]">
        {/* dark version of the scroll down link; it scrolls to the next section */}
        <ScrollDown href="#industries" className="text-ink" />
      </div>
    </section>
  )
}

// export so App.jsx can import it
export default Capabilities