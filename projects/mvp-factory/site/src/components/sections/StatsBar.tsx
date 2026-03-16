"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatsBar({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="bg-primary py-14">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-text-on-primary stagger-children is-visible">
        {stats.map((s) => (
          <AnimatedCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}
