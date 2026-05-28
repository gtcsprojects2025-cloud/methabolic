// src/app/blog/[slug]/page.jsx
import { getDocUrlBySlug, getAllSlugs } from '../../components/blog-registry';
import { notFound } from 'next/navigation';

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
    // const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`/api/generate-blog`, {
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
  const post = await getBlogData(slug);

  if (!post) {
    notFound(); // Triggers standard Next.js 404 page
  }

  return (
    <article className="min-h-screen bg-black text-zinc-100 mt-24 py-16 px-4 sm:px-4 lg:px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-zinc-800 pb-8">
          <div className="flex items-center space-x-4 text-xs text-zinc-400 font-mono mb-4 uppercase tracking-wider">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            {post.subtitle}
          </p>
        </header>

        {/* Dynamic Content Body Section */}
        <main className="space-y-10">
          {post.sections.map((section:any, index:number) => (
            <section key={index} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl font-bold text-white tracking-tight pt-4">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((para:any, pIdx:number) => (
                <p key={pIdx} className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </main>
        
      </div>
    </article>
  );
}