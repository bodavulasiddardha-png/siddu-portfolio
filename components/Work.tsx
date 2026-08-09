'use client'

import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const PROJECTS = [
  {
    title: 'Gmail AI Triage Agent',
    body: 'An n8n workflow that watches incoming mail, classifies it with Claude, and routes labels + alerts automatically — no manual sorting.',
    stack: ['n8n', 'Claude API', 'Gmail Trigger'],
    href: 'https://github.com/bodavulasiddardha-png/N8N-Automation-Workflows',
  },
  {
    title: 'AI Job Match Bot',
    body: 'Pulls live listings via JSearch API, scores fit against a candidate profile using Claude, and pushes ranked matches straight to Telegram.',
    stack: ['n8n', 'JSearch API', 'Telegram'],
    href: 'https://github.com/bodavulasiddardha-png/N8N-Automation-Workflows',
  },
  {
    title: '@unknownbhaarath — autonomous Instagram bot',
    body: 'Fully hands-off carousel poster — cron trigger pulls facts, Claude Haiku writes captions, Puppeteer renders slides, and it posts on its own schedule. Live and running.',
    stack: ['GitHub Actions', 'Claude Haiku', 'Puppeteer', 'Cloudinary'],
    href: 'https://github.com/bodavulasiddardha-png/unknownbhaarath',
  },
  {
    title: 'Driver Drowsiness Detection',
    body: 'Computer-vision system detecting driver fatigue in real time. Published research, co-authored with a 4-person team.',
    stack: ['OpenCV', 'Computer Vision'],
    href: 'https://doi.org/10.15680/IJIRSET.2026.1505096',
  },
  {
    title: 'Edunova Consultancy',
    body: 'Engineering admissions consultancy — built and deployed the platform, designed the outreach and content strategy end to end.',
    stack: ['Web platform', 'Ops design', 'Growth'],
    href: 'https://edunovaconsultancy.in',
  },
]

export default function Work() {
  return (
    <section id="work" className="relative section-pad py-24 sm:py-32 bg-bg-soft">
      <Reveal>
        <SectionHeading eyebrow="Selected work" title="Projects" />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.08}>
            <motion.a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group h-full rounded-3xl border border-surface-line bg-surface p-8 flex flex-col"
            >
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-violet/25 via-violet/10 to-cyan/15 border border-surface-line mb-6 flex items-center justify-center">
                <span className="font-display text-3xl text-ink/70">
                  {project.title
                    .replace(/[@]/g, '')
                    .split(' ')
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </span>
              </div>
              <h3 className="font-display text-xl text-ink group-hover:text-cyan-bright transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{project.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-surface-line text-muted-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-violet-bright">
                View project ↗
              </span>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
