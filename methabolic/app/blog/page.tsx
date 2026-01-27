"use client"
import React, { useState, useMemo } from 'react';
import { Search, Calendar, User, Tag, ArrowRight, ChevronRight, Hash, Bell, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

// Mock data with profile images
const MOCK_POSTS = [
  {
    id: 1,
    title: "Why Africa Must Lead in Omics Sciences",
    permlink:"Why_Africa_Must_Lead_in_Omics_Sciences",
    excerpt: `Africa stands at a decisive moment in its scientific history. With over 1.4 billion people, immense biodiversity, and the fastest-growing youth population in the world, the continent is uniquely positioned to lead a new era of discovery through omics sciences: genomics, proteomics, and particularly metabolomics and phenomics—emerging and maturing fields.

These disciplines are reshaping medicine, agriculture, biotechnology, and environmental sustainability globally. Yet Africa, with its unparalleled genetic and ecological diversity, remains underrepresented in these frontier fields.

This imbalance is not due to a lack of potential, but a lack of access.`,
    author: "Layo Obidike",
    authorRole: "",
    authorImage: "/lo.png",
    date: "2026-01-20",
    category: "Metabolomics",
    tags: ["Africa", "Omics", "Genomics", "Proteomics", "Metabolomics", "Phenomics", "Science Leadership"],
    readingTime: "5 min read"
  },
  {
    id: 2,
    title: "Collaboration Is Key: Partnering Across the Continent and Beyond",
    permlink:"Partnering_Across_the_Continent_and_Beyond",
    excerpt: `The greatest discoveries: from decoding DNA to mapping the human microbiome, were made possible not by isolated minds but by networks of shared knowledge, tools, and vision.`,
    author: "Layo Obidike",
    authorRole: "",
    authorImage: "/lo.png",
    date: "2026-01-25",
    category: "Design",
    tags: ["Africa", "Omics", "Genomics", "Proteomics", "Metabolomics", "Phenomics",],
    readingTime: "8 min read"
  },

    {
    id: 3,
    title: "Addressing Africa’s Health Challenges Through Metabolomics",
    permlink:"Africa_Health_Challenges_Through_Metabolomics",
    excerpt: `
      Africa faces a complex web of health challenges: from infectious diseases to rising chronic conditions like diabetes, hypertension, and cancer. Yet, within these challenges lies an opportunity:
    `,
    author: "Layo Obidike",
    authorRole: "",
    authorImage: "/lo.png",
    date: "2026-01-27",
    category: "Design",
    tags: ["Africa", "Omics", "Genomics", "Proteomics", "Metabolomics", "Phenomics",],
    readingTime: "8 min read"
  },

  


];

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(MOCK_POSTS.map(post => post.category))];

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Next.js style Navbar */}


      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 pt-40">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6 lg:text-6xl">
            Insightful  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Articles</span>.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
           Read our Blog articles
          </p>
        </section>

        {/* Control Bar */}
        <div className="sticky top-20 z-40 bg-[#F8FAFC]/95 backdrop-blur-sm py-4 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex p-1 bg-slate-200/50 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid gap-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="group grid md:grid-cols-[1fr_auto] gap-8 items-start pb-12 border-b border-slate-200 last:border-0"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-slate-300">/</span>
                    <time className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                    <Link href={`/blog/${post.permlink}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="text-slate-600 leading-relaxed text-lg line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="relative">
                      <img 
                        src={post.authorImage} 
                        alt={post.author}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                        onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${post.author}&background=6366f1&color=fff`;
                        }}

                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{post.author}</p>
                      <p className="text-xs text-slate-500">{post.authorRole}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="flex flex-col items-end gap-2 text-slate-400">
                    <span className="text-xs font-medium whitespace-nowrap">{post.readingTime}</span>
                    <div className="p-3 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:text-indigo-600 transition-all">
                     <Link href={`/blog/${post.id}`}> <ArrowRight className="w-5 h-5" /></Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">No matches found</h3>
              <p className="text-slate-500">We couldn't find anything matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-500">Showing {filteredPosts.length} of {MOCK_POSTS.length} results</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-semibold border border-slate-200 rounded-lg hover:bg-white transition-colors">Previous</button>
              <button className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-500 transition-colors">Next</button>
            </div>
          </div>
        )}
      </main>


    </div>
  );
};

export default Archive;