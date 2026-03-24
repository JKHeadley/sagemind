import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createPatientFolder, uploadFileToDrive, uploadPdfToDrive } from "@/lib/google-drive";
import { generateEstimatePdf, type EstimateProcedure, type EstimatePatient } from "@/lib/pdf-estimate";
import { sendClinicNotification, sendPatientConfirmation } from "@/lib/email-templates";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  // ── 1. Auth ──
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

  // ── 2. Parse FormData ──
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const proceduresJson = formData.get("procedures") as string | null;
  const consentStr = formData.get("consent") as string | null;
  const locale = (formData.get("locale") as string) || "en";

  if (consentStr !== "true") {
    return NextResponse.json({ error: "Consent is required" }, { status: 400 });
  }

  let procedures: { name: string; usPrice: number; dcPrice: number; confidence: "high" | "medium" | "low" }[];
  try {
    procedures = JSON.parse(proceduresJson || "[]");
  } catch {
    return NextResponse.json({ error: "Invalid procedures data" }, { status: 400 });
  }

  if (procedures.length === 0) {
    return NextResponse.json({ error: "No procedures provided" }, { status: 400 });
  }

  // Collect uploaded files from FormData
  const files: File[] = [];
  for (const [key, value] of formData.entries()) {
    if (key === "files" && value instanceof File) {
      files.push(value);
    }
  }

  // ── 3. Get patient profile ──
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, country, locale, preferred_contact")
    .eq("id", user.id)
    .single();

  const meta = user.user_metadata || {};
  const patientName = profile?.full_name || meta.full_name || "Patient";
  const patientEmail = user.email || "";
  const patientPhone = profile?.phone || meta.phone || "";
  const patientCountry = profile?.country || meta.country || "";
  const preferredContact = profile?.preferred_contact || meta.preferred_contact || "email";

  // ── 4. Calculate totals (with 10% buffer) ──
  const BUFFER = 1.10;
  const totalUs = procedures.reduce((sum, p) => sum + p.usPrice, 0);
  const totalDc = procedures.reduce((sum, p) => sum + Math.round(p.dcPrice * BUFFER), 0);
  const totalSavings = totalUs - totalDc;
  const savingsPercentage = totalUs > 0 ? Math.round((totalSavings / totalUs) * 100) : 0;

  // Overall AI confidence (lowest)
  const confidenceLevels = { high: 3, medium: 2, low: 1 };
  const lowestConfidence = procedures.reduce(
    (lowest, p) => (confidenceLevels[p.confidence] < confidenceLevels[lowest] ? p.confidence : lowest),
    "high" as "high" | "medium" | "low"
  );

  // ── 5. Google Drive — create folder + upload files ──
  let driveFolderId = "";
  let driveFolderUrl = "";
  const uploadedFiles: { name: string; type: string; size: number; driveFileId: string; driveUrl: string; isGenerated: boolean }[] = [];

  try {
    const folder = await createPatientFolder(patientName);
    driveFolderId = folder.folderId;
    driveFolderUrl = folder.folderUrl;

    // Upload original files
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadFileToDrive(driveFolderId, file.name, file.type, buffer);
      uploadedFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        driveFileId: result.fileId,
        driveUrl: result.fileUrl,
        isGenerated: false,
      });
    }
  } catch (err) {
    console.error("Drive upload failed:", err instanceof Error ? err.message : err);
    // Continue without Drive — still save the submission
  }

  // ── 6. Generate branded PDF ──
  let brandedPdfId = "";
  let pdfError = "";
  try {
    const patient: EstimatePatient = {
      name: patientName,
      email: patientEmail,
      phone: patientPhone,
      country: patientCountry,
      preferredContact,
    };

    const pdfProcedures: EstimateProcedure[] = procedures.map((p) => ({
      name: p.name,
      usPrice: p.usPrice,
      dcPrice: p.dcPrice,
      confidence: p.confidence,
    }));

    const pdfBuffer = await generateEstimatePdf(patient, pdfProcedures);
    const pdfFileName = `Dental City Estimate - ${patientName}.pdf`;

    if (driveFolderId) {
      const pdfResult = await uploadPdfToDrive(driveFolderId, pdfFileName, pdfBuffer);
      brandedPdfId = pdfResult.fileId;
      uploadedFiles.push({
        name: pdfFileName,
        type: "application/pdf",
        size: pdfBuffer.length,
        driveFileId: pdfResult.fileId,
        driveUrl: pdfResult.fileUrl,
        isGenerated: true,
      });
    }
  } catch (err) {
    pdfError = err instanceof Error ? err.message : String(err);
    console.error("PDF generation failed:", pdfError);
  }

  // ── 7. Save to Supabase ──
  const { data: submission, error: dbError } = await supabase
    .from("submissions")
    .insert({
      user_id: user.id,
      patient_name: patientName,
      patient_email: patientEmail,
      patient_phone: patientPhone,
      patient_country: patientCountry,
      preferred_contact: preferredContact,
      locale,
      procedures,
      total_us_price: totalUs,
      total_dc_price: totalDc,
      total_savings: totalSavings,
      savings_percentage: savingsPercentage,
      drive_folder_id: driveFolderId || null,
      drive_folder_url: driveFolderUrl || null,
      branded_pdf_id: brandedPdfId || null,
      file_count: uploadedFiles.length,
      consent_given: true,
      consent_timestamp: new Date().toISOString(),
      status: "new",
      ai_confidence: lowestConfidence,
    })
    .select("id")
    .single();

  if (dbError) {
    console.error("Supabase insert failed:", dbError);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  // Insert file records
  if (uploadedFiles.length > 0 && submission) {
    const fileRecords = uploadedFiles.map((f) => ({
      submission_id: submission.id,
      file_name: f.name,
      file_type: f.type,
      file_size: f.size,
      drive_file_id: f.driveFileId,
      drive_url: f.driveUrl,
      is_generated: f.isGenerated,
    }));

    await supabase.from("submission_files").insert(fileRecords);
  }

  // ── 8. Send emails (must await — Vercel kills the function after response) ──
  const submittedAt = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Costa_Rica",
    timeZoneName: "short",
  });

  let clinicEmailError = "";
  let patientEmailError = "";

  await Promise.all([
    sendClinicNotification({
      patientName,
      patientEmail,
      patientPhone,
      patientCountry,
      preferredContact,
      procedures: procedures.map((p) => ({
        name: p.name,
        usPrice: p.usPrice,
        dcPrice: Math.round(p.dcPrice * BUFFER),
      })),
      totalUs,
      totalDc,
      totalSavings,
      savingsPercentage,
      driveFolderUrl,
      fileCount: uploadedFiles.length,
      submittedAt,
    }).catch((err) => {
      clinicEmailError = err instanceof Error ? err.message : String(err);
      console.error("Clinic email failed:", clinicEmailError);
    }),
    sendPatientConfirmation(patientEmail, patientName, preferredContact, locale)
      .catch((err) => {
        patientEmailError = err instanceof Error ? err.message : String(err);
        console.error("Patient email failed:", patientEmailError);
      }),
  ]);

  return NextResponse.json({
    success: true,
    submissionId: submission.id,
    driveFolderUrl: driveFolderUrl || null,
    warnings: {
      ...(pdfError && { pdf: pdfError }),
      ...(clinicEmailError && { clinicEmail: clinicEmailError }),
      ...(patientEmailError && { patientEmail: patientEmailError }),
    },
  });
}
