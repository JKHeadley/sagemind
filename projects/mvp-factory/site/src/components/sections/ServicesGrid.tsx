import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { ServiceItem, ServicesLayout } from "@/config/types";

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <AnimateOnScroll delay={index < 3 ? ((index * 100) as 100 | 200 | 300) : undefined}>
      <div
        className="bg-bg p-6 shadow-sm card-hover h-full"
        style={{ borderRadius: "var(--site-radius, 12px)" }}
      >
        <h3 className="font-semibold text-lg mb-2 text-primary-dark">
          {service.name}
        </h3>
        <p className="text-text-light text-sm leading-relaxed">{service.description}</p>
      </div>
    </AnimateOnScroll>
  );
}

export default function ServicesGrid({
  services,
  layout = "grid-3",
  title = "Our Services",
  subtitle,
}: {
  services: ServiceItem[];
  layout?: ServicesLayout;
  title?: string;
  subtitle?: string;
}) {
  const gridCols: Record<ServicesLayout, string> = {
    "grid-3": "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
    "grid-2": "grid sm:grid-cols-2 gap-6",
    alternating: "grid sm:grid-cols-2 gap-6",
    carousel: "flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory",
  };

  return (
    <section className="py-12 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-text">
          {title}
        </h2>
        {subtitle && (
          <p className="text-text-light text-center mb-12 max-w-2xl mx-auto">{subtitle}</p>
        )}
        <div className={gridCols[layout]}>
          {services.map((svc, i) => (
            <div key={svc.name} className={layout === "carousel" ? "min-w-[300px] snap-start" : ""}>
              <ServiceCard service={svc} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
