import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic so it always checks for new data
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch the profiles you just saved
    const profiles = await prisma.socialProfile.findMany({
      orderBy: { discoveredAt: 'desc' }, // Newest first
      take: 10
    });
    
    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}