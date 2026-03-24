import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateEstimatePdf, type EstimateProcedure, type EstimatePatient } from "@/lib/pdf-estimate";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  // Auth
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get submission ID from query
  const submissionId = request.nextUrl.searchParams.get("id");
  if (!submissionId) {
    return NextResponse.json({ error: "Missing submission ID" }, { status: 400 });
  }

  // Fetch submission (only if it belongs to the user)
  const { data: submission, error: dbError } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", submissionId)
    .eq("user_id", user.id)
    .single();

  if (dbError || !submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  // Generate PDF
  const patient: EstimatePatient = {
    name: submission.patient_name,
    email: submission.patient_email,
    phone: submission.patient_phone || "",
    country: submission.patient_country || "",
    preferredContact: submission.preferred_contact || "email",
  };

  const procedures: EstimateProcedure[] = (submission.procedures || []).map(
    (p: { name: string; usPrice: number; dcPrice: number; confidence: string }) => ({
      name: p.name,
      usPrice: p.usPrice,
      dcPrice: p.dcPrice,
      confidence: p.confidence as "high" | "medium" | "low",
    })
  );

  const pdfBuffer = await generateEstimatePdf(patient, procedures);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Dental City Estimate - ${submission.patient_name}.pdf"`,
    },
  });
}
