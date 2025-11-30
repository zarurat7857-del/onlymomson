const axios = require('axios');
const cheerio = require('cheerio');

// YOUR EXACT LINK
const YAHOO_URL = "https://search.yahoo.com/search?p=site%3Ainstagram.com+incest+meme&fr2=sb-top";

// Helper: Yahoo wraps real links inside a 'RU=' parameter. We must extract it.
function unwrapYahooLink(yahooLink) {
    try {
        // Look for the part that starts with "/RU="
        if (yahooLink.includes("/RU=")) {
            const rawUrl = yahooLink.split("/RU=")[1].split("/")[0];
            return decodeURIComponent(rawUrl);
        }
        return yahooLink; // Return original if not wrapped
    } catch (e) {
        return yahooLink;
    }
}

// Helper: Extract handle from a clean Instagram URL
function getHandle(url) {
    if (!url.includes("instagram.com")) return null;
    
    // Remove query params like ?igshid=...
    const cleanUrl = url.split("?")[0];
    const parts = cleanUrl.split("/");
    
    // The handle is usually the last part: instagram.com/handle
    // Or second to last if there is a trailing slash: instagram.com/handle/
    let handle = parts[parts.length - 1] || parts[parts.length - 2];

    // Filter out garbage
    if (!handle || ["p", "reel", "explore", "tags", "search"].includes(handle)) return null;

    return "@" + handle;
}

async function run() {
    console.log("🔍 Fetching Yahoo Results...");
    
    try {
        const res = await axios.get(YAHOO_URL, {
            headers: {
                // Use a real browser header to get the proper HTML
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(res.data);
        const uniqueHandles = new Set();

        // Yahoo results are typically inside <h3> tags with links
        $('h3 a').each((i, el) => {
            const rawLink = $(el).attr('href');
            
            if (rawLink) {
                // 1. Unwrap the Yahoo tracking link
                const realUrl = unwrapYahooLink(rawLink);
                
                // 2. Extract the handle
                const handle = getHandle(realUrl);

                if (handle) {
                    console.log(`   Found: ${handle} \t(from: ${realUrl})`);
                    uniqueHandles.add(handle);
                }
            }
        });

        console.log("\n✅ EXTRACTED ACCOUNTS:");
        console.log(Array.from(uniqueHandles));

    } catch (e) {
        console.error("Error:", e.message);
    }
}

run();