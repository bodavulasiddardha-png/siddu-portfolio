'use client'

/** The portfolio's living background once past the gate: the same AI-circuit footage as a
 * fixed, continuously looping layer behind every stacking card — screen-blended so only the
 * glowing traces show against the dark-gold theme, kept dim enough to read as atmosphere
 * rather than compete with the glass cards on top of it. */
export default function PortfolioBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-bg overflow-hidden" aria-hidden="true">
      <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-55 mix-blend-screen">
        <source src="/videos/ai-circuit.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-bg/70" />
    </div>
  )
}
