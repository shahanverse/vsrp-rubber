
// import the reusable video, button and heading
import AutoVideo from '../components/AutoVideo'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

// the background video from the public folder (change to your real file name)
const VIDEO_SRC = '/videos/capabilities.mp4'

// Products is the full-screen video banner under Capabilities
const Products = () => (
  // id="products" is what the navbar link scrolls to; height is 872px at 1440px wide and scales between 520px and 872px; content is centered both ways
  <section id="products" className="relative isolate flex min-h-[clamp(520px,60.5vw,872px)] items-center justify-center overflow-hidden bg-black px-5 py-20 text-center sm:px-8">
    {/* background video, behind everything */}
    <AutoVideo src={VIDEO_SRC} className="absolute inset-0 -z-20 h-full w-full object-cover" />
    {/* dark layer on top of the video so the white heading stays readable */}
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35" />

    {/* heading and button stacked in the center; the gap is 52px at 1440px and shrinks on smaller screens */}
    <div className="flex max-w-[900px] flex-col items-center gap-[clamp(28px,3.6vw,52px)]">
      {/* big white heading, balanced so it wraps evenly on phones */}
      <SectionTitle size="xl" tone="light" className="text-balance">
        {/* first line */}
        Whatever You Need in
        {/* forced line break from 768px up so the heading breaks after "in" like the design */}
        <br className="hidden md:block" />
        {/* a space so the words do not touch when the break is hidden */}
        {' '}Rubber, We Can <span className="text-brand">Shape It.</span>
      </SectionTitle>

      {/* translucent button with the roll-up animation; change the href to the section you want it to open */}
      <Button href="#product-categories" variant="glass">
        See product categories
      </Button>
    </div>
  </section>
)

// export so App.jsx can import it
export default Products