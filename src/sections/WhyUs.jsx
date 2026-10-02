// import the reusable heading
import SectionTitle from '../components/SectionTitle'

// the three cards; "icon" holds the SVG path shapes for each icon
const cards = [
  {
    // card title
    title: 'We Engineer Solutions.',
    // card description
    text: 'Custom products designed around your exact requirements.',
    // lightbulb with a check mark
    icon: ['M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5', 'M9 18h6', 'M10 22h4', 'm9.5 8 2 2 3.5-3.5'],
  },
  {
    // card title
    title: 'We Know Rubber.',
    // card description
    text: 'Material expertise backed by 20+ years of industry experience.',
    // group of people
    icon: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  },
  {
    // card title
    title: 'We Deliver Confidence.',
    // card description
    text: 'Quality, traceability and reliability at every stage.',
    // badge with a check mark
    icon: ['M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z', 'm9 12 2 2 4-4'],
  },
]

// Icon draws one icon from a list of path shapes; it fills about half of its circle
const Icon = ({ paths }) => (
  <svg
    // 24x24 drawing area
    viewBox="0 0 24 24"
    // no fill, we only draw lines
    fill="none"
    // line color follows the parent's text color (black)
    stroke="currentColor"
    // line thickness
    strokeWidth="1.75"
    // rounded line ends
    strokeLinecap="round"
    // rounded corners where lines meet
    strokeLinejoin="round"
    // the icon takes 52% of the circle's width and height
    className="h-[52%] w-[52%]"
    // decorative icon, hidden from screen readers
    aria-hidden="true"
  >
    {/* draw every path shape of this icon */}
    {paths.map((d) => (
      // key helps React track each path
      <path key={d} d={d} />
    ))}
  </svg>
)

// WhyUs is the light grey section with three cards
const WhyUs = () => (
  // same pale background as the About section
  <section id="why-us" className="bg-surface">
    {/* page container: side padding and top and bottom space scale with the screen like the About section */}
    <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-[clamp(64px,7.4vw,104px)] xl:px-20">
      {/* top row: heading on the left, paragraph on the right; same 1.36 : 1 split as About so the paragraph lines up at 818px; vertically centered */}
      <div className="grid grid-cols-1 items-center gap-y-6 lg:grid-cols-[1.36fr_1fr]">
        {/* large heading with the orange second line */}
        <SectionTitle>
          {/* first line */}
          More Than A
          {/* the heading always breaks here, on every screen size */}
          <br />
          {/* orange second line */}
          <span className="text-brand">Rubber Company.</span>
        </SectionTitle>
        {/* paragraph, 16px, about 480px wide */}
        <p className="max-w-[480px] text-base leading-snug text-body">
          We're engineers, problem-solvers and manufacturing partners, helping businesses turn unique requirements into reliable, high-performance rubber solutions.
        </p>
      </div>

      {/* card grid: one column below 1024px, three columns from 1024px with a 20px gap */}
      <div className="mt-[clamp(32px,3vw,44px)] grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* loop over the cards */}
        {cards.map((card) => (
          // group lets the divider line react when the card is hovered; white card with square corners; padding scales with the screen
          <article key={card.title} className="group flex flex-col bg-white p-6 sm:p-8 lg:p-[clamp(24px,2.8vw,40px)]">
            {/* orange circle, 70px at 1440px wide, holding the black icon */}
            <div className="grid aspect-square w-[clamp(56px,4.86vw,70px)] place-items-center rounded-full bg-brand text-black">
              {/* the icon */}
              <Icon paths={card.icon} />
            </div>

            {/* dotted divider; the space above it is 106px at 1440px wide */}
            <div aria-hidden="true" className="relative mt-[clamp(48px,7.36vw,106px)] border-t border-dotted border-black/25">
              {/* orange dotted line that grows across the grey one when the card is hovered */}
              <span className="absolute -top-px left-0 w-0 border-t border-dotted border-brand transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none" />
            </div>

            {/* card title as h3 because the section heading is the h2 */}
            <SectionTitle as="h3" size="sm" className="mt-7">
              {/* title text */}
              {card.title}
            </SectionTitle>
            {/* card description, 16px, soft grey */}
            <p className="mt-5 text-base leading-snug text-body">{card.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

// export so App.jsx can import it
export default WhyUs