// import the navbar from the components folder
import Navbar from './components/Navbar'
// import the floating WhatsApp button
import WhatsAppButton from './components/WhatsAppButton'
import About from './sections/About'
import Capabilities from './sections/Capabilitties'
import FAQ from './sections/FAQ'
// import the hero from the sections folder
import Hero from './sections/Hero'
import Industries from './sections/Industries'
import Insights from './sections/Insights'
import Process from './sections/Process'
import Products from './sections/Products'
import Projects from './sections/Projects'
import WhyUs from './sections/WhyUs'

// App stacks the page in design order
const App = () => (
  // fragment avoids an extra wrapper div
  <>
    {/* navbar floats over the hero */}
    <Navbar />
    {/* main landmark holds the page content */}
    <main>
      {/* the hero section; later sections (About, Capabilities, ...) go below it */}
      <Hero />
      <About/>
      <Capabilities/>
      <Products/>
      <WhyUs/>
      <Industries/>
      <Process/>
      <Projects/>
      <FAQ/>
      <Insights/>
    </main>
    {/* floating chat button, stays fixed while scrolling */}
    <WhatsAppButton />
  </>
)

// export so main.jsx can render it
export default App