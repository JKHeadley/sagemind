import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getManifest,
  getNavItems,
  resolveContent,
  getLanguages,
  LANGUAGE_NAMES,
  getAllSlugs,
} from "@/lib/content";
import BookReader from "@/components/BookReader";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PageProps {
  params: Promise<{ lang: string; slug: string[] }>;
}

export default async function ReaderPage({ params }: PageProps) {
  const { lang, slug } = await params;

  // Check access
  const cookieStore = await cookies();
  const access = cookieStore.get("book_access");
  if (!access || access.value !== "granted") {
    redirect("/");
  }

  // Validate language
  const languages = getLanguages();
  if (!languages.includes(lang)) {
    redirect("/");
  }

  const manifest = getManifest();
  const navItems = getNavItems();
  const currentSlug = slug.join("/");

  // Resolve content
  const resolved = resolveContent(lang, slug);

  const languageOptions = languages.map((code) => ({
    code,
    name: LANGUAGE_NAMES[code] || code,
  }));

  return (
    <BookReader
      items={navItems}
      lang={lang}
      bookTitle={manifest.title}
      bookSubtitle={manifest.subtitle}
      languages={languageOptions}
      currentSlug={currentSlug}
    >
      {resolved ? (
        <MarkdownRenderer content={resolved.content} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-book-muted">
            {lang === "en"
              ? "This section is not yet available."
              : "This section is not yet available in this language."}
          </p>
          <p className="mt-2 text-sm text-book-muted">
            Try switching to English for the original content.
          </p>
        </div>
      )}
    </BookReader>
  );
}

export async function generateStaticParams() {
  const languages = getLanguages();
  const slugs = getAllSlugs();
  const params: { lang: string; slug: string[] }[] = [];

  for (const lang of languages) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}
