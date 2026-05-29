// src/app/blog/[slug]/page.jsx
import { getDocUrlBySlug, getAllSlugs } from '../../components/blog-registry';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Heart, MessageSquare, Share2, Bookmark } from 'lucide-react';

// Optional: Pre-compile paths at build time for instant loading speed
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getBlogData(slug:string) {
  // const docUrl = await getDocUrlBySlug(slug);
  const docUrl = await generateStaticParams().then(params => {
    const match = params.find((p) => p.slug === slug);
    return match ? getDocUrlBySlug(match.slug) : null;
  });
  if (!docUrl) return null;

  console.log(`Fetching blog content for slug: ${slug} from URL: ${docUrl}`);

  // Call your local API internally to process the doc content
  // In Next.js Server Components, use an absolute URL or export the API logic directly.
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/generate-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ docUrl }),
      next: { revalidate: 3600 } // Cache results for an hour
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error loading dynamic blog post:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params in Next.js App Router
  const { slug } = await params;
  // const post = await getBlogData(slug);
  console.log("1. Original parameters slug:", slug);
console.log("2. Decoded parameters slug:", decodeURIComponent(slug));

const post = await getBlogData(decodeURIComponent(slug));
console.log("3. Returned post data:", post);
  // console.log(`Loaded blog post data for slug: ${slug}`, post);

  if (!post) {
    notFound(); // Triggers standard Next.js 404 page
  }

  return (
<div className="min-h-screen bg-white pb-24 text-black antialiased selection:bg-zinc-800 selection:text-white">
      
      {/* 1. TOP NAVIGATION (Fixes overlapping with an mt-24 constraint) */}
      <nav className="max-w-5xl mx-auto px-4  mt-24">
        <a href="/blog" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-black hover:text-zinc-200 transition">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all articles
        </a>
      </nav>

      {/* 2. HERO HEADER SECTION */}
      <header className="max-w-4xl mx-auto px-4 pt-1 pb-8">
        {/* Category Tag (Fallback to 'Article' if type isn't provided) */}
        <span className="inline-block px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-black bg-zinc-900 border border-zinc-800 rounded mb-6">
          {post.type || "Editorial"}
        </span>
        
        {/* Blog Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-tight mb-4">
          {post.title}
        </h1>

        {/* Subtitle / Description */}
        {post.subtitle && (
          <p className="text-lg sm:text-xl text-black font-light leading-relaxed mb-6">
            {post.subtitle}
          </p>
        )}

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-500 border-b border-zinc-900 pb-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-zinc-600" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-zinc-600" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* 3. MAIN CONTENT WRAPPER */}
      <div className="max-w-5xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-[64px_1fr] gap-8 items-start">
        
        {/* LEFT SIDEBAR: Sticky Engagement Toolbar (Desktop Only) */}
        <aside className="hidden lg:flex flex-col gap-5 sticky top-28 p-2 bg-zinc-950 rounded-full border border-zinc-900 w-12 items-center py-6">
          <button className="text-zinc-500 hover:text-red-400 transition group p-1" title="Like">
            <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
          <button className="text-zinc-500 hover:text-blue-400 transition group p-1" title="Comment">
            <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
          <button className="text-zinc-500 hover:text-zinc-200 transition group p-1" title="Bookmark">
            <Bookmark className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
          <div className="w-4 h-[1px] bg-zinc-800 my-1" />
          <button className="text-zinc-500 hover:text-zinc-200 transition p-1" title="Share">
            <Share2 className="h-4 w-4" />
          </button>
        </aside>

        {/* MAIN ARTICLE BODY */}
        <main className="max-w-3xl w-full mx-auto pb-24">
          <article className="space-y-12">
            {post.sections.map((section: any, index: number) => (
              <section key={index} className="space-y-5">
                
                {/* Dynamically Render Headings */}
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight pt-4 border-l-2 border-zinc-800 pl-4">
                    {section.heading}
                  </h2>
                )}
                
                {/* Dynamically Render Paragraphs */}
                <div className="space-y-4">
                  {section.paragraphs.map((para: any, pIdx: number) => (
                    <p 
                      key={pIdx} 
                      className="text-black text-base sm:text-[17px] leading-relaxed font-normal tracking-wide"
                    >
                      {para}
                    </p>
                  ))}
                </div>

              </section>
            ))}
          </article>

          {/* Optional: Simple Dark Author Bio Box Footer */}
          {post.author && (
            <footer className="mt-16 pt-10 border-t border-zinc-900">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 bg-zinc-950 rounded-xl border border-zinc-900">
                <div className="w-12 h-12 rounded-full bg-zinc-800 shrink-0 flex items-center justify-center font-mono text-sm text-zinc-400 border border-zinc-700">
                  {post.author.name?.charAt(0) || "A"}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-white text-sm">{post.author.name || "Anonymous Author"}</h4>
                  <p className="text-xs text-zinc-500 mb-2">{post.author.role || "Contributor"}</p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {post.author.bio || "Written by an expert contributor exploring modern engineering data metrics structures."}
                  </p>
                </div>
              </div>
            </footer>
          )}
          
        </main>
      </div>
    </div>
  );
}