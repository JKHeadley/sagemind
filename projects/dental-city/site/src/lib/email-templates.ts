import nodemailer from "nodemailer";

interface ProcedureSummary {
  name: string;
  usPrice: number;
  dcPrice: number;
}

interface SubmissionEmailData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientCountry: string;
  preferredContact: string;
  procedures: ProcedureSummary[];
  totalUs: number;
  totalDc: number;
  totalSavings: number;
  savingsPercentage: number;
  driveFolderUrl: string;
  fileCount: number;
  submittedAt: string;
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER || "info@dentalcitycr.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

const BRAND = {
  navy: "#0c1e2b",
  primary: "#0e7490",
  accent: "#06b6d4",
  green: "#059669",
  text: "#1e293b",
  textLight: "#64748b",
  surface: "#f0fdfa",
};

/**
 * Send clinic notification email when a new estimate is submitted.
 */
export async function sendClinicNotification(data: SubmissionEmailData): Promise<void> {
  const transporter = getTransporter();

  const procedureRows = data.procedures
    .map(
      (p) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${p.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;color:${BRAND.textLight};">$${p.usPrice.toLocaleString()}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:bold;color:${BRAND.primary};">$${p.dcPrice.toLocaleString()}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
      <div style="background:${BRAND.navy};padding:20px 30px;text-align:center;">
        <h1 style="color:white;margin:0;font-size:22px;">New Estimate Submission</h1>
        <p style="color:${BRAND.accent};margin:5px 0 0;font-size:13px;">Dental City CR</p>
      </div>

      <div style="padding:25px 30px;">
        <h2 style="color:${BRAND.primary};font-size:16px;margin:0 0 15px;">Patient Information</h2>
        <table style="width:100%;font-size:14px;color:${BRAND.text};">
          <tr><td style="padding:4px 0;color:${BRAND.textLight};width:140px;">Name:</td><td style="padding:4px 0;font-weight:bold;">${data.patientName}</td></tr>
          <tr><td style="padding:4px 0;color:${BRAND.textLight};">Email:</td><td style="padding:4px 0;">${data.patientEmail}</td></tr>
          <tr><td style="padding:4px 0;color:${BRAND.textLight};">Phone:</td><td style="padding:4px 0;">${data.patientPhone || "Not provided"}</td></tr>
          <tr><td style="padding:4px 0;color:${BRAND.textLight};">Country:</td><td style="padding:4px 0;">${data.patientCountry || "Not provided"}</td></tr>
          <tr><td style="padding:4px 0;color:${BRAND.textLight};">Preferred Contact:</td><td style="padding:4px 0;font-weight:bold;">${data.preferredContact}</td></tr>
          <tr><td style="padding:4px 0;color:${BRAND.textLight};">Submitted:</td><td style="padding:4px 0;">${data.submittedAt}</td></tr>
        </table>

        <h2 style="color:${BRAND.primary};font-size:16px;margin:25px 0 10px;">Procedures Detected</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr style="background:${BRAND.navy};">
            <th style="padding:8px 12px;text-align:left;color:white;">Procedure</th>
            <th style="padding:8px 12px;text-align:right;color:white;">US Price</th>
            <th style="padding:8px 12px;text-align:right;color:white;">DC Price</th>
          </tr>
          ${procedureRows}
          <tr style="background:${BRAND.navy};">
            <td style="padding:10px 12px;color:white;font-weight:bold;">TOTAL</td>
            <td style="padding:10px 12px;text-align:right;color:white;font-weight:bold;">$${data.totalUs.toLocaleString()}</td>
            <td style="padding:10px 12px;text-align:right;color:${BRAND.accent};font-weight:bold;">$${data.totalDc.toLocaleString()}</td>
          </tr>
        </table>

        <div style="background:${BRAND.surface};border:1px solid #99f6e4;border-radius:6px;padding:15px;margin:20px 0;text-align:center;">
          <p style="margin:0;font-size:18px;font-weight:bold;color:${BRAND.green};">
            Savings: $${data.totalSavings.toLocaleString()} (${data.savingsPercentage}%)
          </p>
        </div>

        ${data.driveFolderUrl ? `
        <div style="text-align:center;margin:20px 0;">
          <a href="${data.driveFolderUrl}" style="display:inline-block;background:${BRAND.primary};color:white;padding:12px 30px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:14px;">
            View Case Files (${data.fileCount} files)
          </a>
        </div>` : `
        <div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;padding:12px;margin:20px 0;text-align:center;">
          <p style="margin:0;font-size:13px;color:#92400e;">Drive upload pending — files will be available shortly.</p>
        </div>`}
      </div>

      <div style="background:${BRAND.navy};padding:15px 30px;text-align:center;">
        <p style="color:${BRAND.accent};margin:0;font-size:12px;">Dental City CR | Let Your Smile Change the World</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Dental City Website" <${process.env.GMAIL_USER || "info@dentalcitycr.com"}>`,
    to: "info@dentalcitycr.com",
    subject: `New Estimate Submission — ${data.patientName} (${data.patientCountry || "Unknown"})`,
    html,
  });
}

