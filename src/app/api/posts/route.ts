import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // <--- Ensure this import is here

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const type = searchParams.get("type"); 
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      where: type ? { type: type } : {},
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: limit,
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}