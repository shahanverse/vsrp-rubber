import { useState } from 'react'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const SAMPLE_ANSWER =
  'At VSRP, we know rubber. Across any application, our experts are well equipped to advise on the best make and material for your rubber products. If you need reliable performance, we can show you exactly how to get it. All you need to do is give us a call.'

const faqs = [
  { question: 'What type of rubber should I use?', answer: SAMPLE_ANSWER },
  { question: 'What is the hardness scale for rubber?', answer: SAMPLE_ANSWER },
  { question: 'What are minimum order quantities?', answer: SAMPLE_ANSWER },
  { question: 'How can I get a quote?', answer: SAMPLE_ANSWER },
  { question: 'Which materials types do VSRP offer?', answer: SAMPLE_ANSWER },
  { question: 'Can VSRP source products & materials?', answer: SAMPLE_ANSWER },
]

const FAQ = () => {
  const [open, setOpen] = useState(0)

  const toggle = (index) => {
    setOpen((current) => (current === index ? null : index))
  }

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-white [--gutter:20px] sm:[--gutter:32px] lg:[--gutter:48px] xl:[--gutter:80px]">
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 -z-10 hidden aspect-[360/220] w-[clamp(160px,30.5vw,439px)] sm:block">
        <div className="absolute inset-0 bg-black/[0.04] [clip-path:polygon(0%_0%,1.4%_0%,40%_100%,0%_100%)]" />
        <div className="absolute inset-0 bg-brand/20 [clip-path:polygon(2.8%_0%,14.4%_0%,44.4%_70%,32.5%_70%)]" />
        <div className="absolute inset-0 bg-black/[0.04] [clip-path:polygon(30.6%_30%,37.8%_30%,66.7%_100%,59.7%_100%)]" />
        <div className="absolute inset-0 bg-black/[0.04] [clip-path:polygon(38.9%_30%,70%_30%,99.4%_100%,68.6%_100%)]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-[clamp(56px,7.5vw,108px)] pt-[clamp(64px,7.4vw,107px)]">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[0.88fr_1fr]">
          <div>
            <SectionTitle>
              Frequently Asked
              <br />
              <span className="text-brand">Questions</span>
            </SectionTitle>
            <p className="mt-6 max-w-[400px] text-base leading-snug text-body">
              We've heard it all. Here's everything you need to know before working with us.
            </p>
            <div className="mt-[clamp(32px,3.9vw,56px)]">
              <Button href="#contact">Ask a question</Button>
            </div>
          </div>

          <ul
            className="m-0 list-none p-0 lg:-mt-5"
            style={{ '--row': 'clamp(20px,2.3vw,33px)', '--gap': 'clamp(14px,1.67vw,24px)' }}
          >
            {faqs.map((item, index) => {
              const isOpen = open === index
              return (
                <li
                  key={item.question}
                  className={`border-b border-dotted pb-[calc(var(--row)_-_var(--gap))] transition-colors duration-300 motion-reduce:transition-none ${isOpen ? 'border-brand' : 'border-black/20'}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    className="group flex w-full items-center justify-between gap-6 pb-[var(--gap)] pt-[var(--row)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span className="font-display text-[clamp(16px,1.39vw,20px)] font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
                      {item.question}
                    </span>
                    <span aria-hidden="true" className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-dotted border-brand sm:h-8 sm:w-8">
                      <span className="absolute h-px w-3.5 bg-brand" />
                      <span className={`absolute h-3.5 w-px bg-brand transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-[520px] pb-[var(--gap)] text-sm leading-[22px] text-black/55">{item.answer}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FAQ