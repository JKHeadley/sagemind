"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";
  const prefix = `/${locale}`;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        {isEs ? "Panel de Control" : "Dashboard"}
      </h1>
      <p className="text-text-light mb-8">
        {isEs
          ? `Bienvenido/a, ${user?.user_metadata?.full_name || user?.email}`
          : `Welcome, ${user?.user_metadata?.full_name || user?.email}`}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href={`${prefix}/dashboard/estimate`}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>
          </div>
          <h2 className="font-semibold text-navy text-lg mb-1">
            {isEs ? "Herramienta de Estimado" : "Estimate Tool"}
          </h2>
          <p className="text-text-light text-sm">
            {isEs
              ? "Seleccione procedimientos y compare precios de EE.UU. con los de Dental City."
              : "Select procedures and compare US prices with Dental City pricing."}
          </p>
        </Link>

        <Link
          href={`${prefix}/pricing`}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          </div>
          <h2 className="font-semibold text-navy text-lg mb-1">
            {isEs ? "Precios y Ahorros" : "Pricing & Savings"}
          </h2>
          <p className="text-text-light text-sm">
            {isEs
              ? "Vea cuánto puede ahorrar y suba su cotización de EE.UU."
              : "See how much you can save and upload your US quote."}
          </p>
        </Link>
      </div>
    </div>
  );
}
