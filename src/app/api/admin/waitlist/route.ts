// src/app/api/admin/waitlist/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WaitlistUser from "@/models/WaitlistUser";

export async function GET(request: Request) {
  try {
    // Basic security: Check for a secret header or query param
    // You can set ADMIN_SECRET in your .env.local
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    
    if (process.env.ADMIN_SECRET && secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
