# NovatechSoft.info - Comprehensive SEO Audit Report

**Audit Date:** 2026-11-09
**Domain:** novatechsoft.info
**Business Type:** Managed IT Services (Service-area business, nationwide with Texas focus)
**SEO Health Score:** 42/100

---

## Executive Summary

NovatechSoft.info is a new domain (first seen 2025-02-08) with **zero organic rankings**, **no keywords in top 100**, and a **high spam score (58)** from 53 backlinks. The site has strong technical foundations (GitHub Pages + Cloudflare, server-rendered, good accessibility) but critical content and authority gaps prevent any search visibility.

### Top 5 Critical Issues

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 1 | Sitemap references 4 non-existent pages + 5 invalid fragment URLs | Crawl waste, index bloat | Low |
| 2 | Homepage has **zero schema markup** | No rich results, poor entity understanding | Low |
| 3 | managed-it.html Service schema uses placeholder data (novatech.example) | Invalid structured data, trust signals broken | Low |
| 4 | No canonical tags on any page | Duplicate content risk | Low |
| 5 | Linked pages return 404 (privacy.html, web-design.html, about.html, cybersecurity.html, cloud.html) | Broken internal links, crawl errors | Medium |

### Top 5 Quick Wins

| # | Fix | Impact | Effort |
|---|-----|--------|--------|
| 1 | Fix sitemap.xml (remove 404s, fragments, deprecated tags) | Immediate crawl efficiency | 15 min |
| 2 | Add Organization + Service schema to homepage | Rich results eligibility | 30 min |
| 3 | Fix managed-it.html schema with real data | Valid structured data | 20 min |
| 4 | Add canonical tags to all pages | Duplicate prevention | 10 min |
| 5 | Add Content-Signal to named robots.txt groups | AI crawler clarity | 10 min |

---

## DataForSEO Live Data Summary

| Metric | Value | Assessment |
|--------|-------|------------|
| Domain Rank | 0 | No authority |
| Ranked Keywords | 0 | Not in index |
| Organic Traffic Est. | 0 | No visibility |
| Backlinks | 53 | Very low |
| Referring Domains | 53 | 1:1 ratio (suspicious) |
| Backlink Spam Score | 58 | **High - Toxic risk** |
| First Seen | 2025-02-08 | New domain |
| Competitors Found | 0 | No keyword overlap |

**Key Finding:** The 1:1 backlink-to-referring-domain ratio with a 58 spam score suggests low-quality or spammy links. This domain needs authority building, not link cleanup (too few links to disavow).

---

## Category Scores

| Category | Weight | Score | Status |
|----------|--------|-------|--------|
| Technical SEO | 22% | 65/100 | ⚠️ Needs Work |
| Content Quality | 23% | 35/100 | ❌ Critical |
| On-Page SEO | 20% | 40/100 | ❌ Critical |
| Schema / Structured Data | 10% | 15/100 | ❌ Critical |
| Performance (CWV) | 10% | 70/100* | ⚠️ Estimated |
| AI Search Readiness | 10% | 55/100 | ⚠️ Needs Work |
| Images | 5% | 60/100 | ⚠️ Needs Work |
| **Overall** | 100% | **42/100** | ❌ **Critical** |

*CWV estimated - no CrUX field data available for low-traffic site

---

## Technical SEO Findings (65/100)

### ✅ Passed
- **Server-rendered content**: 959 words without JavaScript (excellent for agents & crawlers)
- **HTTPS enforced**: Valid SSL via Cloudflare
- **HTTP/3 enabled**: Modern protocol support
- **Robots.txt reachable**: 33 agent groups defined
- **AI crawler groups**: GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot properly grouped
- **404 handling**: Real 404s returned (no soft-404s)
- **Accessibility tree**: 100/100 Agent UX score, 10 landmarks, 34 interactive nodes

### ⚠️ Warnings
- **Content-Signal only in `*` group**: Named AI groups (GPTBot, ClaudeBot, etc.) lack Content-Signal declaration. Per RFC 9309, crawlers matching a named group read ONLY that group.
- **No llms.txt**: Optional for Google (explicitly ignored), may help other AI crawlers
- **No Markdown delivery**: No content negotiation for `text/markdown`
- **Security headers**: Missing CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy

### ❌ Failed
- **Sitemap has 404 URLs**: web-design.html, cybersecurity.html, cloud.html, privacy.html return 404
- **Sitemap has fragment URLs**: #services, #process, #why, #faq, #contact are invalid in sitemaps
- **Sitemap uses deprecated tags**: `<changefreq>` and `<priority>` ignored by Google
- **Non-existent pages linked**: privacy.html, web-design.html, about.html linked from managed-it.html and footer

---

## Content Quality Findings (35/100)

### Homepage (index.html) - 815 words
| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Word count | 815 | 500+ (homepage) | ✅ Pass |
| E-E-A-T: Experience | Weak | Case studies, photos | ⚠️ |
| E-E-A-T: Expertise | Moderate | Specific SLAs, pricing | ✅ |
| E-E-A-T: Authoritativeness | None | No author, no external citations | ❌ |
| E-E-A-T: Trustworthiness | Moderate | Contact form, pricing transparency | ⚠️ |
| Readability (Flesch) | ~55 | 60-70 | ⚠️ |
| Heading structure | H1→6×H2→14×H3 | Logical | ✅ |

