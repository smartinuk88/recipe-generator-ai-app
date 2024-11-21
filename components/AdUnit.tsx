"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

function AdUnit() {
  const isProduction = process.env.NODE_ENV === "production";

  useEffect(() => {
    // Push ad refresh when component mounts
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);

  // Show placeholder in development
  if (!isProduction) {
    return (
      <div className="w-full flex justify-center my-4 h-[250px] bg-gray-200 items-center">
        <p className="text-gray-500">Ad Placeholder (Development)</p>
      </div>
    );
  }
  return (
    <>
      {/* Load AdSense script once */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className="w-full flex justify-center my-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}
export default AdUnit;
