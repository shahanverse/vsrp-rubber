// two heading sizes that scale with the screen width: lg = 30px to 52px, md = 24px to 32px
const sizes = {
  // large section heading (left side of the About section)
  lg: 'text-[clamp(30px,3.61vw,52px)]',
  // medium sub heading (right side of the About section)
  md: 'text-[clamp(24px,2.22vw,32px)]',
}

// SectionTitle renders a heading; "as" picks the tag, "size" picks lg or md
const SectionTitle = ({ as: Tag = 'h2', size = 'lg', className = '', children }) => (
  // semi bold, 100% line height, dark ink color, plus the chosen size and any extra classes
  <Tag className={`font-display font-semibold leading-none text-ink ${sizes[size]} ${className}`}>
    {/* the heading content, which can include orange <span> highlights */}
    {children}
  </Tag>
)

// export so sections can import it
export default SectionTitle