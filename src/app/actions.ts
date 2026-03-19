"use server";

// ─── SES Waitlist Server Action ───────────────────────────────────────────────

const enc = (s: string) => new TextEncoder().encode(s);

function toHex(buf: Uint8Array): string {
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256hex(msg: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", enc(msg));
  return toHex(new Uint8Array(buf));
}

async function hmacSha256(
  key: ArrayBuffer | Uint8Array | string,
  msg: string,
): Promise<ArrayBuffer> {
  const k =
    typeof key === "string"
      ? await crypto.subtle.importKey(
          "raw",
          enc(key),
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"],
        )
      : await crypto.subtle.importKey(
          "raw",
          key as BufferSource,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"],
        );
  return crypto.subtle.sign("HMAC", k, enc(msg));
}

// ─── Private AWS SES Helper ──────────────────────────────────────────────────
async function sendSESEmail(params: {
  from: string;
  to: string;
  subject: string;
  body: string;
  html?: string;
}): Promise<void> {
  const region = process.env.AWS_REGION ?? "ap-south-1";
  const accessKey = process.env.AWS_ACCESS_KEY_ID ?? "";
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY ?? "";
  const d = new Date();

  // Build AWS Signature V4 signed request to SES v1 (SendEmail via HTTPS POST)
  const endpoint = `https://email.${region}.amazonaws.com/`;
  const searchParams = new URLSearchParams({
    Action: "SendEmail",
    Version: "2010-12-01",
    Source: params.from,
    "Destination.ToAddresses.member.1": params.to,
    "Message.Subject.Data": params.subject,
    "Message.Body.Text.Data": params.body,
  });

  if (params.html) {
    searchParams.append("Message.Body.Html.Data", params.html);
  }

  const bodyStr = searchParams.toString();
  const amzDate =
    d.toISOString().replace(/[:\-]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const dateStamp = amzDate.slice(0, 8);
  const service = "email";
  const scope = `${dateStamp}/${region}/${service}/aws4_request`;

  const canonical = [
    "POST",
    "/",
    "",
    `content-type:application/x-www-form-urlencoded\nhost:email.${region}.amazonaws.com\nx-amz-date:${amzDate}`,
    "",
    "content-type;host;x-amz-date",
    await sha256hex(bodyStr),
  ].join("\n");

  const sts = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    await sha256hex(canonical),
  ].join("\n");

  const sigKey = await hmacSha256(
    await hmacSha256(
      await hmacSha256(
        await hmacSha256(enc("AWS4" + secretKey), dateStamp),
        region,
      ),
      service,
    ),
    "aws4_request",
  );

  const signature = toHex(new Uint8Array(await hmacSha256(sigKey, sts)));
  const auth = `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=content-type;host;x-amz-date, Signature=${signature}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Amz-Date": amzDate,
      Authorization: auth,
    },
    body: bodyStr,
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("SES Error:", txt);
    throw new Error("Failed to send email");
  }
}

export async function sendWaitlistSES(
  email: string,
  name?: string,
  businessType?: string,
): Promise<void> {
  const adminEmail = "hamrolink3@gmail.com";
  const from = "HamroLink <noreply@hamrolink.com>";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61586183025522";

  // 1. Admin Notification
  await sendSESEmail({
    from,
    to: adminEmail,
    subject: `🎉 New waitlist signup: ${email}`,
    body: `New waitlist signup!\n\nEmail: ${email}\nName: ${name || "—"}\nBusiness type: ${businessType || "—"}\nTime: ${new Date().toISOString()}\n\nHamroLink — Nepal's Website Builder`,
  });

  // 2. User Confirmation (HTML)
const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: sans-serif;">
    <div style="background-color: #f3f4f6; padding: 40px 20px;">
      <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
        
        <div style="background-color: #4f46e5; padding: 40px 20px; text-align: center;">
          <a href="https://hamrolink.com" style="font-size: 28px; font-weight: 800; color: #ffffff; text-decoration: none; letter-spacing: -1px;">HamroLink</a>
        </div>
        
        <div style="padding: 40px 30px;">
          <h1 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">You're on the list! 🚀</h1>
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Hi there,</p>
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            Thank you for joining the HamroLink waitlist. We are building a smarter, AI-powered way for Nepali businesses to grow online, and we're excited to have you with us from day one.
          </p>
          
          <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <span style="text-transform: uppercase; font-size: 12px; font-weight: 700; color: #3b82f6; letter-spacing: 1px;">Exclusive Waitlist Bonus</span>
            <div style="font-size: 32px; font-weight: 800; color: #1e40af; margin: 8px 0;">100 Credits</div>
            <p style="font-size: 14px; margin: 0; color: #1e40af;">Reserved for: <strong>${email}</strong></p>
          </div>

          <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">We’ll notify you as soon as we open the doors. In the meantime, come say hi and see what we're building:</p>
          
          <a href="${facebookUrl}" style="display: block; text-align: center; padding: 16px 24px; background-color: #111827; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Follow our Journey on Facebook</a>
        </div>
        
        <div style="text-align: center; padding: 30px; font-size: 12px; color: #9ca3af; background-color: #f9fafb;">
          <p style="margin-bottom: 8px;">© ${new Date().getFullYear()} HamroLink • Nepal's Modern Website Builder</p>
          <p>You received this because you requested early access to <a href="https://hamrolink.com" style="color: #4f46e5;">hamrolink.com</a></p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
await sendSESEmail({
    from,
    to: email,
    // Use a more professional yet exciting subject line
    subject: "Welcome to the HamroLink Early Access! 🚀", 
    // The 'body' is the plain-text fallback for old devices/slow connections
    body: `Hi there,\n\nWelcome to the HamroLink waitlist! We are building a smarter, AI-powered way for Nepali businesses to grow online.\n\nExclusive Waitlist Bonus: You have reserved 100 free credits for when we go live! (Associated with: ${email})\n\nFollow our journey on Facebook: ${facebookUrl}\n\nWe'll notify you the moment we launch.\n\nBest regards,\nSuman Basnet\nFounder, HamroLink.com`,
    html: htmlContent, // This is your beautiful new template
  });
}

export async function sendContactEmailSES(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  await sendSESEmail({
    from: "HamroLink Contact <noreply@hamrolink.com>",
    to: "hamrolink3@gmail.com",
    subject: `📩 New Contact Form: ${formData.subject}`,
    body: `New message from contact form!\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\nTime: ${new Date().toISOString()}\n\nHamroLink — Nepal's Website Builder`,
  });
}
