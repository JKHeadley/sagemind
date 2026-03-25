"use client";

import DashboardNav from "@/components/DashboardNav";
import { useDict } from "@/i18n/useDict";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = useDict();

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 md:pb-12 px-4">
      <div className="max-w-6xl mx-auto flex gap-8">
        <DashboardNav dict={dict} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
