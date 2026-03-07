"use client";

import { useEffect, useRef } from "react";

interface FacebookPageEmbedProps {
  locale: string;
}

export default function FacebookPageEmbed({ locale }: FacebookPageEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Facebook SDK
    const fbLocale = locale === "es" ? "es_LA" : "en_US";

    if (typeof window !== "undefined" && !document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = `https://connect.facebook.net/${fbLocale}/sdk.js#xfbml=1&version=v21.0`;
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    } else if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).FB) {
      // Re-parse if SDK already loaded
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const FB = (window as any).FB;
      FB.XFBML.parse(containerRef.current);
    }
  }, [locale]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/dentalcityaz"
        data-tabs="timeline"
        data-width="500"
        data-height="800"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/dentalcityaz"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/dentalcityaz">Dental City</a>
        </blockquote>
      </div>
    </div>
  );
}
