import { getBlogData } from "./sheets"

// 1. Define your initial static registry with let so it can be updated
let BLOG_REGISTRY: { [key: string]: string } = {
  'Why_Africa_Must_Lead_in_Omic': 'https://docs.google.com/document/d/1gDoK9CbBdeUYdxVGUBSAI_a2RPj9AgeQhVQW0uBSdEU/edit',
};

// Track whether the registry has already been populated to avoid redundant API hits
let isRegistryInitialized = false;

/**
 * Fetches dynamic data from the Google Sheet and populates the BLOG_REGISTRY object
 * with permlink-to-docUrl mappings.
 */
export async function initializeRegistry(): Promise<{ [key: string]: string }> {
  // If already populated, return immediately to save API quota
  // if (isRegistryInitialized) {
  //   return BLOG_REGISTRY;
  // }

  try {
    // 2. Fetch the dynamic records from the Google Sheet
    const sheetBlogs = await getBlogData();

    // console.log("Fetched blog entries from Google Sheets:", sheetBlogs);

    if (Array.isArray(sheetBlogs)) {
      // 3. Loop through rows and inject them into the registry object
      sheetBlogs.forEach((blog: any) => {
        // Ensure both fields exist before adding them
        if (blog.permlink && blog.docurl) {
          // Clean the permalink trim spaces just in case
          const slug = String(blog.permlink).trim();
          
          // Only add if it doesn't overwrite a static entry you manually set up top
          if (!BLOG_REGISTRY[slug]) {
            BLOG_REGISTRY[slug] = blog.docurl;
          }
        }
      });
      
      isRegistryInitialized = true;
    }
  } catch (error) {
    console.error("Failed to populate BLOG_REGISTRY from Google Sheets:", error);
    // Fallback gracefully to your static items if the network/API fails
  }

  return BLOG_REGISTRY;
}

/**
 * Resolves a single slug to its Google Doc URL by initializing the registry first.
 */
export async function getDocUrlBySlug(slug: string): Promise<string | null> {
  const registry = await initializeRegistry();
  return registry[slug] || null;
}

/**
 * Returns all active slugs (permalinks) for Next.js build-time static generation.
 */
export async function getAllSlugs(): Promise<string[]> {
  const registry = await initializeRegistry();
  return Object.keys(registry);
}