### managed-it.html - 427 words
| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Word count | 427 | 800+ (service page) | ❌ **Thin** |
| E-E-A-T: Experience | Weak | Generic process | ⚠️ |
| E-E-A-T: Expertise | Moderate | Texas-specific details | ✅ |
| E-E-A-T: Authoritativeness | None | No author, placeholder schema | ❌ |
| E-E-A-T: Trustworthiness | Low | Placeholder contact info in schema | ❌ |

### Critical Content Issues
1. **No author bylines** on any page - required for YMYL (Managed IT is YMYL-adjacent)
2. **No publication/update dates** - freshness signal missing
3. **managed-it.html is thin** (427 vs 800 minimum)
4. **No original research, case studies, or unique data** - low citability for AI
5. **Images with empty alt text** on managed-it.html (3 Microsoft icons)
6. **No internal linking strategy** - only nav links, no contextual links

---

## Schema Markup Findings (15/100)

### Homepage: NO schema detected
**Missing critical schemas:**
- Organization (brand entity)
- Service (core offering)
- WebSite (sitelinks searchbox)
- BreadcrumbList (navigation)

### managed-it.html: Service schema PRESENT but INVALID
```json
"provider": {
  "@type": "Organization",
  "name": "Novatech",
  "url": "https://novatech.example",  // ❌ PLACEHOLDER
  "telephone": "+1-512-555-0199",      // ❌ PLACEHOLDER
  "email": "hello@novatech.example"    // ❌ PLACEHOLDER
}
```
**Issues:**
- Placeholder URLs and contact info (violates schema guidelines)
- `areaServed` only covers 4 Texas cities (business is nationwide)
- No `aggregateRating` or `review` markup
- No `FAQPage` schema (though FAQ rich results retired, QAPage still valid)

---

## On-Page SEO Findings (40/100)

| Element | Homepage | managed-it.html | Status |
|---------|----------|-----------------|--------|
| Title tag | ✅ Optimized | ✅ Optimized | ✅ |
| Meta description | ✅ Optimized | ✅ Optimized | ✅ |
| H1 | ✅ "Remote-First Managed IT" | ✅ "Novatech Managed IT for Texas small business" | ✅ |
| Canonical tag | ❌ Missing | ❌ Missing | ❌ **Critical** |
| Meta robots | ❌ Missing | ❌ Missing | ⚠️ |
| OG tags | ✅ Present | ✅ Present | ✅ |
| Twitter Card | ✅ Present | ✅ Present | ✅ |
| Internal links | 2 (both privacy.html - 404) | 7 (3 to 404 pages) | ❌ |

---

## AI Search / GEO Readiness (55/100)

### Citability Score: 40/100
- No self-contained answer blocks in first 30% of content
- No specific statistics with sources
- No author credentials
- Content not formatted for AI extraction

### Structural Readability: 70/100
- Good heading hierarchy (H1→H2→H3)
- Question-based headings on FAQ section
- Lists and tables present (plan comparison)

### Authority & Brand Signals: 25/100
- No Wikipedia/Wikidata presence
- No Reddit/YouTube/LinkedIn mentions tracked
- No author entity
- Brand mentions correlate 3x more with AI visibility than backlinks

### Technical Accessibility: 85/100
- Server-rendered (accessible to all AI crawlers)
- robots.txt allows search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot)
- Blocks training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot)

### AI Crawler Access Status
| Crawler | Role | Access | Governance |
|---------|------|--------|------------|
| OAI-SearchBot | ChatGPT Search citability | ✅ Allowed | Search |
| Claude-SearchBot | Claude search citability | ✅ Allowed | Search |
| PerplexityBot | Perplexity search | ✅ Allowed | Search |
| Googlebot | Google Search / AI Overviews | ✅ Allowed | Search |
| GPTBot | OpenAI training | ❌ Blocked | Training |
| ClaudeBot | Anthropic training | ❌ Blocked | Training |
| Google-Extended | Gemini/Vertex training | ❌ Blocked | Training |
| Applebot-Extended | Apple Intelligence training | ❌ Blocked | Training |
| CCBot | Common Crawl training | ❌ Blocked | Training |

---

## Performance (Estimated 70/100)

**No CrUX field data** (site below traffic threshold)

**Lab observations from rendered HTML:**
- Static site on GitHub Pages + Cloudflare CDN (good)
- Multiple CSS files (could be combined)
- Module preloads for moments (good)
- Hero image with `fetchpriority="high"` (good)
- Images use `loading="lazy"` (good)
- No obvious render-blocking resources

**Recommendations:**
- Enable Brotli compression on Cloudflare
- Add cache headers for static assets
- Consider combining CSS files
- Run PageSpeed Insights when traffic increases

---

## Images (60/100)

