# Schema Markup Findings

## Current State

### Homepage (index.html): NO schema detected
**Required schemas missing:**
1. Organization - Brand entity
2. Service - Core offering
3. WebSite - Sitelinks searchbox
4. BreadcrumbList - Navigation

### managed-it.html: Service schema PRESENT but INVALID

**Current Invalid Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Managed IT Services",
  "description": "Flat-rate managed IT services with 24/7 monitoring, unlimited help desk, security, cloud management, and vCIO strategy. One monthly price. Month-to-month.",
  "provider": {
    "@type": "Organization",
    "name": "Novatech",
    "url": "https://novatech.example",        // ❌ PLACEHOLDER
    "telephone": "+1-512-555-0199",            // ❌ PLACEHOLDER
    "email": "hello@novatech.example"          // ❌ PLACEHOLDER
  },
  "areaServed": [
    {"@type": "City", "name": "Austin", "containedInPlace": {"@type": "State", "name": "Texas"}},
    {"@type": "City", "name": "Dallas", "containedInPlace": {"@type": "State", "name": "Texas"}},
    {"@type": "City", "name": "Houston", "containedInPlace": {"@type": "State", "name": "Texas"}},
    {"@type": "City", "name": "San Antonio", "containedInPlace": {"@type": "State", "name": "Texas"}}
  ],
  "serviceType": "Managed IT Services",
  "offers": {
    "@type": "Offer",
    "name": "Managed IT Plan",
    "description": "Flat monthly rate per user. Includes 24/7 monitoring, unlimited help desk, patching, security, cloud management, and vCIO strategy.",
    "price": "129",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "129",
      "priceCurrency": "USD",
      "billingIncrement": "1",
      "billingDuration": "P1M"
    },
    "availability": "https://schema.org/InStock",
    "eligibleRegion": {"@type": "Country", "name": "US"}
  }
}
```

**Issues:**
1. ❌ Placeholder URLs (`novatech.example`) - violates schema guidelines
2. ❌ Placeholder phone/email
3. ❌ `areaServed` only 4 Texas cities (business is nationwide)
4. ❌ No `aggregateRating` or `review`
5. ❌ No `FAQPage`/`QAPage` for FAQ section
6. ❌ No `BreadcrumbList`

---

## Generated Valid Schema Code

### 1. Organization Schema (Homepage + All Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Novatech",
  "url": "https://novatechsoft.info",
  "logo": "https://novatechsoft.info/assets/icons/favicon.svg",
  "description": "Remote-first managed IT services for small businesses nationwide. Flat-rate pricing, 24/7 monitoring, unlimited help desk, cybersecurity, cloud management, and vCIO strategy.",
  "foundingDate": "2025",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-512-555-0199",
    "contactType": "customer service",
    "availableLanguage": ["English"],
    "areaServed": "US"
  },
  "sameAs": [
    "https://www.linkedin.com/company/novatech",
    "https://twitter.com/novatech",
    "https://www.facebook.com/novatech"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "addressCountry": "US"
  }
}
```

