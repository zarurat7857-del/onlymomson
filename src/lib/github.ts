import matter from "gray-matter";

// ------------------------------------------
// CONFIGURATION: UPDATE THESE EXACTLY
// ------------------------------------------
const GITHUB_USER = "zarurat7856";  // e.g. "kingshuk"
const GITHUB_REPO = "stories";    // e.g. "onlymomson-stories"
const BRANCH = "main";                   // or "master"
const FOLDER = "content";                // folder name inside repo
// ------------------------------------------

// Helper to construct the Raw URL safely
function getRawUrl(filename: string) {
  // 1. Ensure extension exists
  const safeName = filename.endsWith(".md") ? filename : `${filename}.md`;
  
  // 2. Encode spaces and special chars (e.g. "My Story" -> "My%20Story")
  // We encode the whole filename part to match how raw.githubusercontent expects it
  const encodedName = encodeURIComponent(safeName);

  return `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/${FOLDER}/${encodedName}`;
}

// 1. GET LIST (For Stories Page)
export async function getStories() {
  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${FOLDER}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
        console.error("Failed to fetch repo contents:", res.status, res.statusText);
        return [];
    }
    
    const files = await res.json();
    if (!Array.isArray(files)) return [];

    // Fetch details for each file in parallel
    const stories = await Promise.all(
      files
        .filter((file: any) => file.name.endsWith(".md"))
        .map(async (file: any) => {
          const content = await getStoryContent(file.name);
          return {
            slug: file.name.replace(".md", ""), // Create clean slug
            ...content.frontmatter,
          };
        })
    );

    return stories;
  } catch (error) {
    console.error("API Error fetching stories list:", error);
    return [];
  }
}

// 2. GET SINGLE STORY (For Reader Page)
export async function getStoryContent(slugOrFilename: string) {
  if (!slugOrFilename) return { frontmatter: {}, content: null };

  const url = getRawUrl(slugOrFilename);
  
  try {
    console.log(`Trying to fetch story from: ${url}`); // <--- WATCH TERMINAL FOR THIS

    const res = await fetch(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
        console.error(`GitHub 404 for: ${url}`);
        return { frontmatter: { title: slugOrFilename }, content: null };
    }

    const rawText = await res.text();
    
    // Parse Metadata (Frontmatter) vs Body
    const { data, content } = matter(rawText);
    
    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error("Error parsing MD file:", error);
    return { frontmatter: {}, content: null };
  }
}