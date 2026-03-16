"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(el);

          // Extract numeric part
          const match = value.match(/^([\d,.]+)/);
          if (!match) {
            setDisplay(value);
            return;
          }

          const numStr = match[1].replace(/,/g, "");
          const target = parseFloat(numStr);
          const prefix = "";
          const suffix = value.slice(match[0].length);
          const hasComma = match[1].includes(",");
          const duration = 1500;
          const steps = 40;
          const stepTime = duration / steps;

          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            const formatted = hasComma
              ? current.toLocaleString()
              : current.toString();
            setDisplay(`${prefix}${formatted}${suffix}`);

            if (step >= steps) {
              clearInterval(interval);
              setDisplay(value);
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-1">{display}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}
