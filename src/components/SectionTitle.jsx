const sizes = {
  xl: 'text-[clamp(32px,7vw,68px)] lg:text-[clamp(44px,4.72vw,68px)]',
  lg: 'text-[clamp(30px,3.61vw,52px)]',
  md: 'text-[clamp(24px,2.22vw,32px)]',
  sm: 'text-[clamp(20px,1.74vw,25px)]',
}

const tones = {
  dark: 'text-ink',
  light: 'text-white',
}

const SectionTitle = ({ as: Tag = 'h2', size = 'lg', tone = 'dark', className = '', children }) => (
  <Tag className={`font-display font-semibold leading-none ${tones[tone]} ${sizes[size]} ${className}`}>
    {children}
  </Tag>
)

export default SectionTitle