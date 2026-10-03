// import the React hook for state
import { useState } from 'react'
// import the reusable button and heading
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

// placeholder answer used until you have the real ones (this is the answer shown in the design)
const SAMPLE_ANSWER =
  'At VSRP, we know rubber. Across any application, our experts are well equipped to advise on the best make and material for your rubber products. If you need reliable performance, we can show you exactly how to get it. All you need to do is give us a call.'

// the questions and answers; replace the answer text with the real ones
const faqs = [
  // first question, open by default
  { question: 'What type of rubber should I use?', answer: SAMPLE_ANSWER },
  // second question
  { question: 'What is the hardness scale for rubber?', answer: SAMPLE_ANSWER },
  // third question
  { question: 'What are minimum order quantities?', answer: SAMPLE_ANSWER },
  // fourth question
  { question: 'How can I get a quote?', answer: SAMPLE_ANSWER },
  // fifth question (spelled exactly as in the design)
  { question: 'Which materials types do VSRP offer?', answer: SAMPLE_ANSWER },
  // sixth question
  { question: 'Can VSRP source products & materials?', answer: SAMPLE_ANSWER },
]

// FAQ is the white section with the heading on the left and the accordion on the right
const FAQ = () => {
  // index of the open question, or null when all are closed; the first one starts open like the design
  const [open, setOpen] = useState(0)

  // called when a question is clicked
  const toggle = (index) => {
    // clicking the open question closes it, clicking another one opens that one instead
    setOpen((current) => (current === index ? null : index))
  }

  // return the section
  return (
    // id="faq" so links can scroll here; relative + isolate + overflow-hidden keep the decoration inside; --gutter is the side space and matches the other sections
    <section id="faq" className="relative isolate overflow-hidden bg-white [--gutter:20px] sm:[--gutter:32px] lg:[--gutter:48px] xl:[--gutter:80px]">
      {/* decorative slanted shapes in the bottom left corner; hidden on phones, not clickable and hidden from screen readers */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 -z-10 hidden aspect-[360/220] w-[clamp(160px,30.5vw,439px)] sm:block">
        {/* pale grey wedge along the left edge */}
        <div className="absolute inset-0 bg-black/[0.04] [clip-path:polygon(0%_0%,1.4%_0%,40%_100%,0%_100%)]" />
        {/* soft orange slanted band */}
        <div className="absolute inset-0 bg-brand/20 [clip-path:polygon(2.8%_0%,14.4%_0%,44.4%_70%,32.5%_70%)]" />
        {/* thin grey stripe */}
        <div className="absolute inset-0 bg-black/[0.04] [clip-path:polygon(30.6%_30%,37.8%_30%,66.7%_100%,59.7%_100%)]" />
        {/* large pale grey band */}
        <div className="absolute inset-0 bg-black/[0.04] [clip-path:polygon(38.9%_30%,70%_30%,99.4%_100%,68.6%_100%)]" />
      </div>

      {/* page container: top space 107px and bottom space 108px at 1440px wide, scaled with the screen */}
      <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-[clamp(56px,7.5vw,108px)] pt-[clamp(64px,7.4vw,107px)]">
        {/* one column on phones and tablets; from 1024px two columns of 600px and 680px at 1440px wide */}
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[0.88fr_1fr]">
          {/* left column: heading, intro text and button */}
          <div>
            {/* large heading with the orange second line */}
            <SectionTitle>
              {/* first line */}
              Frequently Asked
              {/* the heading always breaks here, on every screen size */}
              <br />
              {/* orange second line */}
              <span className="text-brand">Questions</span>
            </SectionTitle>
            {/* intro text, 16px, 24px under the heading, 400px wide at most so it wraps after "know" like the design */}
            <p className="mt-6 max-w-[400px] text-base leading-snug text-body">
              We've heard it all. Here's everything you need to know before working with us.
            </p>
            {/* button wrapper: 56px under the intro text at 1440px wide */}
            <div className="mt-[clamp(32px,3.9vw,56px)]">
              {/* orange button with the roll-up animation; change the href when you have a contact section */}
              <Button href="#contact">Ask a question</Button>
            </div>
          </div>

          {/* right column: the accordion; the CSS variables set the row padding (33px at 1440px) and the gap above an answer (24px) */}
          <ul
            // no bullets; on desktop it starts 20px higher so the first question lines up with the heading
            className="m-0 list-none p-0 lg:-mt-5"
            // sizes shared by every row
            style={{ '--row': 'clamp(20px,2.3vw,33px)', '--gap': 'clamp(14px,1.67vw,24px)' }}
          >
            {/* loop over the questions */}
            {faqs.map((item, index) => {
              // is this question open?
              const isOpen = open === index
              // return one accordion row
              return (
                // the bottom divider is dotted grey, and orange while the row is open; the small bottom padding makes up the difference between the row padding and the answer gap
                <li
                  // key helps React track each row
                  key={item.question}
                  // dotted line under the row, colour fades between grey and orange
                  className={`border-b border-dotted pb-[calc(var(--row)_-_var(--gap))] transition-colors duration-300 motion-reduce:transition-none ${isOpen ? 'border-brand' : 'border-black/20'}`}
                >
                  {/* the question: a button so it works with mouse, keyboard and screen readers */}
                  <button
                    // plain button, not a form submit
                    type="button"
                    // open or close this row
                    onClick={() => toggle(index)}
                    // tells screen readers whether the answer is showing
                    aria-expanded={isOpen}
                    // tells screen readers which element holds the answer
                    aria-controls={`faq-answer-${index}`}
                    // id so the answer can point back to its question
                    id={`faq-question-${index}`}
                    // group lets the question text react to hover; full width, question on the left, icon on the right; padding on top and bottom; visible keyboard focus ring
                    className="group flex w-full items-center justify-between gap-6 pb-[var(--gap)] pt-[var(--row)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {/* question text: 20px at 1440px wide, turns orange on hover */}
                    <span className="font-display text-[clamp(16px,1.39vw,20px)] font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
                      {/* the question */}
                      {item.question}
                    </span>
                    {/* 32px round icon with a dotted orange border; decorative because the button already says expanded or collapsed */}
                    <span aria-hidden="true" className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-dotted border-brand sm:h-8 sm:w-8">
                      {/* horizontal bar, always visible */}
                      <span className="absolute h-px w-3.5 bg-brand" />
                      {/* vertical bar: shrinks to nothing when open, so the plus becomes a minus */}
                      <span className={`absolute h-3.5 w-px bg-brand transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
                    </span>
                  </button>

                  {/* answer wrapper: animates its height between 0 and the full height; hidden from screen readers and the Tab key while closed */}
                  <div
                    // id referenced by the button
                    id={`faq-answer-${index}`}
                    // a region labelled by its question
                    role="region"
                    // the question names this region
                    aria-labelledby={`faq-question-${index}`}
                    // grid trick: the row height goes from 0fr to 1fr; visibility switches after the closing animation ends
                    className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}
                  >
                    {/* inner box that is clipped while the wrapper is closing */}
                    <div className="min-h-0 overflow-hidden">
                      {/* answer text: 14px, lighter grey, 22px line height, 520px wide at most, with the gap before the divider */}
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

// export so App.jsx can import it
export default FAQ