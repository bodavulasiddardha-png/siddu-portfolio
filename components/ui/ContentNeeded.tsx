export default function ContentNeeded({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 inline-flex items-start gap-2 rounded-xl border border-dashed border-cyan/50 bg-cyan/5 px-3 py-2 text-[11px] leading-snug tracking-wide text-cyan/90">
      <span aria-hidden="true" className="mt-px">
        ✎
      </span>
      <span>
        <strong className="font-semibold">CONTENT NEEDED —</strong> {children}
      </span>
    </div>
  )
}
