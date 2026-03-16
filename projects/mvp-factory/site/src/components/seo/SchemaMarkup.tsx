import type { SiteConfig } from "@/config/types";

export default function SchemaMarkup({ config }: { config: SiteConfig }) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": config.seo.schemaType,
    name: config.businessName,
    description: config.seo.description,
    telephone: config.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.zip,
      addressCountry: "US",
    },
    url: `https://${config.slug}.sagemindai.io`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: config.reviews.averageRating,
      reviewCount: config.reviews.totalReviews,
    },
    openingHoursSpecification: config.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      description: h.hours,
    })),
  };

  const faqSchema = config.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
