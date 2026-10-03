// import the arrow used in the "View detail" link
import ArrowIcon from '../components/ArrowIcon'
// import the reusable button and heading
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

// the article cards; copy one object to add more
const articles = [
  {
    // card title, exactly as in the design
    title: 'Understanding Rubber Compounds: Choosing The Right Material...',
    // photo inside public/images (change to your real file name)
    image: '/images/insight-1.jpg',
    // description of the photo for screen readers
    alt: 'Coils and strips of black rubber stacked together',
    // where the card goes when clicked
    href: '#',
  },
  {
    // second card
    title: 'Understanding Rubber Compounds: Choosing The Right Material...',
    // photo
    image: '/images/insight-2.jpg',
    // photo description
    alt: 'Used tyres moving along a conveyor inside a recycling plant',
    // link
    href: '#',
  },
  {
    // third card
    title: 'Understanding Rubber Compounds: Choosing The Right Material...',
    // photo
    image: '/images/insight-3.jpg',
    // photo description
    alt: 'Rows of blue rubber rolls',
    // link
    href: '#',
  },
]

// Insights is the light grey section with the heading and three article cards
const Insights = () => (
  // id="insights" is what the navbar link scrolls to; same pale background as the About section
  <section id="insights" className="bg-surface">
    {/* page container: top space 106px and bottom space 108px at 1440px wide, side padding like the other sections */}
    <div className="mx-auto max-w-[1440px] px-5 pb-[clamp(56px,7.5vw,108px)] pt-[clamp(64px,7.4vw,106px)] sm:px-8 lg:px-12 xl:px-20">
      {/* top row: heading and text on the left, "View all insights" button on the right, lined up with the bottom of the text */}
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        {/* left block: heading and intro text */}
        <div>
          {/* large heading with the orange last word */}
          <SectionTitle>
            {/* normal word */}
            Industry{' '}
            {/* orange highlighted word */}
            <span className="text-brand">Insights</span>
          </SectionTitle>
          {/* intro text, 16px, 24px under the heading, 400px wide so it wraps after "engineering" like the design */}
          <p className="mt-6 max-w-[400px] text-base leading-snug text-body">
            Practical advice, material expertise and engineering knowledge to help you make informed decisions
          </p>
        </div>
        {/* button wrapper: lifts the button 16px above the bottom of the text on desktop */}
        <div className="sm:pb-4">
          {/* light button with the roll-up animation; change the href to your insights page */}
          <Button href="#insights" variant="light">
            View all insights
          </Button>
        </div>
      </div>

      {/* card list: one column on phones, three equal columns from 768px, 20px gap; 40px under the top row */}
      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
        {/* loop over the articles */}
        {articles.map((article, index) => (
          // key helps React track each card
          <li key={`${article.image}-${index}`}>
            {/* the whole card is one link; "group" lets the photo and the arrow react to hover */}
            <a href={article.href} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
              {/* photo frame: 413 x 284 at 1440px wide, the same shape at every size */}
              <div className="aspect-[413/284] overflow-hidden bg-night">
                {/* the photo: fills the frame and fades to black and white while the card is hovered */}
                <img
                  // photo file from public/images
                  src={article.image}
                  // description for screen readers
                  alt={article.alt}
                  // only the cards that start on screen can be lazy later; all three are below the fold, so load them when needed
                  loading="lazy"
                  // fill the frame, crop instead of stretch, colour change takes 700ms
                  className="h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:grayscale motion-reduce:transition-none"
                />
              </div>

              {/* white text box: 10px under the photo, 20px padding on the sides and top, 32px at the bottom (16px on small tablets) */}
              <div className="mt-2.5 bg-white p-4 pb-6 lg:p-5 lg:pb-8">
                {/* card title as h3 because the section heading is the h2; at most two lines, then an ellipsis */}
                <SectionTitle as="h3" size="sm" className="line-clamp-2 !leading-[1.5]">
                  {/* title text */}
                  {article.title}
                </SectionTitle>
                {/* "View detail" label: orange, 13px uppercase, 20px under the title */}
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium uppercase leading-5 text-brand">
                  {/* only the text gets the dotted underline */}
                  <span className="underline decoration-dotted underline-offset-[5px]">View detail</span>
                  {/* small arrow that nudges right on hover */}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

// export so App.jsx can import it
export default Insights