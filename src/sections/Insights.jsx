import ArrowIcon from '../components/ArrowIcon'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const articles = [
  {
    title: 'Understanding Rubber Compounds: Choosing The Right Material...',
    image: '/images/insight-1.jpg',
    alt: 'Coils and strips of black rubber stacked together',
    href: '#',
  },
  {
    title: 'Understanding Rubber Compounds: Choosing The Right Material...',
    image: '/images/insight-2.jpg',
    alt: 'Used tyres moving along a conveyor inside a recycling plant',
    href: '#',
  },
  {
    title: 'Understanding Rubber Compounds: Choosing The Right Material...',
    image: '/images/insight-3.jpg',
    alt: 'Rows of blue rubber rolls',
    href: '#',
  },
]

const Insights = () => (
  <section id="insights" className="bg-surface">
    <div className="mx-auto max-w-[1440px] px-5 pb-[clamp(56px,7.5vw,108px)] pt-[clamp(64px,7.4vw,106px)] sm:px-8 lg:px-12 xl:px-20">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionTitle>
            Industry{' '}
            <span className="text-brand">Insights</span>
          </SectionTitle>
          <p className="mt-6 max-w-[400px] text-base leading-snug text-body">
            Practical advice, material expertise and engineering knowledge to help you make informed decisions
          </p>
        </div>
        <div className="sm:pb-4">
          <Button href="#insights" variant="light">
            View all insights
          </Button>
        </div>
      </div>

      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
        {articles.map((article, index) => (
          <li key={`${article.image}-${index}`}>
            <a href={article.href} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
              <div className="aspect-[413/284] overflow-hidden bg-night">
                <img
                  src={article.image}
                  alt={article.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:grayscale motion-reduce:transition-none"
                />
              </div>

              <div className="mt-2.5 bg-white p-4 pb-6 lg:p-5 lg:pb-8">
                <SectionTitle as="h3" size="sm" className="line-clamp-2 !leading-[1.5]">
                  {article.title}
                </SectionTitle>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium uppercase leading-5 text-brand">
                  <span className="underline decoration-dotted underline-offset-[5px]">View detail</span>
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

export default Insights