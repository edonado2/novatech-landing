# Technical SEO Findings

## Crawlability

### robots.txt Analysis
**Status:** ✅ Reachable (200 OK)
**Groups:** 33 user-agent groups defined

**AI Crawler Groups (Correctly Configured):**
| Crawler | Group Type | Root Access | Purpose |
|---------|------------|-------------|---------|
| GPTBot | Named | ❌ Disallowed | OpenAI model training |
| ClaudeBot | Named | ❌ Disallowed | Anthropic model training |
| Google-Extended | Named | ❌ Disallowed | Gemini/Vertex training |
| Applebot-Extended | Named | ❌ Disallowed | Apple Intelligence training |
| CCBot | Named | ❌ Disallowed | Common Crawl training |
| OAI-SearchBot | * (wildcard) | ✅ Allowed | ChatGPT Search citability |
| Claude-SearchBot | * (wildcard) | ✅ Allowed | Claude search citability |
| PerplexityBot | * (wildcard) | ✅ Allowed | Perplexity search |
| Googlebot | * (wildcard) | ✅ Allowed | Google Search / AI Overviews |

**⚠️ Issue: Content-Signal only in `*` group**
The `Content-Signal: search=yes,ai-train=no,use=reference` line appears only in the wildcard group. Per RFC 9309, crawlers matching a named group read ONLY that group. The 5 named AI groups lack Content-Signal.

**Fix:** Repeat Content-Signal line inside each named group.

### Sitemap
**Status:** ❌ Invalid URLs present
- **404 URLs (4):** web-design.html, cybersecurity.html, cloud.html, privacy.html
- **Fragment URLs (5):** #services, #process, #why, #faq, #contact (invalid in sitemaps)
- **Deprecated tags:** `<changefreq>` and `<priority>` used (ignored by Google)

### Server-Side Rendering
**Status:** ✅ Excellent
- 959 words rendered without JavaScript
- No JS shell marker detected
- Critical content accessible to all crawlers (Googlebot, GPTBot, PerplexityBot, etc.)

### Security Headers
**Status:** ❌ Missing
| Header | Present | Recommended |
|--------|---------|-------------|
| Content-Security-Policy | ❌ | Yes |
| Strict-Transport-Security | ❌ | Yes (HSTS) |
| X-Frame-Options | ❌ | Yes |
| X-Content-Type-Options | ❌ | Yes |
| Referrer-Policy | ❌ | Yes |

### 404 Handling
**Status:** ✅ Correct
- Probe URL returns real 404 (not soft-404)
- Content-Type: text/html

### Mobile Optimization
**Status:** ✅ Good
- Viewport meta tag present
- Responsive CSS with media queries
- Touch targets appear adequate
- No horizontal scroll

### Core Web Vitals
**Status:** ⚠️ No Field Data
- Site below CrUX traffic threshold
- Lab estimates: LCP ~2.0s, INP ~150ms, CLS ~0.05 (estimated from static site on CDN)
- Run PageSpeed Insights when traffic increases

## Indexability

### Canonical Tags
**Status:** ❌ Missing on all pages
- No self-referencing canonical on index.html
- No self-referencing canonical on managed-it.html
- Risk: Duplicate content if parameters or fragments cause variants

### Meta Robots
**Status:** ⚠️ Missing
- No explicit `index, follow` (default but explicit is better)
- No `noindex` on any page (correct)

### Duplicate Content
**Status:** ⚠️ Potential
- Fragment URLs in sitemap could cause confusion
- No canonical tags to consolidate

## URL Structure
- Clean URLs for main pages
- Fragment URLs used for sections (not ideal for SEO)
- No query parameters for content
- Trailing slashes: not used (consistent)

## JavaScript Rendering
**Strategy:** Static HTML (GitHub Pages)
- No SPA framework
- No client-side routing
- All content in initial HTML
- Moments use progressive enhancement (photo-chapters, word-highlight)

## Technology Stack
- **Hosting:** GitHub Pages
- **CDN:** Cloudflare + Fastly
- **Caching:** Varnish
- **Protocol:** HTTP/3 enabled
- **Fonts:** Google Fonts (Albert Sans) - preconnected