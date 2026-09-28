# Siddardha Bodavula - Portfolio

**Live:** https://siddu-portfolio-omega.vercel.app

A cinematic, single-page portfolio for an AI automation engineer: a gated intro, scroll-driven "work chapters", a particle background, certifications and a contact section.

## Stack
- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Three.js** via `@react-three/fiber`, `drei` and `postprocessing` for the particle/fog atmosphere
- **GSAP** (ScrollTrigger) and **Framer Motion** for scroll chapters and micro-interactions
- **Tailwind CSS**, Phosphor icons
- Deployed on **Vercel**

## What's inside
| Path | What |
|---|---|
| `app/` | Layout, page, icons, 404 |
| `components/Gate*.tsx` | Animated entry gate + atmosphere |
| `components/WorkChapters.tsx` | Project chapters (data in `lib/projects.ts`) |
| `components/Skills.tsx`, `Certifications.tsx`, `Contact.tsx` | Sections |
| `components/PortfolioBackground.tsx` | 3D particle background |

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Featured work shown on the site
Gmail AI Triage Agent, AI Job Match Bot, an autonomous Instagram content agent, a driver drowsiness detection research project and the Edunova admissions site. More on my [GitHub profile](https://github.com/bodavulasiddardha-png).
