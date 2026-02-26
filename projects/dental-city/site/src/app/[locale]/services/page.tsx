import type { Metadata } from "next";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const ServiceIcon = ({ name }: { name: string }) => {
  const cls = "w-8 h-8 text-primary";
  switch (name) {
    case "Dental Implants":
    case "Implantes Dentales":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C10.5 2 9 3.5 9 5.5c0 1.5.5 2.5 1 3.5.5 1 1 2 1 4s-.5 4-1 5.5C9.5 20 9 21 9 22h6c0-1-.5-2-1-3.5-.5-1.5-1-3.5-1-5.5s.5-3 1-4c.5-1 1-2 1-3.5C15 3.5 13.5 2 12 2z" />
        </svg>
      );
    case "Dental Fillings":
    case "Restauraciones Dentales":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C10.5 2 9 3.5 9 5.5c0 1.5.5 2.5 1 3.5.5 1 1 2 1 4s-.5 4-1 5.5C9.5 20 9 21 9 22h6c0-1-.5-2-1-3.5-.5-1.5-1-3.5-1-5.5s.5-3 1-4c.5-1 1-2 1-3.5C15 3.5 13.5 2 12 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 10h4v4h-4z" />
        </svg>
      );
    case "Dental Crowns":
    case "Coronas Dentales":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75l3-6 3 3 3-6 3 6 3-3 3 6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75h19.5" />
        </svg>
      );
    case "Dental Bridges":
    case "Puentes Dentales":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M6 6.75v10.5M18 6.75v10.5M10 6.75v10.5M14 6.75v10.5" />
        </svg>
      );
    case "Dental Veneers":
    case "Carillas Dentales":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      );
    case "Root Canal":
    case "Endodoncia":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
        </svg>
      );
    case "All-on-Four":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      );
    case "Orthodontics":
    case "Ortodoncia":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M7 8h10M7 16h10M9 4l-2 4M15 4l2 4M9 20l-2-4M15 20l2-4" />
        </svg>
      );
    case "Periodontics":
    case "Periodoncia":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-1.607 4.02a2.25 2.25 0 01-2.093 1.43H7.9a2.25 2.25 0 01-2.093-1.43L4.2 14.5" />
        </svg>
      );
    case "Dental X-Rays & CAT Scans":
    case "Rayos X y Tomografías Dentales":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      );
    case "Oral Surgery":
    case "Cirugía Oral":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-5.383a1.5 1.5 0 010-2.121l.707-.707a1.5 1.5 0 012.121 0L12 10.086l3.136-3.127a1.5 1.5 0 012.121 0l.707.707a1.5 1.5 0 010 2.121L12.58 15.17a.75.75 0 01-1.06.1l-.1-.1z" />
        </svg>
      );
    case "Dental Prosthetics":
    case "Prótesis Dentales":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      );
    case "Teeth Whitening":
    case "Blanqueamiento Dental":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      );
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      );
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return {
      title: "Servicios Dentales | Dental City Costa Rica",
      description:
        "Servicios dentales integrales incluyendo implantes, coronas, puentes, carillas, endodoncias, All-on-Four, blanqueamiento dental y más en Dental City Costa Rica.",
    };
  }

  return {
    title: "Dental Services | Dental City Costa Rica",
    description:
      "Comprehensive dental services including implants, crowns, bridges, veneers, root canals, All-on-Four, teeth whitening, and more at Dental City Costa Rica.",
  };
}

