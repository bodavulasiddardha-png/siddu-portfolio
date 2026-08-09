export default function Footer() {
  return (
    <footer className="section-pad py-10 border-t border-surface-line">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-dim">
        <p>© {new Date().getFullYear()} Siddardha Bodavula</p>
        <p>Built with Next.js, React Three Fiber &amp; GSAP</p>
      </div>
    </footer>
  )
}