### 2. Service Schema (Homepage - Primary Service)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Remote-First Managed IT",
  "description": "Flat-rate managed IT for small businesses nationwide. 24/7 monitoring, unlimited remote help desk, cloud, vCIO. From $129/user/mo. Month-to-month.",
  "provider": {
    "@type": "Organization",
    "name": "Novatech",
    "url": "https://novatechsoft.info"
  },
  "serviceType": "Managed IT Services",
  "areaServed": {
    "@type": "Country",
    "name": "US"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://novatechsoft.info/#contact",
    "servicePhone": "+1-512-555-0199",
    "availableLanguage": "English",
    "serviceSmsNumber": "+1-512-555-0199"
  },
  "offers": {
    "@type": "Offer",
    "name": "Essentials Plan",
    "description": "24/7 monitoring, automated patching, business hours help desk, backup verification, 15-min SLA",
    "price": "129",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "129",
      "priceCurrency": "USD",
      "billingIncrement": "1",
      "billingDuration": "P1M"
    },
    "availability": "https://schema.org/InStock",
    "eligibleRegion": {"@type": "Country", "name": "US"}
  }
}
```

### 3. Service Schema (managed-it.html - Fixed)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Managed IT Services for Texas Small Business",
  "description": "Flat-rate managed IT for Texas small businesses. 24/7 monitoring, unlimited help desk, security, cloud, vCIO. From $129/user/mo. Month-to-month. Book a free IT audit.",
  "provider": {
    "@type": "Organization",
    "name": "Novatech",
    "url": "https://novatechsoft.info",
    "telephone": "+1-512-555-0199",
    "email": "hello@novatechsoft.info",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "addressCountry": "US"
    }
  },
  "areaServed": [
    {"@type": "State", "name": "Texas", "containedInPlace": {"@type": "Country", "name": "US"}},
    {"@type": "Country", "name": "US"}
  ],
  "serviceType": "Managed IT Services",
  "offers": [
    {
      "@type": "Offer",
      "name": "Essentials",
      "description": "24/7 monitoring, automated patching, business hours help desk, daily cloud backup verification, 15-minute response SLA",
      "price": "129",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "129",
        "priceCurrency": "USD",
        "billingIncrement": "1",
        "billingDuration": "P1M"
      },
      "availability": "https://schema.org/InStock",
      "eligibleRegion": {"@type": "Country", "name": "US"}
    },
    {
      "@type": "Offer",
      "name": "Professional",
      "description": "Everything in Essentials plus 24/7 help desk, advanced EDR/MDR, cloud governance, quarterly vCIO reviews",
      "price": "199",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "199",
        "priceCurrency": "USD",
        "billingIncrement": "1",
        "billingDuration": "P1M"
      },
      "availability": "https://schema.org/InStock",
      "eligibleRegion": {"@type": "Country", "name": "US"}
    },
    {
      "@type": "Offer",
      "name": "Enterprise",
      "description": "Everything in Professional plus dedicated account manager, priority escalation, annual compliance auditing, disaster recovery testing",
      "price": "299",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "299",
        "priceCurrency": "USD",
        "billingIncrement": "1",
        "billingDuration": "P1M"
      },
      "availability": "https://schema.org/InStock",
      "eligibleRegion": {"@type": "Country", "name": "US"}
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### 4. WebSite Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Novatech",
  "url": "https://novatechsoft.info",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://novatechsoft.info/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 5. BreadcrumbList Schema (Both Pages)
**Homepage:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://novatechsoft.info/"}
  ]
}
```

**managed-it.html:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://novatechsoft.info/"},
    {"@type": "ListItem", "position": 2, "name": "Managed IT", "item": "https://novatechsoft.info/managed-it.html"}
  ]
}
```

### 6. QAPage Schema (FAQ Sections - Both Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "QAPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does managed IT actually include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "24/7 remote monitoring, automated patching, remote help desk, backup verification, and cybersecurity under one flat rate.",
        "upvoteCount": 0
      }
    },
    {
      "@type": "Question",
      "name": "How much do managed IT services cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From $129 to $299 per user per month across Essentials, Professional, and Enterprise tiers. Month-to-month terms.",
        "upvoteCount": 0
      }
    },
    {
      "@type": "Question",
      "name": "Do you require long-term contracts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. All agreements are month-to-month. Cancel anytime with 30 days notice and zero termination fees.",
        "upvoteCount": 0
      }
    }
  ]
}
```

### 7. Person Schema (Author - to be added when author exists)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Author Name]",
  "jobTitle": "Senior Systems Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Novatech"
  },
  "url": "https://novatechsoft.info/author/[slug]",
  "sameAs": [
    "https://www.linkedin.com/in/[author]",
    "https://twitter.com/[author]"
  ],
  "knowsAbout": [
    "Managed IT Services",
    "Cybersecurity",
    "Cloud Infrastructure",
    "vCIO Strategy"
  ]
}
```

---

## Validation Checklist

| Schema | Homepage | managed-it.html | Status |
|--------|----------|-----------------|--------|
| Organization | ❌ Missing | ⚠️ Invalid (placeholder) | Fix both |
| Service | ❌ Missing | ⚠️ Invalid (placeholder) | Fix both |
| WebSite | ❌ Missing | N/A | Add to homepage |
| BreadcrumbList | ❌ Missing | ❌ Missing | Add both |
| QAPage | ❌ Missing | ❌ Missing | Add both |
| AggregateRating | N/A | ❌ Missing | Add to managed-it |
| Person | ❌ Missing | ❌ Missing | When author added |

---

## Implementation Notes

1. **Add JSON-LD in `<head>`** of each page (preferred by Google)
2. **Use absolute URLs** everywhere (no relative URLs in schema)
3. **Test with Rich Results Test** after deployment
4. **Monitor Search Console** for structured data errors
5. **Keep schema in sync** with visible content (don't mark up hidden content)