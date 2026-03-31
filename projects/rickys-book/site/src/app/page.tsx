"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      document.cookie = "book_access=granted; path=/; max-age=86400; SameSite=Strict";
      router.push("/es/00-front-matter/preface");
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-book-bg px-4">
      <div className="w-full max-w-md text-center">
        {/* Book icon */}
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-book-sidebar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-book-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h1 className="font-[Merriweather,Georgia,serif] text-3xl font-bold text-book-heading">
            The Hidden Gate
          </h1>
          <p className="mt-2 font-[Merriweather,Georgia,serif] text-sm italic text-book-muted">
            An Analytical Framework for the Seen and the Unseen
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg border border-book-border bg-white px-4 py-3 text-center text-book-text placeholder-book-muted/60 focus:border-book-accent focus:outline-none focus:ring-1 focus:ring-book-accent"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">
              Incorrect password. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-book-accent px-4 py-3 font-medium text-white transition-colors hover:bg-book-accent/90 disabled:opacity-50"
          >
            {loading ? "..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
