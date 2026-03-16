import Link from "next/link";
import { getAllSiteSlugs } from "@/lib/get-site-config";

export default function Home() {
  const slugs = getAllSiteSlugs();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MVP Factory</h1>
        <p className="text-gray-600 mb-8">Spec pitch sites for prospective clients</p>
        <div className="grid gap-3">
          {slugs.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="block bg-white rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <span className="font-medium text-gray-900">{slug}</span>
              <span className="text-sm text-gray-500 ml-2">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
