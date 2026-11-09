# Agentic Browsing Readiness Analysis

## Summary

| Metric | Value |
|--------|-------|
| Lighthouse Agentic Browsing | Not run (requires PSI API key) |
| Agent-UX Heuristic Score | **100/100** ✅ |
| P0 Failures | 0 |
| P1 Warnings | 1 (Content-Signal) |
| P1 Info | 2 (llms.txt, Markdown delivery) |

---

## Lighthouse Agentic Browsing (Not Measured)

Requires Google PageSpeed Insights API key. Run with:
```bash
"/Users/ernesto/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.5.0/scripts/claude-seo" run lighthouse_agentic.py https://novatechsoft.info --strategy both --json
```

Expected audits (max 6 counted):
1. `agent-accessibility-tree` - P0
2. `cumulative-layout-shift` - P0 (target ≤0.1)
3. `server-rendered` - P0
4. `robots-reachable` - P0
5. `robots-ai-groups` - P0
6. `webmcp-registered-tools` - P1 (if forms exist)

---

## HTTP & Markup Checks (agentic_check.py)

### ✅ P0 - Server-Rendered Content
- **Words without JS:** 959
- **JS Shell Marker:** false
- **Status:** PASS
- All critical content accessible to non-JS crawlers

### ✅ P0 - robots.txt Reachable
- **Status:** 200 OK
- **Groups:** 33
- **Status:** PASS

### ✅ P0 - AI Crawler Groups
- **Named Groups:** GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot
- **Search Crawlers in * group:** OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot
- **Status:** PASS

### ⚠️ P1 - Content-Signal (WARN)
- **Signal:** `search=yes,ai-train=no,use=reference`
- **Present in:** `*` (wildcard) group only
- **Missing from:** GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot
- **Fix:** Repeat line in each named group (RFC 9309)

### ℹ️ P1 - llms.txt (INFO)
- **Status:** 404 Not Found
- **Lighthouse:** Not applicable (drops from fraction)
- **Google:** Explicitly ignores llms.txt
- **Action:** Optional - create for non-Google AI crawlers

### ℹ️ P1 - Markdown Delivery (INFO)
- **Content Negotiation:** Not offered
- **.md sibling:** 404
- **Vary: Accept:** Present (but returns HTML)
- **Action:** Optional - offer `Accept: text/markdown` with `Vary: Accept`

### ✅ P1 - 404 Handling (PASS)
- **Probe:** Real 404 returned
- **No catch-all 200:** Confirmed
- **Status:** PASS

### ℹ️ P2 - WebMCP Tools (INFO)
- **Forms found:** 1 (Formspree contact form)
- **Forms annotated:** 0
- **registerTool call sites:** 0
- **Action:** Optional - register imperative tools for lead form

### ℹ️ P3 - WebMCP Form Annotations (INFO)
- **Forms:** 1 (unannotated)
- **Action:** Add `toolname`/`tooldescription` for agent submission

### ℹ️ P3 - ai-catalog.json (N/A)
- **Status:** 404
- **Only needed if:** Operating MCP server, A2A agent, or skills

---

## Accessibility Tree (agent_ux_check.py)

**Score: 100/100** ✅ COMPLETE

| Metric | Value |
|--------|-------|
| Tree Present | true |
| Total Nodes | 713 |
| Interactive Nodes | 34 |
| Role: Button | 1 |
| Role: Link | 27 |
| Role: Generic | 25 |
| Unnamed Interactive | 0 |
| Real Buttons | 6 |
| Real Anchors | 34 |
| Div onClick Widgets | 0 |
| Semantic Landmarks | 10 |
| Inputs without ARIA | 3 |
| Inputs without Label | 0 |

**Strengths:**
- Zero unnamed interactive elements
- No div-onClick widgets (all semantic)
- 10 semantic landmarks (nav, main, sections, footer)
- All form inputs have labels

**Minor:**
- 3 inputs without explicit ARIA (but have labels - acceptable)
- 25 generic roles (mostly structural divs)

---

## Access Policy Summary

| Agent Type | Crawler | robots.txt | Governance |
|------------|---------|------------|------------|
| **Search** | OAI-SearchBot | ✅ Allow | ChatGPT Search citability |
| **Search** | Claude-SearchBot | ✅ Allow | Claude search citability |
| **Search** | PerplexityBot | ✅ Allow | Perplexity search |
| **Search** | Googlebot | ✅ Allow | Google Search / AI Overviews / AI Mode |
| **Training** | GPTBot | ❌ Block | OpenAI training |
| **Training** | ClaudeBot | ❌ Block | Anthropic training |
| **Training** | Google-Extended | ❌ Block | Gemini/Vertex training |
| **Training** | Applebot-Extended | ❌ Block | Apple Intelligence training |
| **Training** | CCBot | ❌ Block | Common Crawl training |
| **User-Triggered** | ChatGPT-User | * group allow | May not apply |
| **User-Triggered** | Claude-User | * group allow | Honours robots.txt |
| **User-Triggered** | Google-Agent | * group allow | Generally ignores robots.txt |

---

## Standards Status (Checked 2026-09-23)

| Standard | Status | Notes |
|----------|--------|-------|
| RFC 9309 (robots groups) | Proposed Standard | Content-Signal should be in named groups |
| Content-Signal | Cloudflare CC0 + IETF draft | Preference, not enforcement |
| llms.txt | Community spec | Google ignores; Lighthouse checks |
| WebMCP | W3C CG Draft | WebKit opposes, Mozilla neutral |
| ARD (ai-catalog.json) | Spec 1.0 | Lighthouse 13.5+ |
| Web Bot Auth (RFC 9421) | RFC | Google-Agent uses it |
| Agent Card (A2A) | Protocol | Not applicable |

---

## Recommendations (Priority Order)

### P0 - Must Fix
1. **Add Content-Signal to named robots.txt groups** (10 min)
   - Unblocks: AI crawler clarity for training vs search preferences

### P1 - Should Fix
2. **Create llms.txt** (30 min)
   - Unblocks: Non-Google AI crawler guidance
3. **Add Markdown content negotiation** (1 hr)
   - Unblocks: Agent-friendly content delivery
4. **Register WebMCP tool for contact form** (1 hr)
   - Unblocks: Agent form submission capability

### P2/P3 - Optional
5. **Add ai-catalog.json** (when MCP server deployed)
6. **Add declarative WebMCP form annotations** (Chrome only)

---

## Verification Commands

```bash
# Re-run checks after fixes
"/Users/ernesto/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.5.0/scripts/claude-seo" run agentic_check.py https://novatechsoft.info --json
"/Users/ernesto/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.5.0/scripts/claude-seo" run agent_ux_check.py https://novatechsoft.info --json

# With PSI API key (for Lighthouse fraction)
"/Users/ernesto/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.5.0/scripts/claude-seo" run lighthouse_agentic.py https://novatechsoft.info --strategy both --json
```