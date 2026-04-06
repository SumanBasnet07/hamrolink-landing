"use server";

import { connectDB } from "@/lib/mongodb";
import WaitlistUser from "@/models/WaitlistUser";

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
  studentCount?: string,
): Promise<void> {
  const adminEmail = "hamrolink3@gmail.com";
  const from = "HamroLink <noreply@hamrolink.com>";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61586183025522";

  // 0. Database Persistence & Reward Assignment
  await connectDB();
  const lowerEmail = email.toLowerCase().trim();
  
  let user = await WaitlistUser.findOne({ email: lowerEmail });
  if (user) {
    console.log(`User ${email} already on waitlist.`);
    return; // Avoid double emails
  }

  const count = await WaitlistUser.countDocuments();
  const position = count + 1;
  let rewardType = "STANDARD";
  let rewardName = "Early Access";

  if (position <= 50) {
    rewardType = "LOCAL_START";
    rewardName = "Free Local Start Plan";
  } else if (position <= 150) {
    rewardType = "100_CREDITS";
    rewardName = "100 Bonus Credits";
  }

  user = await WaitlistUser.create({
    email: lowerEmail,
    name: name?.trim() || "",
    businessType: businessType || "",
    studentCount: studentCount || "",
    position,
    rewardType,
  });

  // 1. Admin Notification
  await sendSESEmail({
    from,
    to: adminEmail,
    subject: `🎉 [Position #${position}] New signup: ${email}`,
    body: `New waitlist signup!\n\nPosition: #${position}\nReward: ${rewardName}\nEmail: ${email}\nName: ${name || "—"}\nBusiness type: ${businessType || "—"}\nApprox Students: ${studentCount || "—"}\nTime: ${new Date().toISOString()}\n\nHamroLink — Nepal's Website Builder`,
  });

  // 2. User Confirmation (HTML)
  const isSchool = businessType === "school";
  const fullName = name?.trim() || "there";
  const businessName = name?.trim() || (isSchool ? "Your School" : "Your Business");

  // Define bonus strings based on business type
  const bonusTitle = isSchool ? "7-Day Full Access Trial + 100 AI Credits" : "Free 'Local Start' Plan + 100 AI Credits";
  const bonusDetail = isSchool 
    ? "Complete School OS features for 7 days once we launch." 
    : "Permanent access to our Local Start tier for being an early adopter.";

  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="background-color: #f9fafb; padding: 20px;">
      <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        
        <div style="padding: 30px 30px 20px 30px; text-align: center;">
          <img src="https://hamrolink.com/og-image.png" alt="HamroLink" style="width: 160px; height: auto;">
        </div>

        <div style="padding: 0 40px 40px 40px;">
          <h1 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 12px 0; text-align: center; letter-spacing: -0.5px;">
            Registration Confirmed for ${businessName}
          </h1>
          
          <div style="background-color: #4f46e5; border-radius: 16px; padding: 25px; text-align: center; margin-bottom: 25px; color: #ffffff;">
            <span style="text-transform: uppercase; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #c7d2fe;">Your Early Adopter Reward</span>
            <div style="font-size: 20px; font-weight: 800; margin: 8px 0;">${bonusTitle}</div>
            <p style="font-size: 13px; opacity: 0.9; margin: 0;">${bonusDetail}</p>
          </div>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <div style="font-size: 14px; color: #475569;">
               <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span><strong>Status:</strong></span>
                  <span style="color: #10b981; font-weight: 700;">Waitlist Position #${position}</span>
               </div>
               <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span><strong>Entity:</strong></span>
                  <span>${businessName}</span>
               </div>
               <div style="display: flex; justify-content: space-between;">
                  <span><strong>Registered Email:</strong></span>
                  <span>${email}</span>
               </div>
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 12px;">आदरणीय ${fullName} ज्यू,</h2>
            <p style="font-size: 16px; color: #374151; line-height: 1.7; margin-bottom: 18px;">
              ${businessName} लाई हाम्रो लिंक (HamroLink) को सुरुवाती सूचीमा दर्ता गर्नुभएकोमा धन्यवाद। 
              <strong>हाम्रो तर्फबाट तपाईंको लागि एउटा उपहार:</strong> तपाईंले पालो पाउने बित्तिकै ${isSchool ? "७ दिनको लागि फ्री ट्रायल र १०० AI क्रेडिट्स" : "फ्री लोकल स्टार्ट (Local Start) प्लान र १०० AI क्रेडिट्स"} पाउनुहुनेछ।
            </p>

            <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px;">
              <p style="font-size: 14px; color: #92400e; margin: 0; line-height: 1.5;">
                <strong>हामीले किन पर्खाएका छौँ?</strong><br>
                हामी धेरै प्रयोगकर्ताहरूलाई एकैपटक भित्र्याउनु भन्दा थोरै-थोरै गर्दै गुणस्तरीय सेवा दिन चाहन्छौं। सिस्टमको गति र सुरक्षा सुनिश्चित गर्न हामीले साप्ताहिक रूपमा सिमित व्यवसायहरूलाई मात्र पहुँच दिइरहेका छौं।
              </p>
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 10px;">What to expect next:</h3>
            <ul style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">
              <li>You will receive an email once we process your access.</li>
              <li>Your exclusive bonus will be automatically credited to your account.</li>
              <li>Stay tuned for our official launch updates on social media.</li>
            </ul>
          </div>

          <a href="${facebookUrl}" style="display: block; text-align: center; background-color: #111827; color: #ffffff; padding: 18px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">
            Follow our Journey on Facebook
          </a>
        </div>

        <div style="background-color: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #f3f4f6;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            Hand-crafted in Dhankuta, Nepal 🇳🇵<br>
            © ${new Date().getFullYear()} HamroLink.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`;

  await sendSESEmail({
    from,
    to: email,
    subject: `Waitlist Confirmed for ${businessName} 🚀`,
    html: htmlContent,
    body: `Hi ${fullName},\n\nThank you for choosing HamroLink. ${businessName} is officially on the list (#${position}).\n\nYour Reward: ${bonusTitle}\n- ${bonusDetail}\n\nWhat to expect next:\n- You will receive an email once we process your access.\n- Your exclusive bonus will be automatically credited to your account.\n\nFollow our journey on Facebook: ${facebookUrl}`,
  });

  // Mark notified in DB
  user.notified = true;
  user.lastNotifiedAt = new Date();
  await user.save();
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
