import SectionTitle from '../components/SectionTitle'

const cards = [
  {
    title: 'We Engineer Solutions.',
    text: 'Custom products designed around your exact requirements.',
    icon: ['M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5', 'M9 18h6', 'M10 22h4', 'm9.5 8 2 2 3.5-3.5'],
  },
  {
    title: 'We Know Rubber.',
    text: 'Material expertise backed by 20+ years of industry experience.',
    icon: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  },
  {
    title: 'We Deliver Confidence.',
    text: 'Quality, traceability and reliability at every stage.',
    icon: ['M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z', 'm9 12 2 2 4-4'],
  },
]

const Icon = ({ paths }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[52%] w-[52%]"
    aria-hidden="true"
  >
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
)

const WhyUs = () => (
  <section id="why-us" className="bg-surface">
    <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-[clamp(64px,7.4vw,104px)] xl:px-20">
      <div className="grid grid-cols-1 items-center gap-y-6 lg:grid-cols-[1.36fr_1fr]">
        <SectionTitle>
          More Than A
          <br />
          <span className="text-brand">Rubber Company.</span>
        </SectionTitle>
        <p className="max-w-[480px] text-base leading-snug text-body">
          We're engineers, problem-solvers and manufacturing partners, helping businesses turn unique requirements into reliable, high-performance rubber solutions.
        </p>
      </div>

      <div className="mt-[clamp(32px,3vw,44px)] grid grid-cols-1 gap-5 lg:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="group flex flex-col bg-white p-6 sm:p-8 lg:p-[clamp(24px,2.8vw,40px)]">
            <div className="grid aspect-square w-[clamp(56px,4.86vw,70px)] place-items-center rounded-full bg-brand text-black">
              <Icon paths={card.icon} />
            </div>

            <div aria-hidden="true" className="relative mt-[clamp(48px,7.36vw,106px)] border-t border-dotted border-black/25">
              <span className="absolute -top-px left-0 w-0 border-t border-dotted border-brand transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none" />
            </div>

            <SectionTitle as="h3" size="sm" className="mt-7">
              {card.title}
            </SectionTitle>
            <p className="mt-5 text-base leading-snug text-body">{card.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default WhyUs