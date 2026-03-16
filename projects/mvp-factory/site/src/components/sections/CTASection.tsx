import Button from "@/components/ui/Button";
import type { SiteConfig } from "@/config/types";

export default function CTASection({ config }: { config: SiteConfig }) {
  const digits = config.phone.replace(/\D/g, "");

  return (
    <section className="py-16 md:py-24 bg-primary text-text-on-primary">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Contact us today for a free consultation. We&apos;re here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:+1${digits}`}
            className="inline-block font-semibold px-8 py-3.5 text-lg bg-white text-primary hover:bg-gray-100 transition-colors pulse-soft"
            style={{ borderRadius: "var(--site-radius, 12px)" }}
          >
            Call {config.phone}
          </a>
          <Button href={`/${config.slug}/contact`} variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:text-white">
            Send a Message
          </Button>
        </div>
      </div>
    </section>
  );
}
