// Fragment lets us return a stat and the divider together without an extra wrapper element
import { Fragment } from 'react'
// import the reusable button
import Button from '../components/Button'
// import the reusable heading
import SectionTitle from '../components/SectionTitle'

// the four numbers shown on the left; the orange + is added in the markup
const stats = [
  // number and its caption
  { value: '20', label: 'Years of experience' },
  // second stat
  { value: '122K', label: 'Ventilation tube joins' },
  // third stat
  { value: '5M', label: 'Rubber seals supplied' },
  // fourth stat
  { value: '450K', label: 'Traffic light seals' },
]

// About is the section right under the hero
const About = () => (
  // id="about" is what the navbar and hero links scroll to; relative + isolate + overflow-hidden keep the shapes inside
  <section id="about" className="relative isolate overflow-hidden bg-surface">
    {/* decorative slanted shapes in the bottom right corner; decorative only, so hidden from screen readers and not clickable */}
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 -z-10 aspect-[420/250] w-[clamp(180px,29vw,420px)]">
      {/* large pale grey slanted shape */}
      <div className="absolute inset-0 bg-black/[0.04] [clip-path:polygon(28.6%_33%,61.2%_33%,34%_100%,1.9%_100%)]" />
      {/* thin lighter grey stripe next to it */}
      <div className="absolute inset-0 bg-black/[0.03] [clip-path:polygon(61.2%_33%,70%_33%,42%_100%,34%_100%)]" />
      {/* soft orange slanted band */}
      <div className="absolute inset-0 bg-brand/20 [clip-path:polygon(72.9%_1.2%,100%_1.2%,68.6%_75.6%,55.7%_75.6%)]" />
    </div>

    {/* one column on phones and tablets; from 1024px two columns split 1.36 : 1 with no gap, so the right column starts at 818px on a 1440px screen like Figma */}
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.36fr_1fr] lg:gap-x-0 lg:px-12 lg:py-[clamp(64px,7.4vw,104px)] xl:px-20">
      {/* left column: no width cap, so the heading has room for its two lines */}
      <div className="w-full">
        {/* large heading with the orange highlight */}
        <SectionTitle>
          {/* first line */}
          Wherever Precision Is
          {/* forced line break from 640px up, so the heading breaks after "Is" like the design */}
          <br className="hidden sm:block" />
          {/* a space so the words do not touch when the break is hidden on phones */}
          {' '}Needed, <span className="text-brand">VSRP Delivers.</span>
        </SectionTitle>

        {/* numbers grid: 522px wide at most (36.25vw on desktop); two equal columns on phones, a 62% / 38% split from 640px up */}
        <div className="mt-[clamp(40px,4.2vw,60px)] grid w-full max-w-[522px] grid-cols-2 gap-x-6 gap-y-[30px] sm:grid-cols-[62%_1fr] sm:gap-x-0 lg:w-[36.25vw]">
          {/* loop over the stats; index tells us when to insert the divider */}
          {stats.map((stat, index) => (
            // key helps React track each item
            <Fragment key={stat.label}>
              {/* one stat block */}
              <div>
                {/* big number, regular weight, with a bold orange plus */}
                <p className="font-display text-[clamp(36px,3.33vw,48px)] font-normal leading-none text-ink">
                  {/* the number */}
                  {stat.value}
                  {/* orange plus sign */}
                  <span className="font-semibold text-brand">+</span>
                </p>
                {/* caption under the number, 12px below it */}
                <p className="mt-3 text-base leading-tight text-body">{stat.label}</p>
              </div>
              {/* after the second stat, add the dotted line that spans both columns */}
              {index === 1 && <div aria-hidden="true" className="col-span-2 border-t border-dotted border-black/25" />}
            </Fragment>
          ))}
        </div>
      </div>

      {/* right column: sub heading, two paragraphs and the button, 508px wide at most */}
       <div className="flex w-full max-w-[508px] flex-col">
        {/* sub heading as h3 because the left heading is the h2 */}
        <SectionTitle as="h3" size="md">
          {/* first line */}
          We're engineers, manufacturers
          {/* forced line break from 640px up */}
          <br className="hidden sm:block" />
          {/* a space so the words do not touch when the break is hidden on phones */}
          {' '}and problem-solvers.
        </SectionTitle>

        {/* first paragraph: 16px, soft dark grey, tight line height */}
        <p className="mt-8 text-base leading-snug text-body lg:mt-12">
          Whether you need a custom seal, a specialised extrusion, a bonded rubber component or a completely new product, we'll work with you to find the right solution.
        </p>
        {/* second paragraph, 22px below the first */}
        <p className="mt-[22px] text-base leading-snug text-body">
          We've been doing it for more than two decades, helping businesses across Australia keep projects moving.
        </p>

        {/* button wrapper adds the space above the button */}
              <div className="mt-10 lg:mt-auto lg:pt-10">
          {/* light variant button with the roll-up animation */}
          <Button href="#about" variant="light">
            About VSRP
          </Button>
        </div>
      </div>
    </div>
  </section>
)

// export so App.jsx can import it
export default About