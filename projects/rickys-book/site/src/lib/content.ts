import fs from "fs";
import path from "path";

export interface Section {
  id: string;
  title: string;
  file: string;
  placeholder?: boolean;
}

export interface SubChapter {
  id: string;
  title: string;
  dir: string;
  sections: Section[];
  subchapters?: SubChapter[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  dir: string;
  sections: Section[];
  subchapters?: SubChapter[];
}

export interface Part {
  id: string;
  title: string;
  subtitle?: string;
  dir?: string;
  sections?: Section[];
  chapters?: Chapter[];
}

export interface BookManifest {
  title: string;
  subtitle: string;
  languages: string[];
  defaultLanguage: string;
  parts: Part[];
}

// On Vercel, content is copied into site/content by the build script.
// Locally, it lives at ../content relative to site/.
const CONTENT_ROOT = fs.existsSync(path.join(process.cwd(), "content", "book.json"))
  ? path.join(process.cwd(), "content")
  : path.join(process.cwd(), "..", "content");

let cachedManifest: BookManifest | null = null;

export function getManifest(): BookManifest {
  if (cachedManifest) return cachedManifest;
  const raw = fs.readFileSync(
    path.join(CONTENT_ROOT, "book.json"),
    "utf-8"
  );
  cachedManifest = JSON.parse(raw) as BookManifest;
  return cachedManifest;
}

export function getLanguages() {
  return getManifest().languages;
}

export function getDefaultLanguage() {
  return getManifest().defaultLanguage;
}

export const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  nl: "Nederlands",
  fr: "Français",
  pt: "Português",
};

/**
 * Read a section's markdown content for a given language.
 */
export function getSectionContent(
  lang: string,
  dirPath: string,
  filename: string
): string | null {
  const filePath = path.join(CONTENT_ROOT, lang, dirPath, filename);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

/**
 * Build a flat list of all navigable sections with their full paths.
 */
export interface NavItem {
  id: string;
  title: string;
  slug: string;
  depth: number;
  isChapter?: boolean;
  isSubchapter?: boolean;
  chapterNumber?: number;
  partTitle?: string;
}

function flattenSubchapters(
  subchapters: SubChapter[],
  parentDir: string,
  depth: number,
  items: NavItem[]
) {
  for (const sub of subchapters) {
    const subDir = parentDir + "/" + sub.dir;
    items.push({
      id: sub.id,
      title: sub.title,
      slug: subDir,
      depth,
      isSubchapter: true,
    });
    for (const section of sub.sections) {
      items.push({
        id: section.id,
        title: section.title,
        slug: subDir + "/" + section.file.replace(".md", ""),
        depth: depth + 1,
      });
    }
    if (sub.subchapters) {
      flattenSubchapters(sub.subchapters, subDir, depth + 1, items);
    }
  }
}

export function getNavItems(): NavItem[] {
  const manifest = getManifest();
  const items: NavItem[] = [];

  for (const part of manifest.parts) {
    // Front matter
    if (part.sections) {
      for (const section of part.sections) {
        items.push({
          id: section.id,
          title: section.title,
          slug: (part.dir || "") + "/" + section.file.replace(".md", ""),
          depth: 0,
          partTitle: part.title,
        });
      }
    }

    // Chapters
    if (part.chapters) {
      for (const chapter of part.chapters) {
        items.push({
          id: chapter.id,
          title: chapter.title,
          slug: chapter.dir,
          depth: 0,
          isChapter: true,
          chapterNumber: chapter.number,
          partTitle: part.title,
        });

        for (const section of chapter.sections) {
          items.push({
            id: section.id,
            title: section.title,
            slug: chapter.dir + "/" + section.file.replace(".md", ""),
            depth: 1,
          });
        }

        if (chapter.subchapters) {
          flattenSubchapters(chapter.subchapters, chapter.dir, 1, items);
        }
      }
    }
  }

  return items;
}

/**
 * Given a slug array, resolve to the markdown content.
 */
export function resolveContent(
  lang: string,
  slugParts: string[]
): { title: string; content: string; dirPath: string } | null {
  const manifest = getManifest();
  const slug = slugParts.join("/");

  // Search all parts, chapters, subchapters, and sections
  for (const part of manifest.parts) {
    // Front matter sections
    if (part.sections) {
      for (const section of part.sections) {
        const sectionSlug =
          (part.dir || "") + "/" + section.file.replace(".md", "");
        if (sectionSlug === slug) {
          const content = getSectionContent(
            lang,
            part.dir || "",
            section.file
          );
          return content
            ? { title: section.title, content, dirPath: part.dir || "" }
            : null;
        }
      }
    }

    if (!part.chapters) continue;

    for (const chapter of part.chapters) {
      // Chapter-level sections
      for (const section of chapter.sections) {
        const sectionSlug =
          chapter.dir + "/" + section.file.replace(".md", "");
        if (sectionSlug === slug) {
          const content = getSectionContent(lang, chapter.dir, section.file);
          return content
            ? { title: section.title, content, dirPath: chapter.dir }
            : null;
        }
      }

      // Subchapters (recursive)
      if (chapter.subchapters) {
        const result = resolveFromSubchapters(
          lang,
          slug,
          chapter.subchapters,
          chapter.dir
        );
        if (result) return result;
      }
    }
  }

  return null;
}

function resolveFromSubchapters(
  lang: string,
  slug: string,
  subchapters: SubChapter[],
  parentDir: string
): { title: string; content: string; dirPath: string } | null {
  for (const sub of subchapters) {
    const subDir = parentDir + "/" + sub.dir;
    for (const section of sub.sections) {
      const sectionSlug = subDir + "/" + section.file.replace(".md", "");
      if (sectionSlug === slug) {
        const content = getSectionContent(lang, subDir, section.file);
        return content
          ? { title: section.title, content, dirPath: subDir }
          : null;
      }
    }
    if (sub.subchapters) {
      const result = resolveFromSubchapters(
        lang,
        slug,
        sub.subchapters,
        subDir
      );
      if (result) return result;
    }
  }
  return null;
}

/**
 * Get all possible slug paths for static generation.
 */
export function getAllSlugs(): string[][] {
  const items = getNavItems();
  return items
    .filter((item) => !item.isChapter && !item.isSubchapter)
    .map((item) => item.slug.split("/"));
}
