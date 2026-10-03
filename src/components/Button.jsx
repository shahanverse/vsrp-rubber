import ArrowIcon from './ArrowIcon'

const styles = {
  primary: { wrapper: 'bg-brand text-white', circle: 'bg-white text-brand' },
  glass: { wrapper: 'bg-white/20 text-white ring-1 ring-white/20 backdrop-blur-sm', circle: 'bg-brand text-white' },
  light: { wrapper: 'bg-black/[0.08] text-ink ring-1 ring-black/5', circle: 'bg-brand text-white' },
}

const slide = 'transition-transform duration-300 ease-out motion-reduce:transition-none'

const Button = ({ href = '#', variant = 'primary', children }) => {
  const s = styles[variant]

  return (
    <a
      href={href}
      className={`group inline-flex h-12 items-center gap-4 rounded-full pl-4 pr-1 text-[13px] font-semibold uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-14 sm:gap-5 sm:pl-5 sm:text-sm ${s.wrapper}`}
    >
      <span className="relative overflow-hidden whitespace-nowrap">
        <span className={`block group-hover:-translate-y-full group-focus-visible:-translate-y-full ${slide}`}>
          {children}
        </span>
        <span
          aria-hidden="true"
          className={`absolute left-0 top-0 block translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 ${slide}`}
        >
          {children}
        </span>
      </span>

      <span className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full sm:h-12 sm:w-12 ${s.circle}`}>
        <span className={`absolute inset-0 grid place-items-center group-hover:-translate-y-full group-focus-visible:-translate-y-full ${slide}`}>
          <ArrowIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-0 grid translate-y-full place-items-center group-hover:translate-y-0 group-focus-visible:translate-y-0 ${slide}`}
        >
          <ArrowIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
      </span>
    </a>
  )
}

export default Button