// src/app/api/admin/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WaitlistUser from "@/models/WaitlistUser";
import { requireAdminSessionOrHeaderSecret } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  try {
    const authError = requireAdminSessionOrHeaderSecret(request);
    if (authError) return authError;

    await connectDB();
    const users = await WaitlistUser.find().sort({ position: 1 });
    
    return NextResponse.json({ 
      success: true, 
      count: users.length,
      users 
    });
  } catch (error: any) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
