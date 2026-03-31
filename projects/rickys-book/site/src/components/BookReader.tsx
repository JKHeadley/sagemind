"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import type { NavItem } from "@/lib/content";

interface BookReaderProps {
  children: React.ReactNode;
  items: NavItem[];
  lang: string;
  bookTitle: string;
  bookSubtitle: string;
  languages: { code: string; name: string }[];
  currentSlug: string;
}

export default function BookReader({
  children,
  items,
  lang,
  bookTitle,
  bookSubtitle,
  languages,
  currentSlug,
}: BookReaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar
        items={items}
        lang={lang}
        bookTitle={bookTitle}
        bookSubtitle={bookSubtitle}
        languages={languages}
        currentSlug={currentSlug}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-book-border bg-book-bg/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded p-1 hover:bg-book-sidebar-hover"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="font-[Merriweather,Georgia,serif] text-sm font-semibold text-book-heading">
            {bookTitle}
          </span>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-12 lg:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
