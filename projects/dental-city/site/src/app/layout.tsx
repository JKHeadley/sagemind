import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dental City Costa Rica | Affordable Dental Tourism",
    template: "%s | Dental City Costa Rica",
  },
  description:
    "Save 50–70% on dental implants, orthodontics, and smile makeovers at Dental City Costa Rica. 20+ years experience, bilingual team, 5-star reviews.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
