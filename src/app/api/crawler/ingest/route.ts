import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // This matches your lib/prisma.ts

export async function POST(req: Request) {
  try {
    // 1. Security Check
    const authHeader = req.headers.get("authorization");
    const SECRET = process.env.CRAWLER_SECRET_KEY; 

    // If you haven't set the env var yet, this acts as a fallback for testing
    // BUT you should add CRAWLER_SECRET_KEY="my-secret" to your .env file
    if (!SECRET) {
        console.warn("⚠️ No CRAWLER_SECRET_KEY set in .env. allowing request for testing...");
    } else if (authHeader !== `Bearer ${SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Read the Payload
    const body = await req.json();
    const { type, data } = body;

    // 3. Save to Database
    let result;
    
    if (type === "MEDIA_ITEM") {
      // Check if URL already exists to avoid duplicates
      const existing = await prisma.mediaItem.findFirst({ where: { url: data.url }});
      if (!existing) {
        result = await prisma.mediaItem.create({
          data: {
            title: data.title,
            type: data.type,
            url: data.url,
            source: data.source,
            views: data.views,
          },
        });
      }
    }
    else if (type === "SOCIAL_PROFILE") {
    // Check for duplicate URL
    const existing = await prisma.socialProfile.findUnique({ 
        where: { url: data.url } 
    });
    
    if (!existing) {
      await prisma.socialProfile.create({
        data: {
          handle: data.handle,
          platform: data.platform,
          url: data.url,
          originQuery: data.origin,
        },
      });
    }
  } 
    
    else if (type === "AGENT_UPDATE") {
      result = await prisma.crawlerAgent.upsert({
        where: { id: data.id },
        update: {
          status: data.status,
          itemsCount: data.count,
          lastActive: new Date(),
        },
        create: {
          id: data.id,
          name: data.name,
          status: data.status,
          itemsCount: data.count,
        }
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Ingest Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}