// heading sizes that scale with the screen width: xl = 32px to 68px, lg = 30px to 52px, md = 24px to 32px
const sizes = {
  // extra large heading used on full-screen banners (68px at 1440px wide)
  xl: 'text-[clamp(32px,7vw,68px)] lg:text-[clamp(44px,4.72vw,68px)]',
  // large section heading (left side of the About section)
  lg: 'text-[clamp(30px,3.61vw,52px)]',
  // medium sub heading (right side of the About section)
  md: 'text-[clamp(24px,2.22vw,32px)]',
  sm: 'text-[clamp(20px,1.74vw,25px)]',
}

// text colors: dark for light backgrounds, light for photos and videos
const tones = {
  // near-black ink color
  dark: 'text-ink',
  // plain white
  light: 'text-white',
}

// SectionTitle renders a heading; "as" picks the tag, "size" picks the size, "tone" picks the color
const SectionTitle = ({ as: Tag = 'h2', size = 'lg', tone = 'dark', className = '', children }) => (
  // semi bold, 100% line height, plus the chosen color, size and any extra classes
  <Tag className={`font-display font-semibold leading-none ${tones[tone]} ${sizes[size]} ${className}`}>
    {/* the heading content, which can include orange <span> highlights */}
    {children}
  </Tag>
)

// export so sections can import it
export default SectionTitle