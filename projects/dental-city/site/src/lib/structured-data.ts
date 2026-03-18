import type { Locale } from "@/i18n/config";

export function getLocalBusinessSchema(locale: Locale) {
  const isEs = locale === "es";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: "Dental City Costa Rica - Aguas Zarcas",
      description: isEs
        ? "Clínica dental moderna con más de 20 años de experiencia en implantes, ortodoncia y rehabilitación oral."
        : "Modern dental clinic with 20+ years of experience in implants, orthodontics, and oral rehabilitation.",
      url: `https://dentalcitycr.com/${locale}`,
      telephone: "+506-2474-0415",
      email: "3dradiologico@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "300 oeste del CTP",
        addressLocality: "Aguas Zarcas",
        addressRegion: "San Carlos",
        addressCountry: "CR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.3417,
        longitude: -84.3283,
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"], opens: "07:30", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "08:00", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "07:00", closes: "13:00" },
      ],
      priceRange: "$$",
      image: "https://dentalcitycr.com/images/clinic/small-image1.jpeg",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "59",
        bestRating: "5",
      },
      medicalSpecialty: [
        "Orthodontics",
        "Periodontics",
        "Prosthodontics",
        "Endodontics",
        "Oral Surgery",
      ],
      availableLanguage: ["Spanish", "English"],
    },
  ];
}

export function getFAQSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(locale: Locale, pageName: string, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "es" ? "Inicio" : "Home",
        item: `https://dentalcitycr.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `https://dentalcitycr.com/${locale}/${pageUrl}`,
      },
    ],
  };
}
