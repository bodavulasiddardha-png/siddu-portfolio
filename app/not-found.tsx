import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center bg-bg px-6 text-center">
      <div className="absolute inset-0 bg-grid-fade pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-md">
        <p className="font-display text-7xl sm:text-8xl text-ink">404</p>
        <h1 className="font-display text-2xl sm:text-3xl text-ink mt-4 text-balance">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-muted leading-relaxed">
          The page you&apos;re looking for was moved or never existed. Head back to the homepage.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-amber px-6 py-3 text-sm font-semibold text-bg shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  )
}
