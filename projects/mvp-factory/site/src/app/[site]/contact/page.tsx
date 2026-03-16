import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/get-site-config";
import ContactForm from "@/components/ui/ContactForm";
import GoogleMap from "@/components/sections/GoogleMap";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const config = await getSiteConfig(site);
  if (!config) notFound();

  const digits = config.phone.replace(/\D/g, "");

  return (
    <>
      <section className="bg-header-bg text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-white/80">We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-text">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-text-light text-sm">
                  {config.address.street}<br />
                  {config.address.city}, {config.address.state} {config.address.zip}
                </p>
                <a
                  href={config.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                >
                  Get Directions &rarr;
                </a>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href={`tel:+1${digits}`} className="text-primary hover:text-primary-dark text-lg font-medium transition-colors">
                  {config.phone}
                </a>
              </div>

              {config.email && (
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href={`mailto:${config.email}`} className="text-primary hover:text-primary-dark transition-colors">
                    {config.email}
                  </a>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Hours</h3>
                <div className="text-text-light text-sm space-y-1">
                  {config.hours.map((h) => (
                    <div key={h.day} className="flex justify-between max-w-xs">
                      <span>{h.day}</span>
                      <span className="font-medium">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <GoogleMap
                embedUrl={config.address.googleMapsEmbedUrl}
                address={`${config.address.street}, ${config.address.city}`}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-text">
              Send Us a Message
            </h2>
            <div className="bg-surface p-6 md:p-8 relative" style={{ borderRadius: "var(--site-radius, 12px)" }}>
              <ContactForm
                businessSlug={config.slug}
                businessName={config.businessName}
                services={config.services.map((s) => s.name)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
