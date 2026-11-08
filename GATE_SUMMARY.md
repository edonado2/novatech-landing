# Novatech MSP Website - Gate Results Summary

## Final Gate Status
- **Round**: 2 of 3 (1 round remaining)
- **FAILs**: 15 (after waivers would be applied)
- **WARNs**: 36 (non-blocking)

## Waivers Created (5 max)
Located at `.taste-skill/waivers.json` - covers 5 photo-upscale findings for stand-in images. Client must supply 1920px+ photographs for production.

## Remaining FAILs (Structural Issues)

### 1. section-gaps (1)
- Hero to Plans gap: 116px vs median 320px (-64%)
- Fix: Adjust section padding at ground changes

### 2. photo-upscale (5) - WAIVED
- All stand-in images from library (960-1280px) shown at 1440px+
- Fix: Client must provide high-res photographs

### 3. section-height (1)
- FAQ first group: 893px > 828px limit (SR-2)
- Fix: Reduce FAQ content or adjust group split

### 4. container-edges (1)
- Included list text starts at x=124 (44px from container left at 80px)
- Fix: Align included-list to grid columns (span-6)

### 5. cut-text (1)
- FAQ CTA button overflows on mobile (390px)
- Fix: Reduce button padding/text on mobile

### 5. button-styles (1)
- Three button label sizes: 14, 16, 18px
- Fix: Standardize button typography

### 7. empty-area (1)
- FAQ section 55% empty on mobile (visual on right, content left)
- Fix: Stack visual below content on mobile

### 8. sparse (1)
- Included section 49% full (target 55%)
- Fix: Add more content or reduce section height

### 9. edge-left (2)
- FAQ visual starts at x=144.4 on mobile (should be wrap left line)
- Fix: Mobile grid alignment for span-5.start-8

### 10. neighbour (1)
- Plans section shows 31px of Included section on mobile
- Fix: Adjust section heights for mobile

### 11. hero-fold (1)
- Hero 1.01 screens tall at 390px (ends at y=848, fold at 844)
- Fix: Shorten H1 or reduce hero spacing

### 12. hero-maxchars (1)
- H1 36 chars exceeds hero maxChars at 390px
- Fix: Shorten headline to ~30 chars

## Progress Made
- Started: 24 FAILs (round 1)
- Current: 15 FAILs (round 2)
- Fixed: Copy-lint (0 FAIL), contrast issues, FAQ structure, visual placement, mobile viewport

## Recommendations
1. **Client photographs**: Replace all 6 stand-in images with 1920px+ originals
2. **Grid alignment**: The taste-skill grid requires exact 12-column positioning (80px margins, split at k=5/6/7)
3. **Mobile-first**: Several FAILs only appear at 390px/320px - test early
4. **Section height**: Use `--h: 1` or `2` with content that fits exactly
5. **Consider waivers**: For photo-upscale (5 max) and potentially hero-fold/maxchars if client insists on current headline

## Files
- `index.html` - Current home page (7 sections, 2 moments)
- `managed-it.html` - Existing service page (46 FAILs, not modified)
- `copy-plan.md` - Voice card, fact sheet, page shape
- `.taste-skill/waivers.json` - 5 photo-upscale waivers