# Novatech - Location Page Template

This template generates location-specific pages for managed IT services in major metro areas.
Each page targets: "managed IT services [city]" and "[city] managed IT provider"

## Top 10 Metro Areas for Location Pages

| Priority | Metro | State | Population | Key Industries |
|----------|-------|-------|------------|----------------|
| 1 | Austin | TX | 2.3M | Tech, Government, Education |
| 2 | Dallas-Fort Worth | TX | 7.6M | Finance, Telecom, Healthcare |
| 3 | Houston | TX | 7.1M | Energy, Healthcare, Manufacturing |
| 4 | San Antonio | TX | 2.6M | Military, Healthcare, Tourism |
| 5 | Chicago | IL | 9.5M | Finance, Manufacturing, Tech |
| 6 | Atlanta | GA | 6.1M | Logistics, Tech, Finance |
| 7 | Phoenix | AZ | 4.8M | Tech, Manufacturing, Healthcare |
| 8 | Denver | CO | 2.9M | Tech, Aerospace, Healthcare |
| 9 | Raleigh | NC | 1.4M | Tech, Biotech, Education |
| 10 | Nashville | TN | 2.0M | Healthcare, Music, Tech |

## Page Structure (each location page)

### URL Pattern
```
/locations/[city-slug].html
Example: /locations/austin-tx.html
```

### Content Sections
1. **Hero** - City-specific headline, local stats, CTA
2. **Local Presence** - Remote-first + local field techs
3. **Industry Focus** - Top industries in that metro
4. **Compliance** - State/local regulations (TX: HB 3834, etc.)
5. **Case Study/Teaser** - Local client type (anonymized)
6. **Plans** - Same 3 tiers, localized CTA
7. **FAQ** - City-specific questions
8. **Contact/CTA** - Book audit

### Unique Content Requirements (per quality gates)
- Minimum 500 words unique per page
- 60%+ unique content vs other location pages
- Real local data points (not just city name swap)
- Specific industries, compliance, landmarks, partners

## Schema Markup per Page
- LocalBusiness (with areaServed = City + Metro)
- Service (areaServed = City)
- FAQPage/QAPage for local questions
- BreadcrumbList

## Internal Linking
- From homepage Locations section → each city page
- From each city page → main service page, contact, privacy
- Cross-link between nearby metros (e.g., Austin ↔ San Antonio)

## Sitemap Integration
Add to sitemap.xml as separate URLs with weekly lastmod