# Novatech MSP Website Redesign — Design Specification

**Date**: 2026-11-07  
**Project**: Novatech Landing  
**Kind**: Service (MSP — Managed Service Provider)  
**Site-kind**: Other  
**Page type**: service  
**Primary goal**: Book free IT audit  
**Target**: Small businesses in Texas (Austin, Dallas, Houston, San Antonio)

---

## 1. Business Context

Novatech is an MSP providing flat-rate managed IT support to small businesses across Texas. Services include:
- 24/7 monitoring & alerting
- Unlimited help desk (business hours or 24/7 by plan)
- Patch & vulnerability management
- Cybersecurity stack (EDR/MDR, email security, DNS filtering, awareness training)
- Cloud management (AWS, Azure, GCP)
- vCIO strategic consulting
- Disaster recovery & backup verification

**No certifications, compliance badges, or cybersecurity claims** — only real, deliverable services.

---

## 2. Multi-Page Architecture

| Page | File | Purpose | Key Sections |
|------|------|---------|--------------|
| Home | `index.html` | Overview, value prop, service entry points | Hero → Services → Process → Proof → Values → CTA → Footer |
| Managed IT | `managed-it.html` | Core service detail | Hero → Plans → Included → Onboarding → FAQ → Audit form |
| Web Design | `web-design.html` | Secondary service | Hero → Portfolio → Process → Pricing → Contact |
| About | `about.html` | Trust, team, Texas focus | Hero → Story → Team → Values → Locations → Footer |
| Contact | `contact.html` | Conversion (audit booking) | Hero → Form → Direct contacts → FAQ → Footer |

All pages share: header/nav, footer, design system, motion layer.

---

## 3. Home Page — Section Plan (8 sections = long page → 2 moments)

| # | Section ID | Idea | Picture | Screens | Moment |
|---|------------|------|---------|---------|--------|
| 1 | `hero` | "IT that just works for Texas small business" | Split: editorial h1 left, service visualization right | 1 | — |
| 2 | `services` | Three service pillars | 3 cards with real tool icons | 1 | — |
| 3 | `process` | 4-step onboarding | Pinned-chapters: one frame, 4 steps beside it | 2 | **pinned-chapters** |
| 4 | `proof` | Named client quote + Texas footprint | Photograph of Texas business district | 1 | — |
| 5 | `values` | How we operate | 4 icon-led cards | 1 | — |
| 6 | `cta` | Book free IT audit | Large type moment | 1 | **word-highlight** |
| 7 | `footer` | Closing + directory | — | 1 | — |

---

## 4. Design Tokens (dealt via taste-skill CLI)

```bash
# 1. Hero deal (service page with photographs)
node assets/layout/deal.mjs --type service --has photo --history .taste-skill/layout-history.json

# 2. Palette & pairing deal
node scripts/start.mjs deal --page service --trade "managed-services" --history .taste-skill/history.json

# 3. CSS tokens from palette
node scripts/start.mjs css --page service --palette <id> --type <pairing-id> --radius soft --history .taste-skill/history.json

# 4. Moments deal (2 moments for 8 sections)
node scripts/moments.mjs pick --page service --count 2 --fits section,statement --photo --history .taste-skill/history.json
```

### Expected Token Output

| Token | Value | Rationale |
|-------|-------|-----------|
| `--p-bg` | `#FAFAF8` | Warm paper white, not clinical |
| `--p-ink` | `#0C1A2B` | Deep blue-black, Texas night sky |
| `--p-muted` | `#5A6B7C` | Slate blue-grey |
| `--p-accent` | `#D4A54E` | Warm gold — Texas sunlight, not corporate blue |
| `--p-surface` | `#F0EFEB` | Slightly warmer than bg for cards |
| `--font-display` | `Space Grotesk` | Technical but human, variable weight |
| `--font-text` | `IBM Plex Sans` | Legible, engineering heritage |
| `--display-weight` | `400` | Size/tracking carry hierarchy, not bold |
| `--r-sm` | `8px` | Soft radius — approachable |
| `--r-md` | `12px` | |
| `--r-lg` | `20px` | |
| `--r-btn` | `8px` | |
| `data-buttons` | `solid` | Apple-style filled primary |
| Nav type | `nav-split` | Logo left, services center, CTA right |
| Footer type | `footer-columns` | Standard service layout |
| Close type | `close-type` | h2 + button across wrap |
| Rhythm | `surface-pairs` | One alternating ground band |
| Moments | `pinned-chapters`, `word-highlight` | Process walkthrough + CTA emphasis |

---

## 5. Visual Strategy (No Client Photos)

