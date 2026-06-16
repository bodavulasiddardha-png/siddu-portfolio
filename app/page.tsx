import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Placeholder sections — replace with real content */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', opacity: 0.6 }}>About</h2>
      </section>

      <section id="projects" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', opacity: 0.6 }}>Projects</h2>
      </section>

      <section id="contact" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', opacity: 0.6 }}>Contact</h2>
      </section>
    </main>
  )
}