const servicesData = {
  en: [
    {
      name: "Dental Implants",
      description:
        "Think of dental implants as artificial tooth roots, similar in shape to screws. When dental implants are placed in your jawbone, they bond with your natural bone. They become a sturdy base for supporting one or more artificial teeth, called crowns.\n\nModern dental implants have been used successfully for over 30 years. They are the strongest devices available to support replacement teeth and even better, they allow these new teeth to feel, look and function naturally.",
    },
    {
      name: "Dental Fillings",
      description:
        "To treat a cavity your dentist will remove the decayed portion of the tooth and then fill the area on the tooth where the decayed material was removed. Filling material is then inserted where the affected area was and the original shape of the tooth is restored.\n\nFillings are also used to repair cracked or broken teeth and teeth that have been worn down from misuse (such as from nail-biting or tooth grinding).",
    },
    {
      name: "Dental Crowns",
      description:
        "A dental crown is a tooth-shaped cap that is placed over a tooth to cover the tooth to restore its shape and size, strength, and improve its appearance. The crowns, when cemented into place, fully encase the entire visible portion of a tooth that lies at and above the gum line.\n\nA dental crown may be needed to protect a weak tooth from breaking, restore an already broken tooth, cover and support a tooth with a large filling, hold a dental bridge in place, cover misshapen or severely discolored teeth, cover a dental implant, or make a cosmetic modification.",
    },
    {
      name: "Dental Bridges",
      description:
        "A bridge is made up of two or more crowns for the teeth on either side of the gap — these two or more anchoring teeth are called abutment teeth — and a false tooth or teeth in between. These false teeth are called pontics and can be made from gold, alloys, porcelain, or a combination of these materials. Dental bridges are supported by natural teeth or implants.",
    },
    {
      name: "Dental Veneers",
      description:
        "Dental veneers (sometimes called porcelain veneers or dental porcelain laminates) are wafer-thin, custom-made shells of tooth-colored materials designed to cover the front surface of teeth to improve your appearance. These shells are bonded to the front of the teeth changing their color, shape, size, or length.",
    },
    {
      name: "Root Canal",
      description:
        "A root canal is a treatment used to repair and save a tooth that is badly decayed or becomes infected. During a root canal procedure, the nerve and pulp are removed and the inside of the tooth is cleaned and sealed. Without treatment, the tissue surrounding the tooth will become infected and abscesses may form.",
    },
    {
      name: "All-on-Four",
      description:
        "The term All-on-4 refers to all teeth being supported on four dental implants. It is a surgical and prosthetic procedure for total rehabilitation of patients with badly broken down, decayed, or compromised teeth due to gum disease.\n\nIt is a great way to replace removable full dentures with a permanent, non-removable bridge. This alternative creates much more stability and does not allow movement as it is attached to your dental implants. Additionally, you will not have your palate compromised, improving your sense of taste.",
    },
    {
      name: "Orthodontics",
      description:
        "Led by Dr. Francisco Rodriguez Chaves with 11 years of exclusive orthodontic practice and over 1,500 completed cases. Our orthodontic treatments straighten teeth and correct bite issues using the latest techniques. Whether you need traditional braces or modern aligners, a personalized treatment plan will be created to give you a perfect smile.",
    },
    {
      name: "Periodontics",
      description:
        "Our specialists focus on the prevention, diagnosis, and treatment of gum disease. From deep cleanings to gum surgery, we protect the foundation of your smile — your gums and the bone that supports your teeth.",
    },
    {
      name: "Dental X-Rays & CAT Scans",
      description:
        "Our clinic is equipped with state-of-the-art digital imaging technology including CBCT (cone beam computed tomography) and panoramic X-ray systems. Digital X-ray sensors provide lower radiation exposure, instant results, and higher resolution images for precise diagnosis and treatment planning.",
    },
    {
      name: "Oral Surgery",
      description:
        "From wisdom tooth extractions to complex surgical procedures, our team provides expert oral surgery in a comfortable, modern environment. We prioritize your safety and comfort throughout every procedure.",
    },
    {
      name: "Dental Prosthetics",
      description:
        "Custom-crafted dentures, partial dentures, and other prosthetic solutions to restore your smile and chewing function. We use high-quality materials for natural-looking, comfortable results that fit your lifestyle.",
    },
    {
      name: "Teeth Whitening",
      description:
        "We use the BEYOND POLUS ADVANCE whitening system — winner of the Top Whitening System award for 8 consecutive years. This professional-grade system delivers dramatically whiter teeth in a single visit, safely and comfortably.\n\nThe BEYOND POLUS ADVANCE uses a combination of halogen and LED light technology to accelerate the whitening process while minimizing sensitivity. Results are visible immediately, giving you a brighter, more confident smile.",
    },
  ],
  es: [
    {
      name: "Implantes Dentales",
      description:
        "Los implantes dentales son raíces dentales artificiales, de forma similar a tornillos. Cuando se colocan en el hueso maxilar, se integran con su hueso natural. Se convierten en una base sólida para soportar uno o más dientes artificiales, llamados coronas.\n\nLos implantes dentales modernos se han utilizado con éxito durante más de 30 años. Son los dispositivos más resistentes disponibles para soportar dientes de reemplazo y, mejor aún, permiten que estos nuevos dientes se sientan, se vean y funcionen de manera natural.",
    },
    {
      name: "Restauraciones Dentales",
      description:
        "Para tratar una caries, su dentista eliminará la porción deteriorada del diente y luego rellenará el área donde se eliminó el material cariado. El material de restauración se inserta donde estaba el área afectada y se restaura la forma original del diente.\n\nLas restauraciones también se utilizan para reparar dientes agrietados o rotos y dientes que se han desgastado por mal uso (como morderse las uñas o rechinar los dientes).",
    },
    {
      name: "Coronas Dentales",
      description:
        "Una corona dental es una funda con forma de diente que se coloca sobre un diente para cubrirlo y restaurar su forma, tamaño, resistencia y mejorar su apariencia. Las coronas, una vez cementadas en su lugar, cubren completamente toda la porción visible del diente que se encuentra en y sobre la línea de la encía.\n\nUna corona dental puede ser necesaria para proteger un diente debilitado, restaurar un diente ya roto, cubrir y soportar un diente con una gran restauración, sostener un puente dental, cubrir dientes deformados o severamente decolorados, cubrir un implante dental o realizar una modificación cosmética.",
    },
    {
      name: "Puentes Dentales",
      description:
        "Un puente está compuesto por dos o más coronas para los dientes a cada lado del espacio vacío — estos dos o más dientes de anclaje se llaman dientes pilares — y un diente o dientes falsos en el medio. Estos dientes falsos se llaman pónticos y pueden fabricarse de oro, aleaciones, porcelana o una combinación de estos materiales. Los puentes dentales son soportados por dientes naturales o implantes.",
    },
    {
      name: "Carillas Dentales",
      description:
        "Las carillas dentales (a veces llamadas carillas de porcelana o laminados de porcelana dental) son láminas ultra delgadas hechas a medida de materiales del color del diente, diseñadas para cubrir la superficie frontal de los dientes y mejorar su apariencia. Estas láminas se adhieren a la parte frontal de los dientes, cambiando su color, forma, tamaño o longitud.",
    },
    {
      name: "Endodoncia",
      description:
        "La endodoncia es un tratamiento utilizado para reparar y salvar un diente que está gravemente cariado o infectado. Durante un procedimiento de endodoncia, se extraen el nervio y la pulpa, y el interior del diente se limpia y sella. Sin tratamiento, el tejido que rodea el diente se infectará y pueden formarse abscesos.",
    },
    {
      name: "All-on-Four",
      description:
        "El término All-on-4 se refiere a que todos los dientes son soportados sobre cuatro implantes dentales. Es un procedimiento quirúrgico y protésico para la rehabilitación total de pacientes con dientes gravemente deteriorados, cariados o comprometidos por enfermedad periodontal.\n\nEs una excelente forma de reemplazar dentaduras completas removibles con un puente permanente y no removible. Esta alternativa crea mucha más estabilidad y no permite movimiento ya que está sujeto a sus implantes dentales. Además, no compromete su paladar, mejorando su sentido del gusto.",
    },
    {
      name: "Ortodoncia",
      description:
        "Liderada por el Dr. Francisco Rodriguez Chaves con 11 años de práctica exclusiva en ortodoncia y más de 1,500 casos completados. Nuestros tratamientos de ortodoncia alinean los dientes y corrigen problemas de mordida utilizando las técnicas más modernas. Ya sea que necesite brackets tradicionales o alineadores modernos, se creará un plan de tratamiento personalizado para darle una sonrisa perfecta.",
    },
    {
      name: "Periodoncia",
      description:
        "Nuestros especialistas se enfocan en la prevención, diagnóstico y tratamiento de la enfermedad periodontal. Desde limpiezas profundas hasta cirugía de encías, protegemos la base de su sonrisa — sus encías y el hueso que sostiene sus dientes.",
    },
    {
      name: "Rayos X y Tomografías Dentales",
      description:
        "Nuestra clínica está equipada con tecnología de imágenes digitales de última generación, incluyendo CBCT (tomografía computarizada de haz cónico) y sistemas de radiografía panorámica. Los sensores de rayos X digitales proporcionan menor exposición a la radiación, resultados instantáneos e imágenes de mayor resolución para un diagnóstico y planificación de tratamiento precisos.",
    },
    {
      name: "Cirugía Oral",
      description:
        "Desde extracciones de muelas del juicio hasta procedimientos quirúrgicos complejos, nuestro equipo brinda cirugía oral experta en un entorno cómodo y moderno. Priorizamos su seguridad y comodidad durante cada procedimiento.",
    },
    {
      name: "Prótesis Dentales",
      description:
        "Dentaduras, prótesis parciales y otras soluciones protésicas elaboradas a medida para restaurar su sonrisa y función masticatoria. Utilizamos materiales de alta calidad para resultados de aspecto natural y cómodos que se adaptan a su estilo de vida.",
    },
    {
      name: "Blanqueamiento Dental",
      description:
        "Utilizamos el sistema de blanqueamiento BEYOND POLUS ADVANCE — ganador del premio Top Whitening System por 8 años consecutivos. Este sistema de grado profesional ofrece dientes dramáticamente más blancos en una sola visita, de manera segura y cómoda.\n\nEl BEYOND POLUS ADVANCE utiliza una combinación de tecnología de luz halógena y LED para acelerar el proceso de blanqueamiento mientras minimiza la sensibilidad. Los resultados son visibles de inmediato, brindándole una sonrisa más brillante y segura.",
    },
  ],
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const services = servicesData[locale];
  const prefix = `/${locale}`;

  const whatsappMessage = locale === "es"
    ? (name: string) => `Hola! Me interesa el servicio de ${name}. ¿Pueden darme más información?`
    : (name: string) => `Hi! I'm interested in ${name}. Can I get more information?`;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-28 pb-12 md:pt-32 md:pb-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href={prefix}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-primary-light transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {dict.common.backToHome}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {dict.services.pageTitle}
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {dict.services.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="bg-white rounded-xl p-5 md:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1"><ServiceIcon name={svc.name} /></div>
                  <div>
                    <h2 className="text-xl font-semibold text-navy mb-3">
                      {svc.name}
                    </h2>
                    {svc.description.split("\n\n").map((p, i) => (
                      <p
                        key={i}
                        className="text-text-light text-sm leading-relaxed mb-3 last:mb-0"
                      >
                        {p}
                      </p>
                    ))}
                    <a
                      href={`https://wa.me/50683398833?text=${encodeURIComponent(whatsappMessage(svc.name))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {dict.services.askAbout} {svc.name}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {dict.servicesCta.title}
          </h2>
          <p className="text-white/80 mb-8">
            {dict.servicesCta.text}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              {dict.common.whatsappUs}
            </a>
            <a
              href="tel:+50624740415"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              {dict.hero.callUs}
            </a>
            <Link
              href={`${prefix}/#contact`}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              {dict.common.allLocations}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
