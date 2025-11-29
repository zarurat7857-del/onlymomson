import { NextResponse } from "next/server";
// 1. IMPORT THE SHARED CLIENT (Do not create a new one)
import { prisma } from "@/lib/prisma"; 
import * as cheerio from "cheerio";

// YOUR ALBUMS
const ALBUMS = [
  "https://catbox.moe/c/4ib91q", // Images
  "https://catbox.moe/c/oht520"  // Videos
];

// Helper function to scrape a specific URL
async function scrapeAlbum(albumUrl: string) {
  try {
    const response = await fetch(albumUrl, { 
        cache: "no-store",
        // User-Agent makes the scraper look like a real browser to avoid blocks
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" 
        }
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const files: string[] = [];

    // Catbox standard gallery links finder
    $('a').each((_, element) => {
      let href = $(element).attr('href');
      
      if (href) {
        // Fix relative URLs if Catbox returns them (e.g. /files/image.jpg)
        if (!href.startsWith('http')) {
            href = `https://files.catbox.moe/${href.replace(/^\//, '')}`;
        }

        // Check extensions strictly
        if (href.match(/\.(mp4|webm|jpg|jpeg|png|gif)$/i)) {
          files.push(href);
        }
      }
    });

    return files;
  } catch (err) {
    console.error(`Failed to scrape ${albumUrl}`, err);
    return [];
  }
}

// 2. FORCE DYNAMIC (Prevents Next.js from caching the sync result)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("🚀 Starting Sync...");

    // 1. Scrape all albums in parallel
    const results = await Promise.all(ALBUMS.map(url => scrapeAlbum(url)));
    const allFiles = results.flat();
    
    // Remove duplicate URLs
    const uniqueFiles = Array.from(new Set(allFiles));

    console.log(`🔍 Found ${uniqueFiles.length} unique files.`);

    let addedCount = 0;

    // 2. Insert into DB
    for (const url of uniqueFiles) {
      const isVideo = url.match(/\.(mp4|webm)$/i);
      const type = isVideo ? "video" : "image";

      try {
        // Upsert: Create if it doesn't exist, do nothing if it does.
        await prisma.post.upsert({
            where: { contentUrl: url },
            update: {}, // No update needed
            create: {
                contentUrl: url,
                type: type,
                caption: isVideo ? "New Video" : "New Image",
                username: "Admin",
            }
        });
        addedCount++;
      } catch (e) {
          // Log errors but continue the loop
          console.log(`Skipping error for ${url}`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      scanned: uniqueFiles.length, 
      added: addedCount 
    });

  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}