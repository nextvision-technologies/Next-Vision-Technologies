// Receives contact, quote and demo form submissions.
// TODO: forward submissions to email (e.g. Resend), a CRM or a Google Sheet. Right now they are only logged on the server.

type Payload = { name?: string; phone?: string; email?: string; service?: string; details?: string; preferredTime?: string; variant?: string; company_website?: string };

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success so they move on.
  if (clean(body.company_website)) return Response.json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    service: clean(body.service, 120),
    details: clean(body.details),
    preferredTime: clean(body.preferredTime, 40),
    variant: body.variant === "demo" ? "demo" : "quote",
  };

  if (!data.name || !data.phone || !data.service) {
    return Response.json({ error: "Please add your name, phone number and the service you need." }, { status: 422 });
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ error: "Please check your email address." }, { status: 422 });
  }

  console.info("[contact] new submission", data);
  return Response.json({ ok: true });
}
