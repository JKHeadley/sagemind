"use client";

import { useAuth } from "@/components/AuthProvider";
import { useDict } from "@/i18n/useDict";

export default function ProfilePage() {
  const { user } = useAuth();
  const dict = useDict();

  const meta = user?.user_metadata || {};

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        {dict.profilePage.myProfile}
      </h1>
      <p className="text-text-light mb-6">
        {dict.profilePage.accountInfo}
      </p>

      <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 space-y-5">
        <div>
          <label className="block text-xs font-medium text-text-light mb-1">
            {dict.profilePage.fullName}
          </label>
          <p className="text-navy font-medium">{meta.full_name || "—"}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1">
            {dict.profilePage.email}
          </label>
          <p className="text-navy font-medium">{user?.email || "—"}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1">
            {dict.profilePage.phone}
          </label>
          <p className="text-navy font-medium">{meta.phone || "—"}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1">
            {dict.profilePage.country}
          </label>
          <p className="text-navy font-medium">{meta.country || "—"}</p>
        </div>
      </div>
    </div>
  );
}
