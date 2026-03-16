import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/get-site-config";
import { generateThemeCSS, getGoogleFontsUrl } from "@/lib/theme-utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClickToCall from "@/components/ui/ClickToCall";
import ChatWidget from "@/components/ui/ChatWidget";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ site: string }>;
}): Promise<Metadata> {
  const { site } = await params;
  const config = await getSiteConfig(site);
  if (!config) return {};

  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      type: "website",
      url: `https://${config.slug}.sagemindai.io`,
    },
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const config = await getSiteConfig(site);

  if (!config) {
    notFound();
  }

  const themeCSS = generateThemeCSS(config.theme);
  const fontsUrl = getGoogleFontsUrl(config.theme);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href={fontsUrl} rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
      <SchemaMarkup config={config} />
      <Header config={config} />
      <main>{children}</main>
      <Footer config={config} />
      <ChatWidget config={config} />
      <ClickToCall phone={config.phone} />
    </>
  );
}
