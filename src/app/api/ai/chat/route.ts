import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ChatDailyUsage from "@/models/ChatDailyUsage";
import ChatLead from "@/models/ChatLead";

export const runtime = "nodejs";

const DAILY_LIMIT = 20;
const COOLDOWN_MS = 2000;

function getDayKeyUTC(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getFingerprint(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for") || "";
  const ip = xff.split(",")[0]?.trim() || "unknown-ip";
  const ua = req.headers.get("user-agent") || "unknown-ua";
  const clientId = req.headers.get("x-client-id") || "anon-client";
  return `${clientId}::${ip}::${ua.slice(0, 120)}`;
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function sanitizeSnippetList(input: unknown, maxItems = 6, maxChars = 500) {
  if (!Array.isArray(input)) return [] as string[];

  return input
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems)
    .map((item) => item.slice(0, maxChars));
}

function parseBoolean(input: unknown, fallback = false) {
  if (typeof input === "boolean") return input;
  return fallback;
}

function inferBusinessIntent(text: string) {
  const t = text.toLowerCase();
  if (/school|college|class|education|student/.test(t)) return "education";
  if (/shop|store|kirana|ecommerce|product/.test(t)) return "retail";
  if (/restaurant|food|cafe|menu|delivery/.test(t)) return "food";
  if (/consult|service|agency|portfolio|freelance/.test(t)) return "service";
  return "general";
}

function isSmallTalk(text: string) {
  const t = text.toLowerCase().trim();
  return /^(hi|hello|hey|yo|hola|namaste|namaskar|thanks|thank you|ok|okay|bye|good morning|good evening)[!. ]*$/.test(t);
}

function extractHandoffSignal(rawReply: string) {
  const match = rawReply.match(/__HANDOFF__:\s*(yes|no)/i);
  const wantsHandoff = match ? match[1].toLowerCase() === "yes" : false;
  const cleanReply = rawReply.replace(/\n?__HANDOFF__:\s*(yes|no)\s*$/i, "").trim();
  return { cleanReply, wantsHandoff };
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const body = await req.json();
    const message = (body?.message || "").toString().trim();
    const lang = body?.lang === "ne" ? "ne" : "en";
    const history = Array.isArray(body?.history) ? (body.history as ChatMessage[]) : [];
    const context = body?.context ?? {};
    const page = (context?.page || "landing").toString().slice(0, 60);
    const planFocus = (context?.planFocus || "LOCAL_START_TRIAL_15_DAYS").toString().slice(0, 80);
    const sourceDocuments = sanitizeSnippetList(context?.sourceDocuments, 4, 80);
    const docSnippets = sanitizeSnippetList(context?.docSnippets, 6, 500);
    const hasKnowledgeMatch = parseBoolean(context?.hasKnowledgeMatch, docSnippets.length > 0);

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    if (message.length > 1200) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    await connectDB();

    const fingerprint = getFingerprint(req);
    const dayKey = getDayKeyUTC();

    const existing = await ChatDailyUsage.findOne({ fingerprint, dayKey }).lean();
    const used = existing?.count ?? 0;

    const lastMessageAt = existing?.lastMessageAt ? new Date(existing.lastMessageAt).getTime() : 0;
    const now = Date.now();
    const delta = now - lastMessageAt;
    if (lastMessageAt && delta < COOLDOWN_MS) {
      const retryAfterSec = Math.ceil((COOLDOWN_MS - delta) / 1000);
      return NextResponse.json(
        {
          error: lang === "ne" ? "कृपया केही सेकेन्ड पर्खिनुहोस्।" : "Please wait a moment before sending again.",
          retryAfterSec,
          remaining: Math.max(0, DAILY_LIMIT - used),
          limit: DAILY_LIMIT,
        },
        { status: 429 }
      );
    }

    if (used >= DAILY_LIMIT) {
      return NextResponse.json(
        {
          error: lang === "ne" ? "आजको सन्देश सीमा पुगेको छ।" : "Daily message limit reached.",
          remaining: 0,
          limit: DAILY_LIMIT,
        },
        { status: 429 }
      );
    }

    const updated = await ChatDailyUsage.findOneAndUpdate(
      { fingerprint, dayKey },
      {
        $inc: { count: 1 },
        $set: { lastMessageAt: new Date() },
        $setOnInsert: { fingerprint, dayKey },
      },
      { new: true, upsert: true }
    ).lean();

    const remaining = Math.max(0, DAILY_LIMIT - (updated?.count ?? DAILY_LIMIT));

    const inferredIntent = inferBusinessIntent(message);

    const knowledgeBlock = docSnippets.length
      ? `\nKnowledge snippets from docs (${sourceDocuments.join(", ") || "internal-docs"}):\n${docSnippets
          .map((snippet, idx) => `${idx + 1}. ${snippet}`)
          .join("\n")}`
      : "";

    const systemPrompt =
      lang === "ne"
        ? `तपाईं HamroLink का नेपाली व्यवसाय सहायक हुनुहुन्छ। छोटो, उपयोगी, र मित्रवत जवाफ दिनुहोस्। वर्तमान पेज: ${page}। प्राथमिक योजना: ${planFocus}। व्यवसाय प्रकार संकेत: ${inferredIntent}। वेबसाइट, प्लान, डोमेन, SEO, र सुरु गर्ने कदमहरूमा फोकस गर्नुहोस्। उपलब्ध ज्ञान स्निपेटलाई प्राथमिक स्रोत मानेर उत्तर दिनुहोस् र तथ्य नबनाउनुहोस्। यदि उत्तर निश्चित छैन वा जानकारी पर्याप्त छैन भने अनुमान नगर्नुहोस् र human support सिफारिस गर्नुहोस्। उत्तरको अन्त्यमा एक लाइन अनिवार्य रूपमा थप्नुहोस्: __HANDOFF__: yes वा __HANDOFF__: no${knowledgeBlock}`
        : `You are HamroLink's business assistant. Keep responses short, practical, and friendly. Current page: ${page}. Plan focus: ${planFocus}. Inferred business intent: ${inferredIntent}. Focus on website launch, plans, domain setup, SEO, and immediate next steps. Treat provided knowledge snippets as primary source of truth and do not invent facts. If information is uncertain or missing, avoid guessing and suggest human support. At the end of your response, add exactly one line: __HANDOFF__: yes or __HANDOFF__: no${knowledgeBlock}`;

    const safeHistory = history
      .slice(-8)
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));

    const messages = [
      { role: "system", content: systemPrompt },
      ...safeHistory,
      { role: "user", content: message },
    ];

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.5,
        max_tokens: 350,
      }),
    });

    if (!openaiRes.ok) {
      const text = await openaiRes.text();
      return NextResponse.json(
        {
          error: "AI provider error",
          details: text.slice(0, 400),
          remaining,
          limit: DAILY_LIMIT,
        },
        { status: 502 }
      );
    }

    const data = await openaiRes.json();
    const rawReply = data?.choices?.[0]?.message?.content?.toString()?.trim() || "";
    const { cleanReply, wantsHandoff } = extractHandoffSignal(rawReply);
    const reply = cleanReply;

    // Map insights into chat lead logging collection for later analysis.
    // This is non-blocking to avoid impacting user-facing chat reliability.
    ChatLead.create({
      fingerprint,
      dayKey,
      lang,
      page,
      planFocus,
      businessIntent: inferredIntent,
      message: message.slice(0, 2000),
      reply: (reply || "").slice(0, 2000),
    }).catch(() => {});

    return NextResponse.json({
      reply:
        reply ||
        (lang === "ne"
          ? "म अहिले छोटो जवाफ दिन सकिनँ, फेरि प्रयास गर्नुहोस्।"
          : "I could not generate a response right now. Please try again."),
      remaining,
      limit: DAILY_LIMIT,
      needsHumanHelp: wantsHandoff || (!hasKnowledgeMatch && !isSmallTalk(message)),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
