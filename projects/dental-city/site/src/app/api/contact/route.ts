import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, service, message, locale } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send via nodemailer if available, otherwise log for now
    try {
      const nodemailer = await import("nodemailer");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER || "info@dentalcitycr.com",
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Dental City Website" <${process.env.GMAIL_USER || "info@dentalcitycr.com"}>`,
        to: process.env.CONTACT_EMAIL || "info@dentalcitycr.com",
        replyTo: email,
        subject: `New Inquiry from ${name}${country ? ` (${country})` : ""}${service ? ` - ${service}` : ""}`,
        html: `
          <h2>New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${country ? `<p><strong>Country:</strong> ${country}</p>` : ""}
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ""}
          <p><strong>Language:</strong> ${locale === "es" ? "Spanish" : "English"}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
    } catch {
      // If nodemailer not configured, log the inquiry
      console.log("Contact form submission:", { name, email, phone, country, service, message, locale });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
