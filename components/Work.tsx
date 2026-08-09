'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const PROJECTS = [
  {
    title: 'Gmail AI Triage Agent',
    body: 'An n8n workflow that watches incoming mail, classifies it with Claude, and routes labels + alerts automatically — no manual sorting.',
    stack: ['n8n', 'Claude API', 'Gmail Trigger'],
    href: 'https://github.com/bodavulasiddardha-png/N8N-Automation-Workflows',
    image: '/images/work/gmail-ai-triage-agent.png',
  },
  {
    title: 'AI Job Match Bot',
    body: 'Pulls live listings via JSearch API, scores fit against a candidate profile using Claude, and pushes ranked matches straight to Telegram.',
    stack: ['n8n', 'JSearch API', 'Telegram'],
    href: 'https://github.com/bodavulasiddardha-png/N8N-Automation-Workflows',
    image: '/images/work/ai-job-match-bot.png',
  },
  {
    title: '@unknownbhaarath — autonomous Instagram bot',
    body: 'Fully hands-off carousel poster — cron trigger pulls facts, Claude Haiku writes captions, Puppeteer renders slides, and it posts on its own schedule. Live and running.',
    stack: ['GitHub Actions', 'Claude Haiku', 'Puppeteer', 'Cloudinary'],
    href: 'https://github.com/bodavulasiddardha-png/unknownbhaarath',
    image: '/images/work/unknownbhaarath-instagram-bot.png',
  },
  {
    title: 'Driver Drowsiness Detection',
    body: 'Computer-vision system detecting driver fatigue in real time. Published research, co-authored with a 4-person team.',
    stack: ['OpenCV', 'Computer Vision'],
    href: 'https://doi.org/10.15680/IJIRSET.2026.1505096',
    image: '/images/work/driver-drowsiness-detection.png',
  },
  {
    title: 'Edunova Consultancy',
    body: 'Engineering admissions consultancy — built and deployed the platform, designed the outreach and content strategy end to end.',
    stack: ['Web platform', 'Ops design', 'Growth'],
    href: 'https://edunovaconsultancy.in',
    image: '/images/work/edunova-logo.jpg',
    lightPlate: true,
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
              whileHover={{ y: -6, borderColor: 'rgba(255,165,56,0.45)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group h-full rounded-3xl border border-surface-line bg-surface p-8 flex flex-col"
            >
              <div className="relative aspect-video rounded-2xl border border-surface-line mb-6 overflow-hidden bg-surface-line/30">
                {project.lightPlate ? (
                  <div className="absolute inset-3 rounded-xl bg-white overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} logo`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-bg/35 via-transparent to-amber/10 mix-blend-overlay pointer-events-none"
                      aria-hidden="true"
                    />
                  </>
                )}
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
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber-bright">
                View project ↗
              </span>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
