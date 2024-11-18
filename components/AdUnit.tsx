"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

function AdUnit() {
  useEffect(() => {
    // Push ad refresh when component mounts
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);
  return (
    <>
      {/* Load AdSense script once */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9203839200996716"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className="w-full flex justify-center my-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-9203839200996716"
          data-ad-slot="2020833760"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}
export default AdUnit;
