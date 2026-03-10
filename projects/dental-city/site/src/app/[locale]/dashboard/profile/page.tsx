"use client";

import { useAuth } from "@/components/AuthProvider";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";

  const meta = user?.user_metadata || {};

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        {isEs ? "Mi Perfil" : "My Profile"}
      </h1>
      <p className="text-text-light mb-6">
        {isEs ? "Su información de cuenta." : "Your account information."}
      </p>

      <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 space-y-5">
        <div>
          <label className="block text-xs font-medium text-text-light mb-1">
            {isEs ? "Nombre Completo" : "Full Name"}
          </label>
          <p className="text-navy font-medium">{meta.full_name || "—"}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1">
            {isEs ? "Correo Electrónico" : "Email"}
          </label>
          <p className="text-navy font-medium">{user?.email || "—"}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1">
            {isEs ? "Teléfono" : "Phone"}
          </label>
          <p className="text-navy font-medium">{meta.phone || "—"}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1">
            {isEs ? "País" : "Country"}
          </label>
          <p className="text-navy font-medium">{meta.country || "—"}</p>
        </div>
      </div>
    </div>
  );
}
