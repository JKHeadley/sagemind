import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/get-site-config";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default async function SiteHomepage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const config = await getSiteConfig(site);
  if (!config) notFound();

  return (
    <>
      <Hero config={config} />

      <StatsBar stats={config.about.stats} />

      <ServicesGrid
        services={config.services}
        layout={config.layout.servicesLayout}
        subtitle={`Quality ${config.industry.replace("-", " ")} services you can trust.`}
      />

      <ReviewsSection
        reviews={config.reviews.staticReviews}
        averageRating={config.reviews.averageRating}
        totalReviews={config.reviews.totalReviews}
      />

      {/* About preview */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-text">
              {config.about.headline}
            </h2>
            {config.about.paragraphs.slice(0, 2).map((p, i) => (
              <p key={i} className="text-text-light leading-relaxed mb-4">{p}</p>
            ))}
            <a
              href={`/${config.slug}/about`}
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              Learn more about us &rarr;
            </a>
          </div>
          <div className="hidden md:block">
            <div className="bg-surface-alt aspect-[4/3] flex items-center justify-center" style={{ borderRadius: "var(--site-radius, 12px)" }}>
              <span className="text-text-light text-sm">Photo coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={config.faq.slice(0, 4)} title="Common Questions" />

      <CTASection config={config} />
    </>
  );
}
