import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'
import About from './sections/About'
import Capabilities from './sections/Capabilitties'
import CTA from './sections/CTA'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Industries from './sections/Industries'
import Insights from './sections/Insights'
import Process from './sections/Process'
import Products from './sections/Products'
import Projects from './sections/Projects'
import WhyUs from './sections/WhyUs'

const App = () => (
  <>
    <Navbar />
    <main>
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
    <WhatsAppButton />
    <CTA/>
    <Footer/>
  </>
)

export default App