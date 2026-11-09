# GEO / AI Search Analysis

## GEO Readiness Score: 55/100

### Platform Breakdown

| Platform | Score | Measured | Notes |
|----------|-------|----------|-------|
| Google AI Overviews | 50/100 | Qualitative | No rankings = no AI Overview eligibility |
| Google AI Mode | 45/100 | Qualitative | Broader pool but needs freshness/entity authority |
| ChatGPT Search | 55/100 | Qualitative | OAI-SearchBot allowed, but no brand mentions |
| Perplexity | 55/100 | Qualitative | PerplexityBot allowed, no Reddit/Wikipedia presence |
| Bing Copilot | 40/100 | Qualitative | No IndexNow, no Bing-specific optimization |

---

## AI Crawler Access Status

### Search Citability Crawlers (Should Allow)
| Crawler | Platform | Role | Status | Governance |
|---------|----------|------|--------|------------|
| OAI-SearchBot | OpenAI | Search citability | ✅ Allowed | ChatGPT Search |
| Claude-SearchBot | Anthropic | Search citability | ✅ Allowed | Claude search features |
| PerplexityBot | Perplexity | Search citability | ✅ Allowed | Perplexity search |
| Googlebot | Google | Search / AI Overviews / AI Mode | ✅ Allowed | Google Search |

### Training Crawlers (Correctly Blocked)
| Crawler | Platform | Role | Status | Governance |
|---------|----------|------|--------|------------|
| GPTBot | OpenAI | Model training | ❌ Blocked | OpenAI training |
| ClaudeBot | Anthropic | Model training | ❌ Blocked | Anthropic training |
| Google-Extended | Google | Gemini/Vertex training | ❌ Blocked | Gemini training |
| Applebot-Extended | Apple | Apple Intelligence training | ❌ Blocked | Apple training |
| CCBot | Common Crawl | Model training | ❌ Blocked | Common Crawl |

**Note:** Training blockers do NOT affect search citability. Each pair is separate.

---

## Content-Signal Issue (P1 Warning)

**Current robots.txt:**
```
User-agent: GPTBot
Disallow: /

User-agent: *
Allow: /
Content-Signal: search=yes,ai-train=no,use=reference
```

**Problem:** Content-Signal only in wildcard group. Named groups (GPTBot, ClaudeBot, etc.) don't inherit it.

**Fix:** Add Content-Signal to each named group:
```
User-agent: GPTBot
Disallow: /
Content-Signal: search=yes,ai-train=no,use=reference

User-agent: ClaudeBot
Disallow: /
Content-Signal: search=yes,ai-train=no,use=reference
...
```

---

## llms.txt Status: MISSING (Info)

**Status:** 404 Not Found
**Google Position:** Explicitly ignored by Google Search (AI Optimization Guide 2026-05-15)
**Value:** May help non-Google AI crawlers (optional)

**Recommended llms.txt:**
```
# Novatech
> Remote-first managed IT services for small businesses nationwide. Flat-rate pricing, 24/7 monitoring, unlimited help desk, cybersecurity, cloud management, and vCIO strategy.

## Main Pages
- [Home](https://novatechsoft.info/): Remote-first managed IT for small businesses
- [Managed IT Services](https://novatechsoft.info/managed-it.html): Texas-focused managed IT with nationwide reach
- [Book Free IT Audit](https://novatechsoft.info/#contact): Request a free infrastructure audit

## Key Facts
- Flat-rate pricing: $129-$299/user/month
- Month-to-month contracts, no lock-in
- 15-minute critical response SLA
- 24/7 monitoring and help desk available
- Nationwide remote with local field technicians
- vCIO quarterly strategic reviews

## Contact
- Email: hello@novatechsoft.info
- Phone: +1-512-555-0199
- Location: Austin, TX (serving nationwide)
```

---

## Brand Mention Analysis

| Platform | Presence | Citations | Notes |
|----------|----------|-----------|-------|
| Wikipedia | ❌ None | 0 | Highest correlation with AI citations |
| Wikidata | ❌ None | 0 | Entity foundation |
| Reddit | ❌ None | 0 | 46.7% of Perplexity citations |
| YouTube | ❌ None | 0 | Strongest correlation (~0.737) |
| LinkedIn | ❌ None | 0 | Moderate correlation |
| Industry Directories | ❌ None | 0 | Clutch, G2, Capterra, etc. |

**Critical Insight:** Brand mentions correlate 3x more with AI visibility than backlinks (Ahrefs 2025). Zero presence across all platforms explains zero AI citations.

---

## Passage-Level Citability Analysis

### Homepage - Top 30% (First ~245 words)
**Content:** Hero section + plans intro + first plan card
**Citable Facts:**
- "Flat-rate managed IT for small businesses nationwide"
- "15-minute response SLA"
- "24/7 monitoring, unlimited remote help desk"
- "$129/user/mo starting price"
- "Month-to-month, no lock-in"

**Issues:**
- No "What is managed IT?" definition
- No statistics with sources
- No author attribution
- Pricing buried in hero facts (not in paragraph)

### managed-it.html - Top 30% (First ~128 words)
**Content:** Hero + plan tiers intro + first plan
**Citable Facts:**
- "Flat-rate managed IT for Texas small businesses"
- "$129-$299/user/mo"
- "Month-to-month"

**Issues:**
- Even thinner content
- Texas focus not explained with local value
- Placeholder schema destroys credibility

---

## Server-Side Rendering Check

**Status:** ✅ PASS
- 959 words without JavaScript
- All critical content in initial HTML
- Accessible to GPTBot, PerplexityBot, CCBot (non-JS crawlers)
- Googlebot renders JS but doesn't need to for this site

---

## Schema for AI Discoverability

**Missing AI-critical schemas:**
1. Organization (entity)
2. Person (author - when added)
3. Service (offering)
4. QAPage (FAQ content)
5. AggregateRating (trust signal)
6. WebSite (sitelinks)

---

## Top 5 Highest-Impact GEO Changes

1. **Add Organization + Person schema** - Entity clarity for all AI systems
2. **Create self-contained answer blocks** - ~130-170 words each, front-loaded
3. **Add "What is managed IT?" definition** - In first 60 words of service pages
4. **Build Wikipedia/Wikidata presence** - Highest AI citation correlation
5. **Launch YouTube channel** - Strongest platform correlation (~0.737)

---

## Content Reformatting Suggestions

### Homepage - Add after H1:
> **What is managed IT?** Managed IT is a flat-rate service where a dedicated team handles your entire technology infrastructure—monitoring, security, help desk, cloud, and strategy—for a predictable monthly fee per user.

### Each Service Section - Add answer block:
> **What does [Service Name] include?** [Service Name] provides [specific deliverables: 24/7 monitoring, EDR/MDR, patching, etc.] with [SLA: 15-min response]. Our certified engineers handle [specific tasks] so you don't have to.

### FAQ - Already good structure, add QAPage schema

---

## Recency Signal

**No publication dates on any page.**
- Pages under 3 months old are ~3x more likely to be cited (SE Ranking)
- Add `datePublished` and `dateModified` to schema and visible content
- Implement quarterly content refresh schedule