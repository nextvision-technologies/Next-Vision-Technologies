// Receives contact form, demo booking and chatbot lead submissions, and emails them to the team.
//
// Email is sent with Resend (https://resend.com). Set these environment variables (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY   required, e.g. re_xxxxxxxx
//   CONTACT_TO       optional, inbox that receives leads (default: info@nextvision-technologies.com)
//   CONTACT_FROM     optional, sender. Until your domain is verified in Resend, keep the default onboarding@resend.dev
//                    (Resend then only delivers to the email address you signed up with).
import { site } from "@/content/site";

type Payload = { name?: string; phone?: string; email?: string; service?: string; details?: string; preferredTime?: string; variant?: string; company_website?: string };

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Lead = { name: string; phone: string; email: string; service: string; details: string; preferredTime: string; variant: "demo" | "quote" };

function buildEmail(d: Lead) {
  const kind = d.variant === "demo" ? "Demo booking" : "Quote request";
  const digits = d.phone.replace(/\D/g, "");
  const rows: [string, string][] = [
    ["Type", kind],
    ["Name", d.name],
    ["WhatsApp / phone", d.phone],
    ["Email", d.email || "—"],
    ["Service", d.service],
    ...(d.preferredTime ? ([["Preferred time", d.preferredTime]] as [string, string][]) : []),
    ["Details", d.details || "—"],
  ];
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #ece5f4;border-radius:12px;overflow:hidden">
  <div style="background:linear-gradient(120deg,#6d28d9,#c026d3 45%,#ff9a3c);padding:18px 22px;color:#fff">
    <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.85">${esc(site.name)}</div>
    <div style="font-size:20px;font-weight:bold;margin-top:4px">New ${esc(kind.toLowerCase())}</div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${rows.map(([k, v], i) => `<tr style="background:${i % 2 ? "#faf6fd" : "#fff"}"><td style="padding:10px 22px;color:#625a78;width:150px;vertical-align:top">${esc(k)}</td><td style="padding:10px 22px;color:#1f0a4d;white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}
  </table>
  <div style="padding:16px 22px">
    ${digits.length >= 7 ? `<a href="https://wa.me/${digits}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:10px 16px;border-radius:999px;font-weight:bold;margin-right:8px">Reply on WhatsApp</a>` : ""}
    ${d.email ? `<a href="mailto:${esc(d.email)}" style="display:inline-block;background:#1f0a4d;color:#fff;text-decoration:none;padding:10px 16px;border-radius:999px;font-weight:bold">Reply by email</a>` : ""}
  </div>
</div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { subject: `${kind}: ${d.name} (${d.service})`, html, text };
}

async function sendEmail(d: Lead) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[contact] RESEND_API_KEY is not set, so the lead was only logged:", d);
    return false;
  }
  const { subject, html, text } = buildEmail(d);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || `Next Vision Website <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO || site.email],
      reply_to: d.email || undefined,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return true;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success so they move on.
  if (clean(body.company_website)) return Response.json({ ok: true });

  const data: Lead = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    service: clean(body.service, 120),
    details: clean(body.details),
    preferredTime: clean(body.preferredTime, 60),
    variant: body.variant === "demo" ? "demo" : "quote",
  };

  if (!data.name || !data.phone || !data.service) {
    return Response.json({ error: "Please add your name, phone number and the service you need." }, { status: 422 });
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ error: "Please check your email address." }, { status: 422 });
  }

  console.info("[contact] new submission", data);
  try {
    await sendEmail(data);
  } catch (err) {
    console.error("[contact] email failed", err);
    return Response.json(
      { error: `Sorry, we couldn't send your message. Please WhatsApp us on ${site.phones[0].value} or email ${site.email}.` },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
