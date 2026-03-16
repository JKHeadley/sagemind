"use client";

export default function ClickToCall({ phone }: { phone: string }) {
  const digits = phone.replace(/\D/g, "");

  return (
    <a
      href={`tel:+1${digits}`}
      className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-dark text-text-on-primary font-semibold px-5 py-3 shadow-lg transition-colors flex items-center gap-2 md:hidden"
      style={{ borderRadius: "var(--site-radius, 12px)" }}
      aria-label={`Call ${phone}`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
      Call Now
    </a>
  );
}
