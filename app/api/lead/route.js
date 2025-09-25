import { NextResponse } from "next/server";

// Option A: Email via Resend (recommended)
//   1) npm i resend
//   2) Add RESEND_API_KEY in Vercel → Settings → Environment Variables
//   3) Add LEAD_TO_EMAIL (your address)
//   4) (Optional) verify a domain in Resend to customize the "from" address
import { Resend } from "resend";
const resendKey = process.env.RESEND_API_KEY;
const toEmail   = process.env.LEAD_TO_EMAIL || "alexandravalencia.traveladvisor@gmail.com";
const resend = resendKey ? new Resend(resendKey) : null;

// Option B: Webhook (Zapier/Make/Formspree/Sheets). If you prefer this,
// set LEAD_WEBHOOK_URL in Vercel and we’ll POST JSON there.
const webhookUrl = process.env.LEAD_WEBHOOK_URL || null;

export async function POST(req) {
  try {
    const { name, email, phone, sourceStep } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Send email if Resend is configured
    if (resend) {
      const html = `
        <h3>New LEXVOYAGE enrolment started</h3>
        <ul>
          <li><b>Name:</b> ${escapeHtml(name)}</li>
          <li><b>Email:</b> ${escapeHtml(email)}</li>
          <li><b>Phone:</b> ${escapeHtml(phone)}</li>
          <li><b>Step:</b> ${sourceStep ?? 1}</li>
          <li><b>Time (UTC):</b> ${new Date().toISOString()}</li>
        </ul>`;
      await resend.emails.send({
        from: "LEXVOYAGE <notify@yourdomain.com>", // use a domain you verify in Resend
        to: [toEmail],
        subject: "New ITA/Rep enrolment started",
        html,
      });
      return NextResponse.json({ ok: true });
    }

    // Fallback: POST to your webhook if configured
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, sourceStep, startedAt: new Date().toISOString() }),
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: "No email/webhook configured. Set RESEND_API_KEY + LEAD_TO_EMAIL or LEAD_WEBHOOK_URL." },
      { status: 500 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
}
