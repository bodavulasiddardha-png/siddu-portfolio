import StackCard from './ui/StackCard'

export default function About({ index }: { index: number }) {
  return (
    <StackCard id="about" index={index} label="Who I am" accent="warm">
      <p className="font-display italic text-xl sm:text-2xl text-gradient mb-4 mt-6">A</p>
      <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-[1.3] text-ink text-balance max-w-3xl">
        CSE grad <span className="text-muted">(Bharath University, 2026)</span> building AI agents
        and automation systems for real production workloads —{' '}
        <span className="text-gradient font-semibold">an email-triage agent</span> that classifies
        and routes mail on its own, <span className="text-gradient font-semibold">a job-matching bot</span> that
        scores live listings against a candidate profile, and{' '}
        <span className="text-gradient font-semibold">a fully autonomous Instagram bot</span> that&apos;s
        been posting unsupervised for months.
      </p>
    </StackCard>
  )
}
