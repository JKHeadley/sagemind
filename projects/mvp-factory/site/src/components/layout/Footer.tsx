import Link from "next/link";
import type { SiteConfig } from "@/config/types";

export default function Footer({ config }: { config: SiteConfig }) {
  const prefix = `/${config.slug}`;
  const digits = config.phone.replace(/\D/g, "");
  const variant = config.layout.footerVariant;

  if (variant === "centered") {
    return (
      <footer className="bg-footer-bg text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">{config.businessName}</h3>
          <p className="text-white/60 mb-4">{config.tagline}</p>
          <p className="text-white/60 text-sm mb-2">
            {config.address.street}, {config.address.city}, {config.address.state} {config.address.zip}
          </p>
          <a href={`tel:+1${digits}`} className="text-primary-light hover:text-white transition-colors">
            {config.phone}
          </a>
          <div className="flex justify-center gap-4 mt-6">
            {config.socialLinks.yelp && (
              <a href={config.socialLinks.yelp} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">Yelp</a>
            )}
            {config.socialLinks.instagram && (
              <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">Instagram</a>
            )}
            {config.socialLinks.facebook && (
              <a href={config.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">Facebook</a>
            )}
          </div>
          <p className="text-white/30 text-xs mt-8">
            &copy; {new Date().getFullYear()} {config.businessName}. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-3">
            <a href="https://sagemindai.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors">
              Built with AI by <span className="font-semibold text-primary-light">Sagemind AI</span>
            </a>
          </p>
        </div>
      </footer>
    );
  }

  if (variant === "compact") {
    return (
      <footer className="bg-footer-bg text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{config.businessName}</h3>
            <p className="text-white/60 text-sm">{config.address.city}, {config.address.state}</p>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:+1${digits}`} className="text-primary-light hover:text-white transition-colors text-sm">{config.phone}</a>
            {config.socialLinks.yelp && (
              <a href={config.socialLinks.yelp} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">Yelp</a>
            )}
            {config.socialLinks.instagram && (
              <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">Instagram</a>
            )}
          </div>
          <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} {config.businessName}</p>
          <p className="text-white/40 text-xs mt-1">
            <a href="https://sagemindai.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors">
              Built with AI by <span className="font-semibold text-primary-light">Sagemind AI</span>
            </a>
          </p>
        </div>
      </footer>
    );
  }

  // Full footer
  return (
    <footer className="bg-footer-bg text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">{config.businessName}</h3>
          <p className="text-white/60 text-sm mb-4">{config.tagline}</p>
          <div className="flex gap-3">
            {config.socialLinks.yelp && (
              <a href={config.socialLinks.yelp} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">Yelp</a>
            )}
            {config.socialLinks.instagram && (
              <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">Instagram</a>
            )}
            {config.socialLinks.facebook && (
              <a href={config.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">Facebook</a>
            )}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2">
            {["Services", "About", "FAQ", "Contact"].map((label) => (
              <Link key={label} href={`${prefix}/${label.toLowerCase()}`} className="block text-white/60 hover:text-white text-sm transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-white/60 text-sm">
            <p>{config.address.street}</p>
            <p>{config.address.city}, {config.address.state} {config.address.zip}</p>
            <a href={`tel:+1${digits}`} className="block text-primary-light hover:text-white transition-colors">{config.phone}</a>
            {config.email && <a href={`mailto:${config.email}`} className="block hover:text-white transition-colors">{config.email}</a>}
          </div>
          <div className="mt-4">
            <h5 className="text-white/80 text-sm font-medium mb-1">Hours</h5>
            {config.hours.map((h) => (
              <p key={h.day} className="text-white/50 text-xs">{h.day}: {h.hours}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-center text-white/30 text-xs">
        <p>&copy; {new Date().getFullYear()} {config.businessName}. All rights reserved.</p>
        <p className="text-white/40 mt-3">
          <a href="https://sagemindai.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors">
            Built with AI by <span className="font-semibold text-primary-light">Sagemind AI</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
