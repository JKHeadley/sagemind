import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Hidden Gate",
  description: "An Analytical Framework for the Seen and the Unseen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-book-bg text-book-text font-[Inter,system-ui,sans-serif]">
        {children}
      </body>
    </html>
  );
}
