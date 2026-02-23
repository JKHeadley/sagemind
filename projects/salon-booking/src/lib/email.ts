// ============================================================
// Email Confirmations — Salon-branded
// ============================================================

import nodemailer from "nodemailer";
import { salon } from "./config";
import type { Service, Stylist } from "./types";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

const emailStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2d2926; margin: 0; padding: 0; background: #f5f0eb; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
  .header { background: ${salon.colors.primary}; color: white; padding: 24px; }
  .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
  .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
  .content { padding: 24px; }
  .highlight { background: #faf8f5; padding: 16px; border-radius: 8px; border-left: 4px solid ${salon.colors.primary}; margin: 16px 0; }
  .field { margin-bottom: 12px; }
  .label { font-weight: 600; color: #8c8279; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
  .value { margin-top: 2px; color: #2d2926; }
  .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid #e8e2db; font-size: 12px; color: #8c8279; }
`;

export async function sendBookingConfirmations(
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  service: Service,
  stylist: Stylist,
  slotStart: string,
  slotDisplay: string,
  notes?: string
) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;

  const transporter = getTransporter();
  const dateStr = formatDate(slotStart);

  // Email to salon owner
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
    subject: `New Appointment: ${customerName} — ${service.name} with ${stylist.name}`,
    html: `<!DOCTYPE html><html><head><style>${emailStyles}</style></head><body>
      <div class="container"><div class="card">
        <div class="header">
          <h1>New Appointment Booked</h1>
          <p>${salon.name}</p>
        </div>
        <div class="content">
          <div class="highlight">
            <strong style="font-size: 16px;">${dateStr}</strong><br>
            <span style="color: #8c8279;">${slotDisplay} Pacific</span>
          </div>
          <div class="field"><div class="label">Client</div><div class="value">${customerName}</div></div>
          <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${customerEmail}">${customerEmail}</a></div></div>
          <div class="field"><div class="label">Phone</div><div class="value"><a href="tel:${customerPhone}">${customerPhone}</a></div></div>
          <div class="field"><div class="label">Service</div><div class="value">${service.name} (${service.durationMinutes} min — $${service.price})</div></div>
          <div class="field"><div class="label">Stylist</div><div class="value">${stylist.name}</div></div>
          ${notes ? `<div class="field"><div class="label">Notes</div><div class="value">${notes}</div></div>` : ""}
          <div class="footer">This event has been added to ${stylist.name}'s calendar.</div>
        </div>
      </div></div>
    </body></html>`,
  });

  // Confirmation email to customer
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: customerEmail,
    subject: `Your Appointment at ${salon.name} — ${dateStr}`,
    html: `<!DOCTYPE html><html><head><style>${emailStyles}</style></head><body>
      <div class="container"><div class="card">
        <div class="header">
          <h1>Appointment Confirmed!</h1>
          <p>${salon.name}</p>
        </div>
        <div class="content">
          <p>Hi ${customerName},</p>
          <p>Your appointment has been confirmed:</p>
          <div class="highlight">
            <strong style="font-size: 16px;">${dateStr}</strong><br>
            <span style="color: #8c8279;">${slotDisplay} Pacific</span>
          </div>
          <div class="field"><div class="label">Service</div><div class="value">${service.name} (${service.durationMinutes} min)</div></div>
          <div class="field"><div class="label">Stylist</div><div class="value">${stylist.name}</div></div>
          <div class="field"><div class="label">Price</div><div class="value">$${service.price}</div></div>
          <div class="field"><div class="label">Location</div><div class="value">${salon.address}, ${salon.city}, ${salon.state} ${salon.zip}</div></div>
          <p style="margin-top: 20px;">Need to reschedule? Reply to this email or call us at <a href="tel:${salon.phone}">${salon.phone}</a>.</p>
          <p>See you soon!</p>
          <div class="footer">${salon.name} | ${salon.address}, ${salon.city}, ${salon.state} ${salon.zip} | ${salon.phone}</div>
        </div>
      </div></div>
    </body></html>`,
  });
}
