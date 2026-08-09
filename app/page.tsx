import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SplitIntro from '@/components/SplitIntro'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Skills from '@/components/Skills'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SplitIntro />
        <Services />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