| Image | Alt Text | Status |
|-------|----------|--------|
| datacenter.jpg (hero) | "Modern data center with server racks and networking equipment" | ✅ Good |
| meeting-room.jpg (nav) | "Team planning IT deployment" | ✅ Good |
| meeting-room.jpg (onboarding) | "Team reviewing infrastructure audit documentation" | ✅ Good |
| network-switch.jpg | "Technician configuring network infrastructure" | ✅ Good |
| cloud-servers.jpg | "Deploying server and cloud infrastructure" | ✅ Good |
| team-laptop.jpg | "Engineer providing ongoing IT support" | ✅ Good |
| austin.jpg | "Modern workspace with remote collaboration setup" | ✅ Good |
| dallas.jpg | "Remote IT operations center" | ✅ Good |
| microsoft.svg (×3) | **Empty alt** | ❌ **Missing** |

**Issues:**
- 3 images with empty alt text on managed-it.html
- OG image is `share.jpg` - verify this exists
- No WebP/AVIF format detected (served as JPG/SVG)

---

## Backlink Profile (DataForSEO)

| Metric | Value | Risk |
|--------|-------|------|
| Total Backlinks | 53 | Low volume |
| Referring Domains | 53 | 1:1 ratio |
| Spam Score | 58 | **High** |
| Referring Main Domains | 48 | |
| Dofollow Ratio | ~77% (41/53) | |
| Top TLDs | .com (28), .shop (4), .org (4) | |
| Platform Types | Unknown (37), Blogs (16), CMS (16) | |

**Assessment:** The 1:1 ratio with high spam score suggests directory submissions, blog comments, or automated link building. With only 53 links, disavow is not recommended - focus on earning quality links instead.

---

## Action Plan

### Phase 1: Critical Fixes (Week 1)

| # | Task | File(s) | Effort |
|---|------|---------|--------|
| 1 | Fix sitemap.xml - remove 404 URLs, fragment URLs, deprecated tags | sitemap.xml | 15 min |
| 2 | Add canonical tags to index.html and managed-it.html | index.html, managed-it.html | 10 min |
| 3 | Add Organization + Service + WebSite schema to homepage | index.html | 30 min |
| 4 | Fix managed-it.html Service schema with real data | managed-it.html | 20 min |
| 5 | Add Content-Signal to named robots.txt groups | robots.txt | 10 min |
| 6 | Fix empty alt text on managed-it.html Microsoft icons | managed-it.html | 5 min |
| 7 | Create missing pages (privacy.html) or remove links | privacy.html, footer links | 60 min |

### Phase 2: High-Impact Improvements (Weeks 2-3)

| # | Task | File(s) | Effort |
|---|------|---------|--------|
| 8 | Expand managed-it.html to 800+ words with Texas-specific content | managed-it.html | 2 hrs |
| 9 | Add author bio + Person schema to service pages | index.html, managed-it.html | 1 hr |
| 10 | Add publication/last-updated dates | All pages | 30 min |
| 11 | Create llms.txt for non-Google AI crawlers | /llms.txt | 30 min |
| 12 | Add FAQ schema (QAPage) to FAQ sections | index.html, managed-it.html | 45 min |
| 13 | Add BreadcrumbList schema | Both pages | 30 min |
| 14 | Add internal contextual links between pages | Both pages | 45 min |
| 15 | Optimize images: WebP/AVIF, add dimensions | assets/photos/ | 1 hr |

### Phase 3: Content & Authority (Month 2)

| # | Task | Effort |
|---|------|--------|
| 16 | Publish 3 case studies with original data | 1 week |
| 17 | Create location pages for top 10 metro areas | 1 week |
| 18 | Build YouTube channel with onboarding videos | Ongoing |
| 19 | Earn 10+ quality backlinks (partnerships, directories) | Ongoing |
| 20 | Submit to relevant industry directories (Clutch, G2, etc.) | 1 week |

### Phase 4: Monitoring & Iteration (Ongoing)

| # | Task | Frequency |
|---|------|-----------|
| 21 | Track keyword rankings (target: "managed IT services", "managed IT Texas", "vCIO services") | Weekly |
| 22 | Monitor AI citations (ChatGPT, Perplexity, AI Overviews) | Monthly |
| 23 | Check backlink profile for new toxic links | Monthly |
| 24 | Update content freshness (quarterly reviews) | Quarterly |
| 25 | Run technical audit after any deployment | Per deploy |

---

## Audit Artifacts

- `findings/technical.md` - Technical SEO details
- `findings/content.md` - Content quality analysis
- `findings/schema.md` - Schema validation & generated code
- `findings/sitemap.md` - Sitemap validation
- `findings/geo.md` - GEO/AI search analysis
- `findings/agentic.md` - Agent readiness details
- `audit-data.json` - Structured data for report generation

---

## Next Steps

1. **Immediate**: Apply Phase 1 fixes (estimated 2.5 hours)
2. **This week**: Deploy fixes and verify via Search Console
3. **Week 2-3**: Execute Phase 2 content improvements
4. **Month 2**: Launch Phase 3 authority building
5. **Ongoing**: Maintain Phase 4 monitoring

---

*Report generated by claude-seo audit system. DataForSEO live data as of 2026-11-09. Local analysis of rendered pages at novatechsoft.info.*