import { useEffect, useRef } from 'react'

const AutoVideo = ({ src, className = '', preload = 'metadata' }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch((error) => {
      console.error('Video could not play:', error)
    })
  }, [src])

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

export default AutoVideo