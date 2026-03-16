"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function AnimateOnScroll({
  children,
  delay,
  className = "",
}: {
  children: ReactNode;
  delay?: 100 | 200 | 300;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `delay-${delay}` : "";

  return (
    <div ref={ref} className={`animate-on-scroll ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
