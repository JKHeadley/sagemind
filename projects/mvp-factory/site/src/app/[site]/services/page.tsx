import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/get-site-config";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CTASection from "@/components/sections/CTASection";

export default async function ServicesPage({
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Professional {config.industry.replace("-", " ")} services tailored to your needs.
          </p>
        </div>
      </section>

      <ServicesGrid
        services={config.services}
        layout={config.layout.servicesLayout}
        title=""
      />

      <CTASection config={config} />
    </>
  );
}
