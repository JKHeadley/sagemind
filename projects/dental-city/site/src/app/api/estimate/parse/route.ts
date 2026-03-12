import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { parseEstimateDocument, matchProcedure } from "@/lib/claude";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  // Verify auth via Authorization header
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

  // Rate limit: max 5 AI uploads per user per day
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count } = await supabase
    .from("estimates")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("source_type", "ai_upload")
    .gte("created_at", today.toISOString());

  if ((count || 0) >= 5) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Maximum 5 AI uploads per day." },
      { status: 429 }
    );
  }

  // Parse multipart form data
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type and size
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Accepted: JPG, PNG, WebP, PDF" },
      { status: 400 }
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large. Maximum 10MB." },
      { status: 400 }
    );
  }

  // Convert file to base64
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  // Parse with Claude (with timeout)
  try {
    const timeoutMs = 30_000;
    const result = await Promise.race([
      parseEstimateDocument(base64, file.type),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("AI analysis timed out")), timeoutMs)
      ),
    ]);

    // Map extracted items to known procedures
    const mappedItems = result.items.map((item) => ({
      ...item,
      matchedSlug: matchProcedure(item.procedureName),
    }));

    if (mappedItems.length === 0) {
      return NextResponse.json(
        {
          items: [],
          warnings: [
            "We couldn't identify any dental procedures in this document. Please try a clearer image or PDF of your dental estimate.",
          ],
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      items: mappedItems,
      warnings: result.warnings,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message.includes("timed out")) {
      return NextResponse.json(
        { error: "Analysis took too long. Please try a smaller or clearer file." },
        { status: 504 }
      );
    }

    console.error("Estimate parse error:", message);
    return NextResponse.json(
      { error: "Failed to analyze your document. Please try again." },
      { status: 500 }
    );
  }
}
