"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/lib/content";

interface SidebarProps {
  items: NavItem[];
  lang: string;
  bookTitle: string;
  bookSubtitle: string;
  languages: { code: string; name: string }[];
  currentSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  items,
  lang,
  bookTitle,
  bookSubtitle,
  languages,
  currentSlug,
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
    // Auto-expand the chapter containing the current section
    const expanded = new Set<string>();
    let currentChapter = "";
    for (const item of items) {
      if (item.isChapter) {
        currentChapter = item.id;
      }
      if (item.slug === currentSlug) {
        expanded.add(currentChapter);
      }
    }
    return expanded;
  });

  function toggleChapter(id: string) {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  // Group items by part
  let currentPart = "";
  let currentChapterId = "";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 flex h-full w-72 flex-col border-r border-book-border bg-book-sidebar transition-transform lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-book-border p-4">
          <Link href={`/${lang}/00-front-matter/preface`} onClick={onClose}>
            <h2 className="font-[Merriweather,Georgia,serif] text-lg font-bold text-book-heading">
              {bookTitle}
            </h2>
            <p className="mt-0.5 text-xs italic text-book-muted">
              {bookSubtitle}
            </p>
          </Link>

          {/* Language switcher */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {languages.map((l) => (
              <Link
                key={l.code}
                href={pathname.replace(`/${lang}/`, `/${l.code}/`)}
                className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                  l.code === lang
                    ? "bg-book-accent text-white"
                    : "bg-book-sidebar-hover text-book-muted hover:bg-book-sidebar-active"
                }`}
                onClick={onClose}
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {items.map((item, idx) => {
            // Track part changes
            if (item.partTitle && item.partTitle !== currentPart) {
              currentPart = item.partTitle;
            }

            if (item.isChapter) {
              currentChapterId = item.id;
              const isExpanded = expandedChapters.has(item.id);
              return (
                <div key={item.id}>
                  {/* Part header - show when first chapter of a part */}
                  {item.partTitle &&
                    (idx === 0 ||
                      items[idx - 1]?.partTitle !== item.partTitle) && (
                      <div className="mt-4 mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-book-muted">
                        {item.partTitle}
                      </div>
                    )}
                  <button
                    onClick={() => toggleChapter(item.id)}
                    className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm font-semibold text-book-heading transition-colors hover:bg-book-sidebar-hover"
                  >
                    <svg
                      className={`h-3 w-3 shrink-0 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {item.chapterNumber}. {item.title}
                    </span>
                  </button>
                </div>
              );
            }

            if (item.isSubchapter) {
              if (!expandedChapters.has(currentChapterId)) return null;
              return (
                <div
                  key={item.id}
                  className="mt-1.5 mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-book-muted"
                  style={{ paddingLeft: `${(item.depth + 1) * 12}px` }}
                >
                  {item.title}
                </div>
              );
            }

            // Regular section
            const isActive = currentSlug === item.slug;
            const isUnderChapter =
              item.depth > 0 && !expandedChapters.has(currentChapterId);
            if (isUnderChapter) return null;

            return (
              <Link
                key={item.id}
                href={`/${lang}/${item.slug}`}
                onClick={onClose}
                className={`block rounded px-2 py-1 text-sm transition-colors ${
                  isActive
                    ? "bg-book-sidebar-active font-medium text-book-heading"
                    : "text-book-text hover:bg-book-sidebar-hover"
                }`}
                style={{ paddingLeft: `${(item.depth + 1) * 12}px` }}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* PDF Download */}
        <div className="border-t border-book-border p-3">
          <a
            href={`/pdfs/the-hidden-gate-${lang}.pdf`}
            download
            className="flex items-center justify-center gap-2 rounded-lg border border-book-border bg-white px-3 py-2 text-sm font-medium text-book-accent transition-colors hover:bg-book-sidebar-hover"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </a>
        </div>
      </aside>
    </>
  );
}
