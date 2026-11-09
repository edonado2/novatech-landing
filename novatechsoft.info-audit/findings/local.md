# Local SEO Findings

## Summary
**Score: 30/100** — Texas-focused content exists but no LocalBusiness schema, no GBP profiles, no city landing pages.

---

## Current Local Signals

| Signal | Status | Details |
|--------|--------|---------|
| **City Mentions** | ✅ Partial | Homepage: Austin, Dallas, Houston, San Antonio in #locations section |
| **Schema areaServed** | ✅ Partial | managed-it.html Service schema lists 4 TX cities with State containment |
| **LocalBusiness Schema** | ❌ Missing | Only Service schema — Map Pack requires LocalBusiness |
| **GBP Profiles** | ❌ None | No verified Google Business Profiles for any city |
| **City Landing Pages** | ❌ None | No /austin, /dallas, /houston, /san-antonio |
| **NAP Consistency** | ❌ Broken | Schema uses fake phone (+1-512-555-0199) and email (novatech.example) |
| **Review Markup** | ❌ None | No aggregateRating or review schema |
| **Location Pages in Sitemap** | ❌ None | Only homepage fragments |

---

## Google Business Profile Gap

**Required for Map Pack visibility in each metro:**

| City | GBP Status | Search Volume (est.) | Competitors |
|------|------------|---------------------|-------------|
| Austin | ❌ Not claimed | "managed IT Austin" ~320/mo | 15+ MSPs |
| Dallas | ❌ Not claimed | "managed IT Dallas" ~480/mo | 25+ MSPs |
| Houston | ❌ Not claimed | "managed IT Houston" ~410/mo | 20+ MSPs |
| San Antonio | ❌ Not claimed | "managed IT San Antonio" ~210/mo | 12+ MSPs |

**Total addressable local search volume: ~1,420/mo**

---

## NAP Audit

### Current (Broken)
```
Name: Novatech
Address: (none in schema)
Phone: +1-512-555-0199  ← FAKE (555 exchange reserved)
Email: hello@novatech.example  ← FAKE (.example TLD)
Website: https://novatech.example  ← FAKE
```

### Required (Per City)
```
Austin:
  Name: Novatech Austin
  Address: [Real Austin address or service-area]
  Phone: +1-512-XXX-XXXX
  Email: austin@novatechsoft.info
  Website: https://novatechsoft.info/austin

Dallas:
  Name: Novatech Dallas
  Address: [Real Dallas address or service-area]
  Phone: +1-214-XXX-XXXX
  Email: dallas@novatechsoft.info
  Website: https://novatechsoft.info/dallas

Houston:
  Name: Novatech Houston
  Address: [Real Houston address or service-area]
  Phone: +1-713-XXX-XXXX
  Email: houston@novatechsoft.info
  Website: https://novatechsoft.info/houston

San Antonio:
  Name: Novatech San Antonio
  Address: [Real San Antonio address or service-area]
  Phone: +1-210-XXX-XXXX
  Email: sanantonio@novatechsoft.info
  Website: https://novatechsoft.info/san-antonio
```

---

## LocalBusiness Schema (Missing — Critical)

**Needed per city for Map Pack eligibility:**

```json
{
  "@type": "LocalBusiness",
  "@id": "https://novatechsoft.info/#localbusiness-austin",
  "name": "Novatech Austin",
  "description": "Managed IT services for Austin small businesses. 24/7 monitoring, help desk, security, cloud.",
  "url": "https://novatechsoft.info/austin",
  "telephone": "+1-512-XXX-XXXX",
  "email": "austin@novatechsoft.info",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Congress Ave, Suite 400",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {"@type": "GeoCoordinates", "latitude": 30.2672, "longitude": -97.7431},
    "geoRadius": "50000"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "18:00",
    "timeZone": "America/Chicago"
  },
  "priceRange": "$$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Credit Card, ACH, Invoice",
  "parentOrganization": {"@id": "https://novatechsoft.info/#organization"}
}
```

**Service-area business option (if no physical office):**
```json
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Austin",
  "addressRegion": "TX",
  "addressCountry": "US"
},
"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": {"@type": "GeoCoordinates", "latitude": 30.2672, "longitude": -97.7431},
  "geoRadius": "50000"
}
```

---

## City Landing Pages (Missing — High)

**Required content per page:**

| Element | Austin | Dallas | Houston | San Antonio |
|---------|--------|--------|---------|-------------|
| Hero (city photo) | ✅ austin.jpg | Need | Need | Need |
| Local NAP | Required | Required | Required | Required |
| LocalBusiness schema | Required | Required | Required | Required |
| "Near me" content | Downtown, Domain, Round Rock | Downtown, Plano, Frisco | Downtown, Galleria, Energy Corridor | Downtown, Stone Oak, Medical Center |
| Local case study | Healthcare/Tech | Finance/Legal | Energy/Medical | Military/Govt |
| Directions/Map | Embed GMB map | Embed GMB map | Embed GMB map | Embed GMB map |
| Local phone | 512-xxx-xxxx | 214/469/972-xxx-xxxx | 713/281/832-xxx-xxxx | 210/726-xxx-xxxx |
| GBP review widget | Embed | Embed | Embed | Embed |

**URL Structure:** `/austin`, `/dallas`, `/houston`, `/san-antonio` (not `/locations/austin`)

---

## Review Strategy

**Current:** 0 reviews, 0 markup  
**Target:** 10+ reviews per city profile

**Collection Flow:**
1. Post-onboarding email (Day 30) → Google review link for client's city
2. Quarterly business review → Ask for review
3. Incident resolution → "Rate your experience" → Google review
4. Respond to ALL reviews within 24 hours (schema: `reviewResponse`)

**Schema when ≥5 reviews:**
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "12",
  "bestRating": "5",
  "worstRating": "1"
},
"review": [
  {
    "@type": "Review",
    "author": {"@type": "Person", "name": "Sarah M."},
    "datePublished": "2026-10-15",
    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
    "reviewBody": "Novatech migrated our 40-person law firm with zero downtime..."
  }
]
```

---

## Citations & Directories

**Target directories for Texas MSP:**
- Clutch.co (MSP category)
- G2.com (Managed Service Providers)
- SoftwareAdvice.com
- UpCity.com
- Expertise.com (Austin/Dallas/Houston/San Antonio MSP)
- Local Chamber of Commerce directories
- BBB (Better Business Bureau) — each metro

**NAP Consistency:** Must match GBP exactly across all citations.

---

## Competitor Radius (Not Analyzed)

**Requires DataForSEO MCP** for geo-grid rank tracking.  
**When enabled:** Track Novatech vs top 5 MSPs per city in 5-mile radius grids.

---

## Recommendations Priority

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| 1 | Fix NAP in schema (real phone, email, website) | 30 min | Critical |
| 2 | Create 4 LocalBusiness schemas | 2 hr | Critical |
| 3 | Claim/verify 4 GBP profiles | 4 hr | Critical |
| 4 | Build 4 city landing pages | 16 hr | High |
| 5 | Implement review collection + schema | 4 hr | High |
| 6 | Submit to 10+ citation directories | 8 hr | Medium |
| 7 | Enable DataForSEO for geo-grid tracking | 2 hr | Measurement |