import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CaseList from "@/components/CaseList";
import { staffDisplayName } from "@/lib/staff";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: submissions } = await supabase
    .from("submissions")
    .select(
      "id, created_at, patient_name, patient_email, patient_country, status, assigned_to, total_us_price, total_dc_price, total_savings, savings_percentage, procedures, ai_confidence, preferred_contact"
    )
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen">
      <Header userEmail={user.email || ""} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <CaseList submissions={submissions || []} />
      </main>
    </div>
  );
}

function Header({ userEmail }: { userEmail: string }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-900">Dental City</h1>
          <span className="text-xs bg-cyan-100 text-cyan-700 font-medium px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:inline">
            {staffDisplayName(userEmail) !== userEmail
              ? staffDisplayName(userEmail)
              : userEmail}
          </span>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
