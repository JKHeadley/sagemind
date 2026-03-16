import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/get-site-config";
import StatsBar from "@/components/sections/StatsBar";
import CTASection from "@/components/sections/CTASection";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const config = await getSiteConfig(site);
  if (!config) notFound();

  return (
    <>
      <section className="bg-header-bg text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{config.about.headline}</h1>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {config.about.paragraphs.map((p, i) => (
            <p key={i} className="text-text-light leading-relaxed mb-6 text-lg">{p}</p>
          ))}
        </div>
      </section>

      <StatsBar stats={config.about.stats} />

      <CTASection config={config} />
    </>
  );
}
