'use client'

import { useState } from 'react'
import PortfolioBackground from '@/components/PortfolioBackground'
import Gate from '@/components/Gate'
import TopChrome from '@/components/TopChrome'
import About from '@/components/About'
import Skills from '@/components/Skills'
import WorkChapters from '@/components/WorkChapters'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import { PROJECTS } from '@/lib/projects'

const TOTAL = 2 + PROJECTS.length + 2 // About, Skills, one per project, Certifications, Contact

export default function Home() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return <Gate onEnter={() => setEntered(true)} />
  }

  return (
    <>
      <PortfolioBackground />
      <TopChrome total={TOTAL} />
      <main id="main-content" className="relative z-10">
        <About index={1} />
        <Skills index={2} />
        <WorkChapters startIndex={3} />
        <Certifications index={3 + PROJECTS.length} />
        <Contact index={4 + PROJECTS.length} />
      </main>
    </>
  )
}
