import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic so it always fetches fresh data on refresh
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch images from your database
    const mediaItems = await prisma.mediaItem.findMany({
      orderBy: { createdAt: 'desc' }, // Newest first
      take: 50 // Limit to 50 items
    });
    
    // 2. Return them as JSON
    return NextResponse.json(mediaItems);
  } catch (error) {
    console.error("Feed API Error:", error);
    return NextResponse.json({ error: "Failed to fetch feed" }, { status: 500 });
  }
}