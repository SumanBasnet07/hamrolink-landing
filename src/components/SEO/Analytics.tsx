"use client";

import React, { useEffect } from 'react';
import Script from 'next/script';

export function Analytics() {
  const GA_ID = "G-WB92TMXQE7"; // Existing GA ID from layout.tsx
  const FB_PIXEL_ID = "1136658188215341";

  // Track clicks on primary CTAs leading to app.hamrolink.com as InitiateCheckout
  useEffect(() => {
    const handleCTAClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href && target.href.includes('app.hamrolink.com')) {
        console.log('InitiateCheckout CTA clicked!');
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'InitiateCheckout');
        }
      }
    };

    document.addEventListener('click', handleCTAClick);
    return () => document.removeEventListener('click', handleCTAClick);
  }, []);
  
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `
      }} />
      
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
      
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `
      }} />
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}
      
    </>
  );
}
