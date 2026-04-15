// src/components/SEO/SEOHead.tsx
import React from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
  lang?: 'en' | 'ne'
  schema?: object
}

/**
 * Note: In Next.js App Router, prefer using the metadata API in layout.tsx or page.tsx.
 * This component can be used for injecting additional meta tags or scripts if needed,
 * but generateMetadata is the standard way.
 */
export function SEOHead({ 
  title, 
  description, 
  keywords, 
  ogImage = '/og-image.png',
  canonical,
  noindex = false,
  lang = 'ne',
  schema 
}: SEOProps) {
  const SITE_URL = 'https://hamrolink.com'
  const fullUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL
  const langPrefix = lang === 'ne' ? '/ne' : '/en'
  
  return (
    <>
      <title>{title ? `${title} | HamroLink` : 'HamroLink - Nepal ko AI Website Builder'}</title>
      <meta name="description" content={description || 'Nepal ko first AI-powered website builder with eSewa/Khalti payments and 24/7 chatbot'} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}${ogImage}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'ne' ? 'ne_NP' : 'en_US'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${ogImage}`} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      
      {/* Schema.org */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  )
}
