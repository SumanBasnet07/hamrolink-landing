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

export async function sendWaitlistSES(
  email: string,
  name?: string,
  businessType?: string,
): Promise<void> {
  const region = process.env.AWS_REGION ?? "ap-south-1";
  const accessKey = process.env.AWS_ACCESS_KEY_ID ?? "";
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY ?? "";
  const from = "HamroLink Waitlist <noreply@hamrolink.com>";
  const to = "hamrolink3@gmail.com";

  const subject = `🎉 New waitlist signup: ${email}`;
  const d = new Date();

  // Format simple date instead of toLocaleString as Node environment may not support en-NP timezones nicely depending on system
  const body = `New waitlist signup!\n\nEmail: ${email}\nName: ${name || "—"}\nBusiness type: ${businessType || "—"}\nTime:  ${d.toISOString()}\n\nHamroLink — Nepal's Website Builder`;

  // Build AWS Signature V4 signed request to SES v1 (SendEmail via HTTPS POST)
  const endpoint = `https://email.${region}.amazonaws.com/`;
  const params = new URLSearchParams({
    Action: "SendEmail",
    Version: "2010-12-01",
    Source: from,
    "Destination.ToAddresses.member.1": to,
    "Message.Subject.Data": subject,
    "Message.Body.Text.Data": body,
  });

  const bodyStr = params.toString();
  const amzDate =
    d
      .toISOString()
      .replace(/[:\-]|\.\d{3}/g, "")
      .slice(0, 15) + "Z";
  const dateStamp = amzDate.slice(0, 8);
  const service = "email";
  const scope = `${dateStamp}/${region}/${service}/aws4_request`;

  // Canonical request
  const canonical = [
    "POST",
    "/",
    "",
    `content-type:application/x-www-form-urlencoded\nhost:email.${region}.amazonaws.com\nx-amz-date:${amzDate}`,
    "",
    "content-type;host;x-amz-date",
    await sha256hex(bodyStr),
  ].join("\n");

  // String to sign
  const sts = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    await sha256hex(canonical),
  ].join("\n");

  // Signing key
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

export async function sendContactEmailSES(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const region = process.env.AWS_REGION ?? "ap-south-1";
  const accessKey = process.env.AWS_ACCESS_KEY_ID ?? "";
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY ?? "";
  const from = "HamroLink Contact <noreply@hamrolink.com>";
  const to = "hamrolink3@gmail.com";

  const emailSubject = `📩 New Contact Form: ${formData.subject}`;
  const d = new Date();

  const body = `New message from contact form!\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\nTime: ${d.toISOString()}\n\nHamroLink — Nepal's Website Builder`;

  const endpoint = `https://email.${region}.amazonaws.com/`;
  const params = new URLSearchParams({
    Action: "SendEmail",
    Version: "2010-12-01",
    Source: from,
    "Destination.ToAddresses.member.1": to,
    "Message.Subject.Data": emailSubject,
    "Message.Body.Text.Data": body,
  });

  const bodyStr = params.toString();
  const amzDate =
    d
      .toISOString()
      .replace(/[:\-]|\.\d{3}/g, "")
      .slice(0, 15) + "Z";
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
