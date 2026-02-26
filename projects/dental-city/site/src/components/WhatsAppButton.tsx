"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/50683398833"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-7 h-7"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.908 15.908 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.32 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.322-5.66-1.216-4.752-1.966-7.808-6.786-8.044-7.1-.228-.314-1.87-2.49-1.87-4.748s1.184-3.37 1.604-3.83c.42-.46.918-.574 1.224-.574.304 0 .612.004.878.016.282.014.662-.106.974.744.338.88 1.142 2.786 1.244 2.986.1.2.168.434.034.7-.134.268-.2.434-.4.67-.2.234-.42.522-.6.7-.2.2-.408.418-.176.818.234.4 1.04 1.714 2.232 2.776 1.532 1.366 2.824 1.79 3.224 1.99.4.2.634.168.868-.1.234-.268 1-.168 1-.168s1.184.702 1.384.83c.2.134.334.2.384.308.05.114.05.646-.34 1.746v-.028z" />
      </svg>
    </a>
  );
}