/**
 * Send patient confirmation email after they submit their estimate.
 */
export async function sendPatientConfirmation(
  patientEmail: string,
  patientName: string,
  preferredContact: string,
  locale: string = "en"
): Promise<void> {
  const transporter = getTransporter();
  const isEs = locale === "es";

  const firstName = patientName.split(" ")[0];

  const subject = isEs
    ? "Su Cotización de Dental City Ha Sido Recibida"
    : "Your Dental City Estimate Has Been Received";

  const greeting = isEs ? `Hola ${firstName},` : `Dear ${firstName},`;

  const body = isEs
    ? `<p>¡Gracias por enviar su cotización dental a Dental City!</p>
       <p>Nuestro equipo médico está revisando sus documentos y se comunicará con usted
       dentro de <strong>48-72 horas hábiles</strong> a través de su método preferido
       (<strong>${preferredContact}</strong>).</p>
       <p>Mientras tanto, puede ver su comparación de cotización en cualquier momento
       iniciando sesión en su cuenta en <a href="https://dentalcitycr.com">dentalcitycr.com</a>.</p>
       <p>Si tiene preguntas, contáctenos a <a href="mailto:info@dentalcitycr.com">info@dentalcitycr.com</a>.</p>
       <p>Saludos cordiales,<br/>El Equipo de Dental City<br/>Aguas Zarcas, Costa Rica<br/>dentalcitycr.com</p>`
    : `<p>Thank you for submitting your dental estimate to Dental City!</p>
       <p>Our medical team is reviewing your documents and will contact you
       within <strong>48-72 business hours</strong> via your preferred method
       (<strong>${preferredContact}</strong>).</p>
       <p>In the meantime, you can view your estimate comparison anytime
       by logging into your account at <a href="https://dentalcitycr.com">dentalcitycr.com</a>.</p>
       <p>If you have questions, contact us at <a href="mailto:info@dentalcitycr.com">info@dentalcitycr.com</a>.</p>
       <p>Warm regards,<br/>The Dental City Team<br/>Aguas Zarcas, Costa Rica<br/>dentalcitycr.com</p>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
      <div style="background:${BRAND.navy};padding:20px 30px;text-align:center;">
        <h1 style="color:white;margin:0;font-size:20px;">DENTAL CITY</h1>
        <p style="color:${BRAND.accent};margin:5px 0 0;font-size:12px;">Let Your Smile Change the World</p>
      </div>

      <div style="padding:25px 30px;color:${BRAND.text};font-size:14px;line-height:1.6;">
        <p style="font-size:16px;font-weight:bold;">${greeting}</p>
        ${body}
      </div>

      <div style="background:${BRAND.navy};padding:15px 30px;text-align:center;">
        <p style="color:#94a3b8;margin:0;font-size:11px;">
          Tel: +506 8339 8833 | Email: info@dentalcitycr.com | Web: dentalcitycr.com
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Dental City" <${process.env.GMAIL_USER || "info@dentalcitycr.com"}>`,
    to: patientEmail,
    subject,
    html,
  });
}
