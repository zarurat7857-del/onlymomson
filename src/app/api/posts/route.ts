import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const type = searchParams.get("type"); 
  const limit = parseInt(searchParams.get("limit") || "20");
  
  // Note: We ignore 'page' for calculation to ensure pure randomness on every fetch
  
  try {
    // 1. Get Total Count (Fast)
    const totalCount = await prisma.post.count({
      where: type ? { type: type } : {},
    });

    // 2. Calculate Random Skip
    // We pick a random starting point in the database
    const maxSkip = Math.max(0, totalCount - limit);
    const randomSkip = Math.floor(Math.random() * maxSkip);

    // 3. Fetch Posts (No OrderBy = Faster)
    const posts = await prisma.post.findMany({
      where: type ? { type: type } : {},
      skip: randomSkip,
      take: limit,
    });
    
    // 4. Server-Side Shuffle
    // Mixes them up before sending to frontend
    const shuffledPosts = posts.sort(() => Math.random() - 0.5);

    return NextResponse.json(shuffledPosts);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}