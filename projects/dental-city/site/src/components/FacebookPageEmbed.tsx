"use client";

import { useEffect, useRef, useState } from "react";

interface FacebookPageEmbedProps {
  locale: string;
}

export default function FacebookPageEmbed({ locale }: FacebookPageEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Track container width to re-render the plugin on resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = Math.floor(entry.contentRect.width);
        // FB plugin max is 500, min is 180
        const clamped = Math.min(500, Math.max(180, width));
        setContainerWidth(clamped);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load SDK and re-parse when width changes
  useEffect(() => {
    if (containerWidth === 0) return;

    const fbLocale = locale === "es" ? "es_LA" : "en_US";

    if (typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    if (!document.getElementById("facebook-jssdk")) {
      // Define the callback before loading the SDK
      win.fbAsyncInit = () => {
        win.FB.init({ xfbml: true, version: "v21.0" });
      };

      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = `https://connect.facebook.net/${fbLocale}/sdk.js`;
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    } else if (win.FB) {
      win.FB.XFBML.parse(containerRef.current);
    }
  }, [locale, containerWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center overflow-hidden"
    >
      {containerWidth > 0 && (
        <div
          key={containerWidth}
          className="fb-page"
          data-href="https://www.facebook.com/dentalcityaz"
          data-tabs="timeline"
          data-width={String(containerWidth)}
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
      )}
    </div>
  );
}