### Stand-in Photographs
Via `photos.mjs pick --trade "managed-services" --sections "audit,deployment,monitoring,team,office,texas"` → 8-12 licensed images:
1. Modern server rack (audit)
2. Technician deploying agents (deployment)
3. Monitoring dashboard on screen (monitoring)
4. Team collaboration in bright office (team)
5. Modern Texas office interior (office)
6. Austin skyline / Dallas arts district / Houston energy corridor / San Antonio riverwalk (Texas footprint)
7. Small business owner at laptop (client context)
8. Clean desk with MacBook + monitor (remote work)

Each frame: `data-source="library" data-subject="<description>"`, listed in report for client replacement.

### Real Tool Icons
Via `icons.mjs scan --colour` — actual brand icons for:
- Microsoft 365, Entra ID, Intune
- AWS, Azure, Google Cloud
- Google Workspace, Slack, Zoom
- CrowdStrike, SentinelOne, Microsoft Defender
- ConnectWise, Datto, N-able
- 1Password, Bitwarden

### Hero Service Visualization
Not a generic dashboard. Live HTML fragment (`assets/ui/app-frame/fragment.html` adapted) showing:
- Ticket queue: "Exchange sync issue" → Status: **Resolved** (green)
- Uptime metric: **99.97%** (last 30 days)
- Patch compliance: **94%** devices current (progress bar)
- Security posture: **Protected** — EDR active, email filtering on

Rewritten to Novatech branding, real data structure.

---

## 6. Copy Strategy (per `copy.md`, `copy-voice.md`)

### Voice Card
| Attribute | Value |
|-----------|-------|
| **Tone** | Calm, competent, direct. Not salesy. |
| **Perspective** | "We run your IT" not "We provide IT solutions" |
| **Vocabulary** | "Monitoring" not "observability", "Help desk" not "support portal", "Patch" not "vulnerability remediation" |
| **Sentence length** | Short. 12-18 words avg. |
| **Prohibited** | "Seamless", "robust", "leverage", "best-in-class", "world-class", "cutting-edge", "innovative" |

### Key Copy Rules
- **H1**: Category + buyer + one hard fact → "Managed IT for Texas small business. Flat rate. 15-min critical response."
- **Buttons**: Verb + object → "Book free IT audit", "View pricing", "See our process"
- **No invented facts**: No certifications, no "SOC 2 certified" unless real, no "military-grade encryption"
- **Texas-specific**: "Serving Austin, Dallas, Houston, San Antonio" — real cities only
- **Contacts**: `.example` stand-ins → `hello@novatech.example`, `+1 (512) 555-0199`
- **Assumed facts marked**: `data-assumed` on any assumed pricing/hours

---

## 7. Component Specifications

### Header / Nav (`nav-split`)
- Fixed, opaque, 72px, 1px hairline
- Logo left (SVG, dealt mark + "Novatech" in display face)
- Services center: "Managed IT", "Web Design", "Cloud" — each anchors to home page sections
- CTA right: "Book free IT audit" (primary button)
- Tablet: hamburger + CTA beside it
- Mobile: full-screen sheet, CTA moves to action bar

### Hero (`split` hero per deal)
- `--h: 1`, 100svh
- Left (span-5): h1 (clamp 38-72px, 3 lines max), sub-line (lead size), 2 buttons (primary + ghost)
- Right (span-6 start-7): Service visualization fragment, top-aligned with h1
- No caption under visualization
- Entrance: motion layer hero enter (once on load)

### Services Section (`services`)
- `--h: 1`, ground-base
- h2: "Three ways we help" + muted run-on
- 3 cards (span-4 each): icon (real tool), h3, 2-line description, link arrow
- Hover: card lifts 2px, icon scales 1.02

### Process Section (`process`) — **pinned-chapters moment**
- `--h: 2` (2 screens live)
- h2: "Onboarded in two weeks" + muted run-on
- Left (span-5): 4 steps as pinned chapters
  1. Audit & Plan — Week 1
  2. Deploy Agents — Week 1-2
  3. Cutover — Week 2
  4. Optimize — Week 3+
- Right (span-6 start-7): Single frame photograph (team at whiteboard / deployment)
- Moment: `pinned-chapters` — scroll scrubs through steps, frame stays, chapter panel updates
- Reduced motion: static rows, each step with its visual under it

### Proof Section (`proof`)
- `--h: 1`, ground-inverse (rhythm band)
- h2: "Trusted by [Company], [Company], [Company]" — real names only
- Left: Named quote with face photograph (stand-in), company, role
- Right: Texas footprint — 4 city markers on subtle map visual (fx-map still)

### Values Section (`values`)
- `--h: 1`, ground-base
- h2: "How we operate" + muted run-on
- 4 icon-led cards (2x2 grid):
  - Flat rate, per user — no surprise bills
  - Month-to-month — cancel with 30 days' notice
  - 24/7 monitoring — we catch it before you do
  - Texas-based — engineers in Austin, Dallas, Houston, San Antonio

