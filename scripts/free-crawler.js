// File: scripts/free-crawler.js
const gis = require('g-i-s');
const axios = require('axios');

// CONFIGURATION
// This must match the secret in your .env file
const API_SECRET = process.env.CRAWLER_SECRET_KEY || "change_me_to_match_env"; 
const SITE_URL = "http://localhost:3000/api/crawler/ingest";

// THE AGENTS (Search Queries)
const AGENTS = [
  { 
    id: "agent_desi_01", 
    name: "Desi Mom Pics", 
    queries: ["indian housewife saree selfie", "bhabhi saree fashion face", "desi saree candid"] 
  },
  { 
    id: "agent_social_02", 
    name: "Social Scraper", 
    queries: ["mirror selfie fashion", "outfit of the day amateur", "kitchen selfie"] 
  }
];

// 1. Helper to Search Google Images (Free)
function searchGoogle(query) {
  return new Promise((resolve, reject) => {
    const opts = {
      searchTerm: query,
      queryStringAddition: '&tbs=isz:m', // Medium sized images only
      filterOutDomains: ['shutterstock.com', 'dreamstime.com', 'alamy.com'] // Filter stock photos
    };

    gis(opts, (error, results) => {
      if (error) reject(error);
      else resolve(results.slice(0, 8)); // Take top 8 results
    });
  });
}

// 2. Helper to Send to your Website
async function ingestItem(imageUrl, title, sourceName) {
  try {
    const payload = {
      type: "MEDIA_ITEM",
      data: {
        title: title,
        type: "IMG",
        url: imageUrl,
        source: sourceName,
        views: Math.floor(Math.random() * 200) + "k" // Mock view count
      }
    };

    await axios.post(SITE_URL, payload, {
      headers: { 'Authorization': `Bearer ${API_SECRET}` }
    });
    console.log(`[+] Sent: ${title}`);
  } catch (error) {
    // Silently fail if image link is broken
  }
}

// 3. Update Agent Status on Dashboard
async function updateStatus(agent, status, count) {
  try {
    await axios.post(SITE_URL, {
      type: "AGENT_UPDATE",
      data: { id: agent.id, name: agent.name, status: status, count: count }
    }, { headers: { 'Authorization': `Bearer ${API_SECRET}` } });
  } catch (e) { console.error("Could not update dashboard status"); }
}

// --- MAIN RUNNER ---
async function run() {
  console.log("--- STARTING FREE CRAWLER ---");

  for (const agent of AGENTS) {
    console.log(`\n[Agent: ${agent.name}] Waking up...`);
    await updateStatus(agent, "Scanning", 0);

    let totalFound = 0;

    // Run through all queries for this agent
    for (const query of agent.queries) {
      console.log(` > Searching for: "${query}"`);
      try {
        const results = await searchGoogle(query);
        
        for (const result of results) {
          // Send to DB
          // We use the search query as the title because GIS doesn't always give titles
          await ingestItem(result.url, query, agent.name); 
          totalFound++;
        }
      } catch (e) {
        console.error(` > Error searching '${query}'`);
      }
      
      // Sleep for 2 seconds to not get blocked by Google
      await new Promise(r => setTimeout(r, 2000));
    }

    await updateStatus(agent, "Online", totalFound);
    console.log(`[Agent: ${agent.name}] Finished. Found ${totalFound} items.`);
  }

  console.log("\n--- CRAWL COMPLETE ---");
}

run();