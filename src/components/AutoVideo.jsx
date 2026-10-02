// import the React hooks we need to control the video
import { useEffect, useRef } from 'react'

// AutoVideo is a silent, looping, autoplaying video that works reliably in React
const AutoVideo = ({ src, className = '', preload = 'metadata' }) => {
  // ref gives us direct access to the <video> element
  const videoRef = useRef(null)

  // run after the first render, and again if the video file changes
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
      console.error('Video could not play:', error)
    })
    // re-run when the file changes
  }, [src])

  // return the video element
  return (
    <video
      // lets the effect above control the video
      ref={videoRef}
      // sizing and position come from the parent
      className={className}
      // start playing automatically
      autoPlay
      // browsers only allow autoplay when muted
      muted
      // repeat forever
      loop
      // stops iPhones from opening the video fullscreen
      playsInline
      // how much to download before playing (metadata keeps below-the-fold videos light)
      preload={preload}
      // decorative video, hide from screen readers
      aria-hidden="true"
    >
      {/* the video file from the public folder */}
      <source src={src} type="video/mp4" />
    </video>
  )
}

// export so sections can import it
export default AutoVideo