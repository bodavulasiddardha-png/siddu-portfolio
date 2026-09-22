export type ProjectIcon = 'envelope' | 'target' | 'instagram' | 'eye' | 'graduation-cap'

export type Project = {
  title: string
  body: string
  stack: string[]
  href: string
  image: string
  imageAlt: string
  icon: ProjectIcon
  logoOnDark?: boolean
}

export const PROJECTS: Project[] = [
  {
    title: 'Gmail AI Triage Agent',
    icon: 'envelope',
    body: 'An n8n workflow that watches incoming mail, classifies it with Claude, and routes labels + alerts automatically — no manual sorting.',
    stack: ['n8n', 'Claude API', 'Gmail Trigger'],
    href: 'https://github.com/bodavulasiddardha-png/N8N-Automation-Workflows',
    image: '/images/work/gmail-ai-triage-agent.png',
    imageAlt:
      'Illustration of the Gmail logo glowing above a data podium, with mail icons streaming around it, representing automated email triage',
  },
  {
    title: 'AI Job Match Bot',
    icon: 'target',
    body: 'Pulls live listings via JSearch API, scores fit against a candidate profile using Claude, and pushes ranked matches straight to Telegram.',
    stack: ['n8n', 'JSearch API', 'Telegram'],
    href: 'https://github.com/bodavulasiddardha-png/N8N-Automation-Workflows',
    image: '/images/work/ai-job-match-bot.png',
    imageAlt: 'Illustration of a friendly AI robot standing beside a ranked job-match results panel with star ratings',
  },
  {
    title: '@unknownbhaarath — autonomous Instagram bot',
    icon: 'instagram',
    body: 'Fully hands-off carousel poster — cron trigger pulls facts, Claude Haiku writes captions, Puppeteer renders slides, and it posts on its own schedule. Live and running.',
    stack: ['GitHub Actions', 'Claude Haiku', 'Puppeteer', 'Cloudinary'],
    href: 'https://github.com/bodavulasiddardha-png/unknownbhaarath',
    image: '/images/work/unknownbhaarath-instagram-bot.png',
    imageAlt: 'Illustration of the Instagram logo on a glowing podium, surrounded by content carousel cards and engagement icons',
  },
  {
    title: 'Driver Drowsiness Detection',
    icon: 'eye',
    body: 'Computer-vision system detecting driver fatigue in real time. Published research, co-authored with a 4-person team.',
    stack: ['OpenCV', 'Computer Vision'],
    href: 'https://doi.org/10.15680/IJIRSET.2026.1505096',
    image: '/images/work/driver-drowsiness-detection.png',
    imageAlt: 'Nighttime dashcam view of a highway with computer-vision bounding boxes tracking and labeling distances to nearby vehicles',
  },
  {
    title: 'Edunova Consultancy',
    icon: 'graduation-cap',
    body: 'Engineering admissions consultancy — built and deployed the platform, designed the outreach and content strategy end to end.',
    stack: ['Web platform', 'Ops design', 'Growth'],
    href: 'https://edunovaconsultancy.in',
    image: '/images/work/edunova-logo-transparent.png',
    imageAlt: 'Edunova Consultancy logo — a graduation cap mark beside the Edunova wordmark',
    logoOnDark: true,
  },
]
