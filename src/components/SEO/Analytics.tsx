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
      
      {/* Meta Pixel (Facebook) */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq.error = () => { console.log("Meta Pixel was blocked by the browser."); };
          fbq('init', '1406004940026269'); // Replace with actual Pixel ID if available
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}
