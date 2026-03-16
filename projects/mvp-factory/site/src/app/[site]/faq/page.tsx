import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/get-site-config";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default async function FAQPage({
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-white/80">
            Find answers to common questions about {config.businessName}.
          </p>
        </div>
      </section>

      <FAQSection items={config.faq} title="" />

      <CTASection config={config} />
    </>
  );
}
