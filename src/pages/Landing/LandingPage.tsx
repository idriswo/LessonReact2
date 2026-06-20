import { memo } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Hero } from '../../components/Landing/Hero'
import { Features } from '../../components/Landing/Features'
import { About } from '../../components/Landing/About'
import { Contacts } from '../../components/Landing/Contacts'

const LandingPage = memo(() => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fbfdfc] dark:bg-slate-950 transition-colors">
      <Header />
      <Hero />
      <Features />
      <About />
      <Contacts />
      <Footer />
    </div>
  )
})

export default LandingPage