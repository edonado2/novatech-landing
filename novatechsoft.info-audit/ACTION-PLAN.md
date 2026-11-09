# NovatechSoft.info — SEO Action Plan

**Priority Order:** Critical → High → Medium → Low  
**Total Estimated Effort:** ~80 hours across 4 phases

---

## Phase 1: Critical Fixes (Week 1) — ~4 hours

| # | Task | Details | Effort | Status |
|---|------|---------|--------|--------|
| 1.1 | **Fix sitemap.xml** | Remove `web-design.html`, `cybersecurity.html`, `cloud.html`, and all 5 fragment URLs (`#services`, `#process`, `#why`, `#faq`, `#contact`). Keep only `/` and `/managed-it.html`. Update `lastmod` to today. | 15 min | ☐ |
| 1.2 | **Fix schema URLs in managed-it.html** | Replace `https://novatech.example` → `https://novatechsoft.info`, `+1-512-555-0199` → real phone, `hello@novatech.example` → real email. Validate with Rich Results Test. | 30 min | ☐ |
| 1.3 | **Add homepage schema** | Add `@graph` with Organization, Service, FAQPage, WebSite, BreadcrumbList JSON-LD. Use real NAP, pricing, FAQ content from page. | 1 hr | ☐ |
| 1.4 | **Fix broken internal links** | In managed-it.html: nav links to `/web-design.html` (404), footer links to `/web-design.html`, `/about.html`, `/privacy.html` (all 404). Either create pages or remove links. | 30 min | ☐ |
| 1.5 | **Add width/height to hero images** | All `<img>` in hero/section visuals need explicit `width` and `height` attributes to prevent CLS. Priority: homepage datacenter.jpg, managed-it.html cloud-servers.jpg. | 1 hr | ☐ |
| 1.6 | **Validate robots.txt AI policy** | Confirm intent: Cloudflare blocks GPTBot, ClaudeBot, Google-Extended. If AI citation desired, configure Cloudflare AI Bot Control to allow specific bots. | 15 min | ☐ |

---

## Phase 2: High-Impact Improvements (Weeks 2–3) — ~14 hours

| # | Task | Details | Effort | Status |
|---|------|---------|--------|--------|
| 2.1 | **Create `/llms.txt`** | Plain-text file at root with service summary, pricing, contact, key differentiators. Format per llms.txt spec. | 1 hr | ☐ |
| 2.2 | **Configure Cloudflare AI Bot Control** | Security → Bots → AI Bot Control. Allow: GPTBot, ClaudeBot, Google-Extended, PerplexityBot if citation traffic desired. | 30 min | ☐ |
| 2.3 | **Generate WebP/AVIF images** | Convert all 12 JPG assets to WebP (quality 80) and AVIF (quality 50). Use sharp/squoosh CLI or build pipeline. | 2 hr | ☐ |
| 2.4 | **Implement responsive images** | Wrap all hero/section images in `<picture>` with AVIF → WebP → JPG fallbacks. Add `srcset` for mobile/desktop. | 3 hr | ☐ |
| 2.5 | **Add LocalBusiness schema per city** | Create 4 LocalBusiness objects (Austin, Dallas, Houston, San Antonio) with unique `@id`, address, phone, geo coords. Embed in managed-it.html or city pages. | 2 hr | ☐ |
| 2.6 | **Claim Google Business Profiles** | Search "Novatech Austin TX", "Novatech Dallas TX", etc. Claim/verify each. Add photos, hours, services, Q&A. | 4 hr | ☐ |
| 2.7 | **Add breadcrumb + sitelinks schema** | BreadcrumbList on both pages. WebSite potentialAction for sitelinks searchbox. | 1 hr | ☐ |
| 2.8 | **Preload hero images** | Add `<link rel="preload" as="image" href="/assets/photos/datacenter.webp">` for above-fold images. | 30 min | ☐ |

---

## Phase 3: Content & Authority (Month 2) — ~60 hours

