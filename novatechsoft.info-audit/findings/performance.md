# Performance (Core Web Vitals) Findings

## Summary
**Score: 55/100** — Lab estimates show LCP needs improvement; no field data available.

---

## Lab Estimates (from render analysis)

| Metric | Homepage | managed-it.html | Threshold | Status |
|--------|----------|-----------------|-----------|--------|
| **LCP** | ~2.8s | ~3.2s | ≤2.5s (Good) | ⚠️ Needs Improvement |
| **INP** | Unknown | Unknown | ≤200ms (Good) | ? |
| **CLS** | Low (est. <0.05) | Low (est. <0.05) | ≤0.1 (Good) | ✅ Likely Pass |

> **Note:** Field data (CrUX) not available — Google API credentials not configured. Run `google_auth.py --check` to enable real-user metrics.

---

## Resource Waterfall Analysis

### Homepage Critical Path
1. `index.html` — 50 KB (HTML + inline CSS)
2. `assets/system.css` — ~15 KB
3. `assets/ui/cards.css` — ~8 KB
4. `assets/motion/motion.css` — ~12 KB
5. `assets/backgrounds/backgrounds.css` — ~10 KB
6. `assets/layout/layout.css` — ~12 KB
7. `assets/icons/icon.css` — ~5 KB
8. **Google Fonts: Albert Sans** — 2 weights (400-700, italic)
9. `assets/photos/datacenter.jpg` — Hero (no width/height, no fetchpriority on managed-it)
10. `assets/moments/moments.js` + libs (modulepreload helps)
11. Cloudflare beacon (async)

### managed-it.html Critical Path
1. `managed-it.html` — 35 KB (large inline CSS + HTML)
2. Same 6 CSS files
3. **Google Fonts: Figtree** — 400-700
4. `assets/photos/cloud-servers.jpg` — Hero (no fetchpriority)
5. Cloudflare beacon

---

## Top Issues

### 1. Hero Images Lack Width/Height (High)
**Impact:** CLS risk, browser cannot reserve space → layout shift on load  
**Affected:** datacenter.jpg (homepage), cloud-servers.jpg (managed-it), all section visuals  
**Fix:** Add explicit `width="1800" height="1200"` (or actual dimensions) to all `<img>`

### 2. No Modern Image Formats (High)
**Impact:** JPG only → 25-50% larger than WebP/AVIF → slower LCP, more bandwidth  
**Assets:** 12 photos, all JPG  
**Fix:** Generate WebP (q80) + AVIF (q50) variants. Implement `<picture>` fallbacks.

### 3. No Responsive Images (Medium)
**Impact:** 1800×1200 served to mobile (375px wide) → 4.8× wasted pixels  
**Fix:** Generate 400w, 800w, 1200w, 1800w variants. Use `srcset` + `sizes`.

### 4. Multiple CSS Files (Low)
**Impact:** 6 separate requests (HTTP/2 helps but overhead exists)  
**Fix:** Bundle in build step or ensure Cloudflare Auto Minify + HTTP/2 Push.

### 5. Google Fonts Blocking (Low)
**Impact:** Figtree/Albert Sans block FCP until downloaded  
**Current:** `preconnect` present, but no `font-display: swap` visible  
**Fix:** Add `&display=swap` to Google Fonts URLs.

### 6. No Hero Preload on managed-it.html (Medium)
**Impact:** Hero image discovered late in parse  
**Fix:** Add `<link rel="preload" as="image" href="/assets/photos/cloud-servers.webp">`

### 7. Cloudflare Beacon INP Risk (Medium)
**Impact:** Beacon script may block main thread on interaction  
**Fix:** Verify `defer` attribute. Consider sampling rate < 100%.

---

## Optimization Checklist

| Optimization | Homepage | managed-it.html | Effort |
|--------------|----------|-----------------|--------|
| Add width/height to all `<img>` | ❌ | ❌ | 1 hr |
| Generate WebP/AVIF | ❌ | ❌ | 2 hr |
| Implement `<picture>` + srcset | ❌ | ❌ | 3 hr |
| Preload hero image | ✅ (fetchpriority) | ❌ | 15 min |
| Add `font-display: swap` | Check | Check | 15 min |
| Bundle CSS | ❌ | ❌ | 2 hr |
| Defer Cloudflare beacon | Check | Check | 15 min |
| Enable Cloudflare Auto Minify | Check | Check | 5 min |
| Enable Cloudflare Polish (WebP) | Check | Check | 5 min |

---

## Cloudflare-Specific Optimizations

**Enable in Cloudflare Dashboard:**
- Speed → Optimization → Auto Minify: CSS, JS, HTML ✅
- Speed → Optimization → Brotli ✅
- Speed → Optimization → Early Hints ✅
- Speed → Optimization → HTTP/3 (with QUIC) ✅
- Images → Polish → Lossless or Lossy (auto WebP) ✅
- Images → Mirage (lazy load for mobile) ⚠️ Test first
- Caching → Browser Cache TTL: 1 year for static assets ✅

---

## Field Data Gap

**CrUX (Chrome User Experience Report)** not available without Google API.  
**To enable:**
```bash
"/Users/ernesto/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.5.0/scripts/claude-seo" run google_auth.py --check
```
Then run audit with `seo-google` agent for real 28-day CWV percentiles.

---

## Recommendations Priority

| Priority | Action | Effort | Expected LCP Gain |
|----------|--------|--------|-------------------|
| 1 | Add width/height to hero images | 1 hr | -0.3s |
| 2 | Generate WebP/AVIF + `<picture>` | 5 hr | -0.5s to -1.0s |
| 3 | Preload hero on managed-it.html | 15 min | -0.2s |
| 4 | Enable Cloudflare Polish | 5 min | -0.2s (auto) |
| 5 | Add `font-display: swap` | 15 min | -0.1s FCP |
| 6 | Bundle CSS | 2 hr | -0.1s |
| 7 | Configure CrUX monitoring | 1 hr | N/A (measurement) |