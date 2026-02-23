import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { salon } from "@/lib/config";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: `${salon.name} — ${salon.tagline}`,
  description: `Book your appointment at ${salon.name} in ${salon.city}, ${salon.state}. Online booking available 24/7.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <a href="/" className="text-xl font-bold text-salon-text tracking-tight">
              {salon.name}
            </a>
            <nav className="hidden sm:flex items-center gap-8 text-sm text-text-muted">
              <a href="/#services" className="hover:text-salon-text transition-colors">Services</a>
              <a href="/#team" className="hover:text-salon-text transition-colors">Our Team</a>
              <a href="/#contact" className="hover:text-salon-text transition-colors">Contact</a>
            </nav>
            <a href="/book" className="btn-book text-sm py-2 px-5">
              Book Now
            </a>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-salon-text text-white/70 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-3">{salon.name}</h3>
                <p className="text-sm">{salon.tagline}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Visit Us</h3>
                <p className="text-sm">
                  {salon.address}<br />
                  {salon.city}, {salon.state} {salon.zip}
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Contact</h3>
                <p className="text-sm">
                  <a href={`tel:${salon.phone}`} className="hover:text-white transition-colors">{salon.phone}</a><br />
                  <a href={`mailto:${salon.email}`} className="hover:text-white transition-colors">{salon.email}</a>
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-white/40">
              &copy; {new Date().getFullYear()} {salon.name}. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
