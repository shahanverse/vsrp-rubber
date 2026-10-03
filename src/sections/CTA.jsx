import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const IMAGE_SRC = '/images/cta-bg.png'

const CTA = () => (
  <section id="contact" className="relative isolate overflow-hidden bg-black text-white">
    <img src={IMAGE_SRC} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_20%] grayscale" />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/10 lg:bg-gradient-to-r lg:from-black/45 lg:via-black/20 lg:to-black/45" />

    <div className="mx-auto flex min-h-[clamp(520px,42.4vw,610px)] max-w-[1440px] items-start px-5 pb-16 pt-[clamp(64px,7vw,100px)] sm:px-8 lg:px-12 xl:px-20">
      <div className="grid w-full grid-cols-1 gap-y-8 lg:grid-cols-[2.107fr_1fr] lg:gap-y-0">
        <SectionTitle tone="light">
          VSRP are
          <br />
          furthering quality
          <br />
          in <span className="text-brand">our industries</span>
          <span className="text-white/30">.</span>
        </SectionTitle>

        <div>
          <p className="max-w-[380px] text-sm leading-[21px] text-white/90">
            Across private, commercial and civil projects, our rubber products are custom-engineered to be reliable and cost-effective. We support the specific needs of specialised providers, plugging the gaps in their projects so they can continue to deliver at the highest level.
          </p>
          <div className="mt-[clamp(28px,3vw,44px)]">
            <Button href="#contact">Contact us</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
)
 
export default CTA