import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const prefix = `/${locale}`;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-2">DENTAL CITY</h3>
            <p className="text-primary-light text-sm tracking-wider uppercase mb-4">
              Costa Rica
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {dict.footer.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/dentalcityaz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary-light transition-colors"
                aria-label="Facebook Aguas Zarcas"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://wa.me/50683398833"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary-light transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.quickLinks}</h4>
            <div className="space-y-2 text-sm text-white/60">
              <Link href={prefix} className="block hover:text-primary-light transition-colors">
                {dict.nav.home}
              </Link>
              <Link href={`${prefix}/services`} className="block hover:text-primary-light transition-colors">
                {dict.nav.services}
              </Link>
              <Link href={`${prefix}/team`} className="block hover:text-primary-light transition-colors">
                {dict.nav.team}
              </Link>
              <Link href={`${prefix}/gallery`} className="block hover:text-primary-light transition-colors">
                {dict.nav.gallery}
              </Link>
              <Link href={`${prefix}/#contact`} className="block hover:text-primary-light transition-colors">
                {dict.nav.contact}
              </Link>
            </div>
          </div>

          {/* Location 1 -- Aguas Zarcas */}
          <div>
            <h4 className="font-semibold mb-4">Aguas Zarcas</h4>
            <div className="space-y-3 text-sm text-white/60">
              <p>
                Edificio Dental City, 300 oeste del CTP, Aguas Zarcas, Costa Rica
              </p>
              <a
                href="tel:+50624740415"
                className="block hover:text-primary-light transition-colors"
              >
                +506 2474 0415
              </a>
              <a
                href="https://wa.me/50683398833"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary-light transition-colors"
              >
                WhatsApp: +506 8339 8833
              </a>
              <a
                href="mailto:3dradiologico@gmail.com"
                className="block hover:text-primary-light transition-colors"
              >
                3dradiologico@gmail.com
              </a>
              <div>
                <p>{dict.contact.hoursAZ1}</p>
                <p>{dict.contact.hoursAZ2}</p>
                <p>{dict.contact.hoursAZ3}</p>
                <p>{dict.contact.hoursAZ4}</p>
              </div>
            </div>
          </div>

          {/* Location 2 -- Sarapiqui */}
          <div>
            <h4 className="font-semibold mb-4">La Virgen, Sarapiqui</h4>
            <div className="space-y-3 text-sm text-white/60">
              <p>
                Edificio Dental City Frente a la Plaza de Deportes, La Virgen, Sarapiqui, Costa Rica
              </p>
              <a
                href="tel:+50683883535"
                className="block hover:text-primary-light transition-colors"
              >
                +506 8388 3535
              </a>
              <a
                href="mailto:dentalcitycostarica@gmail.com"
                className="block hover:text-primary-light transition-colors"
              >
                dentalcitycostarica@gmail.com
              </a>
              <a
                href="https://www.facebook.com/dentalcitysarapiqui"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary-light transition-colors"
              >
                Facebook: Dental City Sarapiqui
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
          &copy; {new Date().getFullYear()} Dental City Costa Rica. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
