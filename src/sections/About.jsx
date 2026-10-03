import { Fragment } from 'react'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const stats = [
  { value: '20', label: 'Years of experience' },
  { value: '122K', label: 'Ventilation tube joins' },
  { value: '5M', label: 'Rubber seals supplied' },
  { value: '450K', label: 'Traffic light seals' },
]

const About = () => (
  <section id="about" className="relative isolate overflow-hidden bg-surface">
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 -z-10 aspect-[420/250] w-[clamp(180px,29vw,420px)]">
      <div className="absolute inset-0 bg-black/[0.04] [clip-path:polygon(28.6%_33%,61.2%_33%,34%_100%,1.9%_100%)]" />
      <div className="absolute inset-0 bg-black/[0.03] [clip-path:polygon(61.2%_33%,70%_33%,42%_100%,34%_100%)]" />
      <div className="absolute inset-0 bg-brand/20 [clip-path:polygon(72.9%_1.2%,100%_1.2%,68.6%_75.6%,55.7%_75.6%)]" />
    </div>

    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.36fr_1fr] lg:gap-x-0 lg:px-12 lg:py-[clamp(64px,7.4vw,104px)] xl:px-20">
      <div className="w-full">
        <SectionTitle>
          Wherever Precision Is
          <br className="hidden sm:block" />
          {' '}Needed, <span className="text-brand">VSRP Delivers.</span>
        </SectionTitle>

        <div className="mt-[clamp(40px,4.2vw,60px)] grid w-full max-w-[522px] grid-cols-2 gap-x-6 gap-y-[30px] sm:grid-cols-[62%_1fr] sm:gap-x-0 lg:w-[36.25vw]">
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              <div>
                <p className="font-display text-[clamp(36px,3.33vw,48px)] font-normal leading-none text-ink">
                  {stat.value}
                  <span className="font-semibold text-brand">+</span>
                </p>
                <p className="mt-3 text-base leading-tight text-body">{stat.label}</p>
              </div>
              {index === 1 && <div aria-hidden="true" className="col-span-2 border-t border-dotted border-black/25" />}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="flex w-full max-w-[508px] flex-col">
        <SectionTitle as="h3" size="md">
          We're engineers, manufacturers
          <br className="hidden sm:block" />
          {' '}and problem-solvers.
        </SectionTitle>

        <p className="mt-8 text-base leading-snug text-body lg:mt-12">
          Whether you need a custom seal, a specialised extrusion, a bonded rubber component or a completely new product, we'll work with you to find the right solution.
        </p>
        <p className="mt-[22px] text-base leading-snug text-body">
          We've been doing it for more than two decades, helping businesses across Australia keep projects moving.
        </p>

        <div className="mt-10 lg:mt-auto lg:pt-10">
          <Button href="#about" variant="light">
            About VSRP
          </Button>
        </div>
      </div>
    </div>
  </section>
)
 
export default About