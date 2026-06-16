import VideoIntro from '@/components/VideoIntro'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <VideoIntro />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Skills />
      <Education />
      <Contact />
    </main>
  )
}
