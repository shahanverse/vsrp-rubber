import AutoVideo from '../components/AutoVideo'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const VIDEO_SRC = '/videos/capabilities.mp4'

const Products = () => (
  <section id="products" className="relative isolate flex min-h-[clamp(520px,60.5vw,872px)] items-center justify-center overflow-hidden bg-black px-5 py-20 text-center sm:px-8">
    <AutoVideo src={VIDEO_SRC} className="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35" />

    <div className="flex max-w-[900px] flex-col items-center gap-[clamp(28px,3.6vw,52px)]">
      <SectionTitle size="xl" tone="light" className="text-balance">
        Whatever You Need in
        <br className="hidden md:block" />
        {' '}Rubber, We Can <span className="text-brand">Shape It.</span>
      </SectionTitle>

      <Button href="#product-categories" variant="glass">
        See product categories
      </Button>
    </div>
  </section>
)

export default Products