| # | Task | Details | Effort | Status |
|---|------|---------|--------|--------|
| 3.1 | **Build city landing pages** | Create `/austin`, `/dallas`, `/houston`, `/san-antonio` with unique: hero (city photo), NAP, testimonials, local case study, LocalBusiness schema, directions. | 16 hr | ☐ |
| 3.2 | **Publish case studies** | 4–6 studies: "How [Client] reduced downtime 87%", "HIPAA compliance for [Medical Practice]", etc. Each with CaseStudy schema, metrics, client logo (permission). | 20 hr | ☐ |
| 3.3 | **Add team bios + certifications** | About/Team page with photos, bios, Microsoft/CompTIA/AWS certs. Person schema with `knowsAbout`, `certification`. | 8 hr | ☐ |
| 3.4 | **Implement review collection** | Email automation post-onboarding → Google review link. Add `aggregateRating` + `review` schema when ≥5 reviews per location. | 4 hr | ☐ |
| 3.5 | **Create competitor comparison pages** | "Novatech vs [Local MSP 1]", "Novatech vs [National MSP]", "Alternatives to [Big MSP]". Use Product/Service comparison schema. | 12 hr | ☐ |
| 3.6 | **Launch blog/resource center** | 2 posts/month: "MSP buying guide", "Cybersecurity checklist for small business", "Cloud cost optimization". Cluster around pillar topics. | Ongoing | ☐ |

---

## Phase 4: Monitoring & Iteration (Ongoing)

| # | Task | Frequency | Tool |
|---|------|-----------|------|
| 4.1 | **GSC: Check indexation + 404s** | Weekly | Search Console |
| 4.2 | **CrUX Core Web Vitals** | Monthly | PageSpeed Insights / CrUX API |
| 4.3 | **Lab CWV (Lighthouse)** | Per deploy | Lighthouse CI |
| 4.4 | **Schema validation** | Per deploy | Rich Results Test |
| 4.5 | **AI citation check** | Monthly | ChatGPT, Perplexity, AI Overviews |
| 4.6 | **Sitemap lastmod sync** | Per content change | Build script |
| 4.7 | **Geo-grid rank tracking** | Monthly | DataForSEO (if enabled) |
| 4.8 | **Backlink audit** | Quarterly | Moz / Ahrefs / Common Crawl |
| 4.9 | **Competitor SERP monitoring** | Monthly | DataForSEO / manual |
| 4.10 | **Content freshness audit** | Quarterly | Manual + analytics |

---

## Quick-Win Checklist (Do Today)

- [ ] Fix sitemap.xml (15 min)
- [ ] Fix managed-it.html schema URLs (30 min)
- [ ] Add homepage schema (1 hr)
- [ ] Fix broken nav/footer links (30 min)
- [ ] Add image dimensions (1 hr)
- [ ] Create llms.txt (1 hr)
- [ ] Configure Cloudflare AI bots (15 min)

**Total: ~4.5 hours for all quick wins**

---

## Effort vs Impact Matrix

```
HIGH IMPACT
    │
    │  ● Fix sitemap (1.1)          ● Homepage schema (1.3)
    │  ● Fix schema URLs (1.2)      ● llms.txt (2.1)
    │  ● Fix broken links (1.4)     ● Cloudflare AI bots (2.2)
    │  ● Image dimensions (1.5)     ● WebP/AVIF (2.3)
    │
    ├─────────────────────────────────────────
    │                                      LOW IMPACT
    │  ● Responsive images (2.4)        ● Breadcrumb schema (2.7)
    │  ● LocalBusiness schema (2.5)     ● Preload images (2.8)
    │  ● GBP claims (2.6)               ● Case studies (3.2)
    │  ● City pages (3.1)               ● Team bios (3.3)
    │  ● Competitor pages (3.5)         ● Blog (3.6)
    │
    └─────────────────────────────────────────
           LOW EFFORT                    HIGH EFFORT
```

---

## Success Metrics (90-Day Targets)

| Metric | Baseline | 90-Day Target |
|--------|----------|---------------|
| Indexed pages (GSC) | ~2 | 8+ (2 pages + 4 city + blog + privacy) |
| Core Web Vitals (LCP) | ~2.8s | ≤2.5s (Good) |
| Schema validity | 0/2 pages | 2/2 pages + city pages |
| AI citation visibility | 0 | 3+ platforms |
| Local Map Pack (TX cities) | 0 | 2+ cities in top 3 |
| Organic clicks (est.) | Unknown | +50% from baseline |
| Form submissions | Baseline | +30% from baseline |