"use client";

import React from 'react';
import Script from 'next/script';

export function Analytics() {
  const GA_ID = "G-WB92TMXQE7"; // Existing GA ID from layout.tsx
  
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      
      {/* Plausible (Privacy-focused) */}
      <Script
        defer
        data-domain="hamrolink.com"
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
        onError={(e) => {
          console.log("Plausible Analytics was blocked by the browser. This is expected if an ad-blocker is active.");
        }}
      />
      
    </>
  );
}
