export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs tracking-[0.3em] uppercase text-amber font-medium mb-4">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-muted text-balance">{description}</p>
      )}
    </div>
  )
}
