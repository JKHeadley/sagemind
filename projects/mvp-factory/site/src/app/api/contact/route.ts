import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  // Rate limiting: 5 submissions per hour per IP
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const limiter = rateLimit.get(ip);

  if (limiter && limiter.resetAt > now && limiter.count >= 5) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  if (!limiter || limiter.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3600000 });
  } else {
    limiter.count++;
  }

  try {
    const body = await request.json();
    const { name, email, phone, service, message, businessSlug, businessName, website } = body;

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Send email if SMTP is configured
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const recipient = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;

      await transporter.sendMail({
        from: `"${businessName} Website" <${process.env.GMAIL_USER}>`,
        to: recipient,
        subject: `[MVP Lead] ${businessName} — New contact from ${name}`,
        html: `
          <h2>New Lead from ${businessName} MVP Site</h2>
          <p><strong>Business:</strong> ${businessName} (${businessSlug})</p>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        text: `New Lead from ${businessName} (${businessSlug})\n\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}${service ? `Service: ${service}\n` : ""}\nMessage:\n${message}`,
      });
    } else {
      // Log to console if no SMTP configured
      console.log("[MVP Lead]", { businessName, businessSlug, name, email, phone, service, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