### CTA Section (`cta`) — **word-highlight moment**
- `--h: 1`, ground-inverse
- h2: "Stop managing IT. Start running your business." (statement moment)
- Moment: `word-highlight` — scroll highlights "Stop managing IT" then "Start running your business" sequentially
- Single primary button: "Book free IT audit" → `#contact` on contact page

### Footer (`footer-columns`)
- Row 1 (close-type): h2 "Ready for IT that just works?" + "Book free IT audit" button across wrap
- Row 2: 4 columns — Services, Company, Contact, Legal
- Credits line in details element

---

## 8. Service Pages (managed-it.html, web-design.html)

### Managed IT Page (exists, refine to match system)
- Hero: `split` with plan comparison visualization
- Plans: 3-tier cards (Essentials $129, Professional $199, Enterprise $299)
- Included: 6 feature cards on ground-inverse
- Onboarding: 4-step cards (existing)
- FAQ: 6 questions (existing, `details/summary`)
- Contact form: existing Formspree integration

### Web Design Page (new)
- Hero: `photo` — portfolio piece full-bleed, h1 on calm side
- Portfolio: `photo-chapters` moment — 3-4 case studies as chapters
- Process: 4 steps (Discovery → Design → Build → Launch)
- Pricing: 2-tier (Standard / Custom)
- Contact form

---

## 9. Motion & Interaction (per `motion.md`)

| Element | Behavior |
|---------|----------|
| Hero entrance | Once on load: h1 + sub-line + buttons rise 16px, fade in (600ms stagger) |
| Buttons | Hover: step -2px (translateY), Press: scale 0.98 |
| Linked cards | Hover: lift 2px, picture zoom 1.03 |
| Nav links | Underline draws on hover (2px, accent) |
| Pinned-chapters | Scrubbed to scroll, 600ms settle per chapter |
| Word-highlight | Sequential highlight on scroll, 800ms per word |
| Reduced motion | All animations disabled, moments show finished state |
| Focus ring | 2px solid `--p-action`, 3px offset, never animated |

---

## 10. Technical Requirements

- **Stack**: Static HTML/CSS/JS using taste-skill assets (copied to `/assets`)
- **Fonts**: Google Fonts, `display=swap`, preloaded
- **Icons**: Local SVG files via `icons.mjs scan --colour`
- **Photos**: Local WebP/AVIF via `photos.mjs fetch`, `data-source` + `data-subject` on each `<img>`
- **Forms**: Formspree endpoint (existing), `data-endpoint` on form
- **Analytics**: None specified — add GA4/Plausible if needed
- **Performance**: `perf.mjs` — no FAIL rows (image weight, contexts, layout shift)
- **Accessibility**: WCAG 2.1 AA — focus visible, headings ordered, labels visible, alt text on all content images

---

## 11. Quality Gates (taste-skill checker)

All pages must pass:
```bash
node scripts/copy-lint.mjs <page>.html --kind service
node scripts/consistency.mjs <page>.html --widths 1440,1024,820,768,390 --rhythm-widths 1440,820,768,390 --profile .taste-skill/chrome-consistency --page service --category "Managed IT services" --primary "Book free IT audit"
node assets/layout/check.mjs --url <page>.html --profile .taste-skill/chrome-check --sizes 1440x900,1024x768,820x1180,768x1024,390x844 --shots shots/layout
node scripts/perf.mjs <page>.html --profile .taste-skill/chrome-perf
node scripts/gate.mjs <page>.html
```

**GATE: PASS** required before ship.

---

## 12. Deliverables

1. **5 HTML pages**: `index.html`, `managed-it.html`, `web-design.html`, `about.html`, `contact.html`
2. **Assets**: `/assets` (taste-skill kit + local icons + local photos)
3. **Design spec**: This document (committed)
4. **Gate reports**: JSON + screenshots in `.taste-skill/` and `shots/`
5. **Client handoff list**: Every stand-in photo, every client slot, canonical domain, form endpoint

---

## 13. Assumptions & Open Items

| Item | Status | Resolution |
|------|--------|------------|
| Real logo | ❌ | Dealt mark + "Novatech" in display face |
| Real photographs | ❌ | 8-12 stand-ins via `photos.mjs`, listed for replacement |
| Canonical domain | ❌ | `https://novatechsoft.info` (from CNAME) — add to canonical when live |
| Formspree endpoint | ✅ | `https://formspree.io/f/xayrgrkw` (existing) |
| Real client quotes | ❌ | Placeholder — client to supply |
| Texas office addresses | ❌ | District only (Austin, Dallas, Houston, San Antonio) — no street numbers |
| Phone number | ❌ | `.example` stand-in: `+1 (512) 555-0199` |

---

## 14. Coined Name Search

"Novatech" — searched via `names.json` process. Existing MSP in Texas operates as "Novatech Solutions" — distinct enough for local MSP. No trademark conflict found in preliminary search. Result kept in `names.json`.