import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ChatLead from "@/models/ChatLead";

export const runtime = "nodejs";

function normalizeDayKey(value: string | null) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const trimmed = value.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
    ? trimmed
    : new Date().toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret") || req.headers.get("x-insights-secret");
    const expectedSecret = process.env.CHAT_INSIGHTS_SECRET || process.env.ADMIN_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dayKey = normalizeDayKey(searchParams.get("date"));
    const limit = Math.min(Number(searchParams.get("limit") || 30), 100);

    await connectDB();

    const leads = await ChatLead.find({ dayKey })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("dayKey lang page planFocus businessIntent message reply createdAt")
      .lean();

    const intentSummary = await ChatLead.aggregate([
      { $match: { dayKey } },
      { $group: { _id: "$businessIntent", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return NextResponse.json({
      success: true,
      dayKey,
      count: leads.length,
      intents: intentSummary.map((item) => ({
        intent: item._id || "unknown",
        count: item.count,
      })),
      leads: (leads as any[]).map((lead) => ({
        ...lead,
        _id: lead._id.toString(),
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 });
  }
}
