
"use client";
import React, { useState, useMemo, FormEvent, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Megaphone, 
  Eye, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Clock, 
  User, 
  Tag, 
  Search, 
  SlidersHorizontal, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  TrendingUp, 
  BookOpen, 
  PlusCircle, 
  Share2, 
  Heart, 
  Settings,
  Bell,
  Menu,
  X,
  ExternalLink,
  LogOut,
  CirclePower,
  Edit2,
  
} from 'lucide-react';
import Link from 'next/link';
import { content } from 'googleapis/build/src/apis/content';
import { redirect } from 'next/navigation';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// High-quality preloaded articles to showcase the design immediately
export const PRELOADED_ARTICLES = [
  {
    id: '1',
    title: 'Designing for the Modern Web: Typography, Grids, and Dark Mode',
    author: 'Sarah Jenkins',
    category: 'Design',
    readTime: '6 min read',
    date: 'May 18, 2026',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    content: `Typography is the backbone of web design. Over 90% of information on the web is in written form. When we design websites today, we are not just arranging pixels; we are crafting readable interfaces that guide the reader’s eye effortlessly from one point to another. In this comprehensive guide, we delve into the intricate relationship between font pairings, dynamic responsive grids, and the highly anticipated dark mode standardizations.

We start by exploring the rule of contrast. Pairing a clean, high-contrast serif typeface for headers with a highly legible sans-serif for body copy instantly establishes a strong hierarchy. Furthermore, grids should never be static. With the advent of modern CSS Subgrids and Container Queries, our layouts must breathe and adapt in real-time, depending on context, not just generic breakpoints.

Finally, Dark Mode is no longer just a trend. It is an accessibility requirement. Implementing dark mode involves careful management of luminance contrast ratios to avoid eye strain. Pure black backgrounds (#000000) can cause a glowing effect with white text, which degrades legibility. Instead, favor deep charcoal gray tones and adjust color saturation dynamically to keep your designs crisp, premium, and inclusive.`
  },
  {
    id: '2',
    title: 'The Rise of Serverless Compute: Next-Gen Architecture Breakdown',
    author: 'Marcus Chen',
    category: 'Engineering',
    readTime: '8 min read',
    date: 'May 12, 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    content: `The cloud computing landscape has shifted dramatically over the past decade. We have transitioned from renting physical servers in colocation facilities to launching virtual machines, then to containerization with Kubernetes, and now finally to micro-architectures running completely serverless functions. 

Serverless doesn’t mean there are no servers; it means developers no longer have to provision, manage, or scale them. Functions execute only when triggered by events—such as an API gateway request, a file upload to a cloud bucket, or a scheduled cron trigger—and spin down immediately afterward. This pay-as-you-go pricing model means zero idle costs.

However, the serverless paradigm presents unique challenges. Cold starts remain a persistent hurdle. When a function has not been invoked recently, the cloud provider must initialize a new execution environment, leading to latency spikes. We analyze techniques to keep functions warm, optimize bundle sizes, and leverage edge runtimes like Cloudflare Workers or Vercel Edge functions to achieve sub-millisecond start times globally.`
  },
  {
    id: '3',
    title: 'Productivity Systems That Actually Work: Avoiding the Setup Trap',
    author: 'Elena Rostova',
    category: 'Productivity',
    readTime: '5 min read',
    date: 'April 29, 2026',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
    content: `We have all fallen victim to the productivity tool spiral. You spend hours setting up a brand-new task manager, customizing tags, color-coding projects, and automating notifications, only to abandon it two weeks later. This is what productivity experts call 'productive procrastination.'

The core issue is that complexity is the enemy of execution. The best productivity system is the simplest one that fits your psychological baseline. It should offer frictionless capturing, effortless organization, and unambiguous action triggers.

In this deep dive, we break down three battle-tested systems: the classic Getting Things Done (GTD) framework, the minimalist Time Blocking method, and the Kanban style pipeline. The key takeaway across all of these systems is immediate capturing. Whenever an idea, task, or obligation surfaces, write it down immediately to free up your cognitive load. Do not store live tasks in your active working memory; save your brain power for solving problems, not remembering them.`
  }
];

export const PRELOADED_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'System Maintenance Scheduled',
    content: 'We will be conducting database optimization on Sunday, May 24, at 02:00 AM UTC. Expect temporary read-only access for up to 15 minutes.',
    type: 'warning',
    active: true,
    date: 'May 22, 2026',
    link:"",
    cta:"",
    venue:""
  },
  {
    id: '2',
    title: '🎉 Welcome to Our New Creator Hub!',
    content: 'We have launched our newly integrated authoring workspace today. Create rich articles, manage your metrics, and customize announcements effortlessly.',
    type: 'success',
    active: true,
    date: 'May 20, 2026',
    link:"",
    cta:"",
    venue:""
  }
];

// Safely extracts the first N words of a string and appends trailing characters if longer.
function getFirstNWords(text:string, numWords = 100) {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= numWords) {
    return text;
  }
  return words.slice(0, numWords).join(' ') + '...';
}

// 1. Define the type for our form's internal state
interface FormDataState {
  title: string;
  content: string;
  type: string;
  active: boolean;
}

// 1. Define the type for our form's internal state
interface EventType {
  id:string;
  link:string;
  date:string;
  title: string;
  content: string;
  type: string;
  active: boolean;
  venue:string;
}

// 2. Define the exact shape your Google Apps Script is expecting
interface SpreadsheetPayload extends FormDataState {
  id: string;
  date: string;
}

export default function App() {

  

  // Replace this with your actual Google Apps Script Web App URL
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
  // const APPS_URL = process.env.APPS_SCRIPT_URL
  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    content: '',
    type: 'Announcement', // Default value
    active: true,
  });

  const [loading, setLoading] = useState<boolean>(false);
  // const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // AI generated articles and announcements states
// Navigation State
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard' | 'editor' | 'reader'
  
  // Blog State
  const [posts, setPosts] = useState(PRELOADED_ARTICLES);
  const [activePostId, setActivePostId] = useState("demystifying-generative-ai");
  
  // Dashboard Metrics & Outlines state
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [selectedTone, setSelectedTone] = useState("Inspirational & Engaging");
  const [outlineNotes, setOutlineNotes] = useState("");
  
  // Generation & Status states
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [copiedSlug, setCopiedSlug] = useState(false);

  // Active post reader data lookup
  const currentPost = posts.find(p => p.id === activePostId) || posts[0];

  // Helper to append output console logs
  const addLog = (msg:String) => {
    setGenerationLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // LLM Generation Handler using Gemini-2.5-flash-preview-09-2025
  const handleGeneratePost = async () => {
    if (!newTitle.trim()) {
      setStatusMessage("Please enter a blog post title to begin.");
      return;
    }

    setIsGenerating(true);
    setStatusMessage("Connecting to LLM Engine...");
    setGenerationLogs([]);
    addLog("Initializing generation engine...");
    addLog(`Target Title: "${newTitle}"`);
    addLog(`Target Category: ${selectedCategory} | Tone: ${selectedTone}`);

    // Create a robust prompt for the model
    const systemInstruction = "You are a world-class professional technology writer, copywriter, and tech blogger. You write exceptionally engaging, human-like, deep, and informative blog posts formatted in beautiful, elegant Markdown. You always structure with appropriate headings (H2, H3), blockquotes, lists, and bold text.";
    
    const userQuery = `Write a comprehensive, premium blog article based on:
    Title: ${newTitle}
    Subtitle: ${newSubtitle || "A deep-dive investigation into this topic."}
    Category: ${selectedCategory}
    Tone of voice: ${selectedTone}
    Key points/Outline notes to include: ${outlineNotes || "Provide an immersive overview with actionable lessons, real-world analogies, and a stellar conclusion."}
    
    Make the article roughly 400-600 words. Start directly with an H2 heading (using ##). Do not output the main title as an H1, as the platform renders it automatically. End with a strong actionable takeaway section.`;

    // Implement exponential backoff for the API request as instructed
    const makeApiCallWithBackoff = async (retries = 5, delay = 1000) => {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP Error Status: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error("Invalid response schema from LLM.");
        }
        return text;
      } catch (error) {
        if (retries > 0) {
          addLog(`API request failed. Retrying in ${(delay / 1000)}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return makeApiCallWithBackoff(retries - 1, delay * 2);
        } else {
          throw error;
        }
      }
    };

    try {
      addLog("Sending prompt to gemini-2.5-flash-preview-09-2025...");
      const generatedMarkdown = await makeApiCallWithBackoff();
      
      addLog("Content received successfully!");
      addLog("Formatting and saving draft payload...");

      // Generate a dynamic Next.js-style slug
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Create new post item
      const wordsCount = generatedMarkdown.split(/\s+/).length;
      const calculatedReadingTime = `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;

      const newPost = {
        id: generatedSlug,
        title: newTitle,
        subtitle: newSubtitle || "Generated by Gemini LLM",
        content: generatedMarkdown,
        category: selectedCategory,
        status: "Draft",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readingTime: calculatedReadingTime,
        author: "AI Assistant & Admin",
        tone: selectedTone,
        engagement: 1
      };

      // Add to local state (Next.js dynamic rendering mock space)
    //   setPosts(prev => [newPost, ...prev]);
      setActivePostId(generatedSlug);
      
      addLog("Successfully connected & rendered into simulated Next.js Dynamic Router!");
      setStatusMessage("Blog post generated successfully!");
      
      // Keep state clean and automatically move to dynamic view
      setTimeout(() => {
        setCurrentTab('reader');
        // Reset admin form inputs
        setNewTitle("");
        setNewSubtitle("");
        setOutlineNotes("");
        setIsGenerating(false);
      }, 1500);

    } catch (err:any) {
      console.error(err);
      addLog(`Error: ${err.message}`);
      setStatusMessage("Failed to generate article. Check connection & try again.");
      setIsGenerating(false);
    }
  };

  // Helper to handle copying mock Next.js routing path
  const handleCopyPath = (slug:string) => {
    const mockPath = `https://your-next-app.vercel.app/blog/${slug}`;
    // Using recommended clipboard command
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = mockPath;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const handleDeletePost = (id:string) => {
    if (posts.length <= 1) {
      alert("You must keep at least one blog post in the system.");
      return;
    }
    const remaining = posts.filter(p => p.id !== id);
    setPosts(remaining);
    setActivePostId(remaining[0].id);
  };

  const handlePublishPost = (id:string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'Published' } : p));
  };


  const [articles, setArticles] = useState(PRELOADED_ARTICLES);
  const [announcements, setAnnouncements] = useState(PRELOADED_ANNOUNCEMENTS);
  const [currentView, setCurrentView] = useState('admin'); // 'public-archive', 'public-article', 'admin'
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');


  
  
  // Mobile Nav State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin Form States (Blogs)
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newPermlink, setNewPermlink] = useState('');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogAuthorRole, setNewBlogAuthorRole] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Design');
  const [newBlogReadTime, setNewBlogReadTime] = useState('5 min read');
  const [newBlogImage, setNewBlogImage] = useState('');
  const [newBlogDocUrl, setNewBlogDocUrl] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [blogFormError, setBlogFormError] = useState('');
  const [blogData, setBlogData] = useState<any[]>([]);
  const [error, setError] = useState(null);

  // Admin Form States (Announcements)
  const [newAnnounceTitle, setNewAnnounceTitle] = useState('');
  const [newAnnounceContent, setNewAnnounceContent] = useState('');
  const [newAnnounceType, setNewAnnounceType] = useState('info'); // info, warning, success
  const [announceFormError, setAnnounceFormError] = useState('');


  // Event form states
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('webinar'); // webinar, workshop, conference
  const [eventFormError, setEventFormError] = useState('');
  const [cta, setCta] = useState("")
  const [eventLink, setEventLink] = useState("")
  const [events, setEvents] = useState<any[]>([]);
  const [eventsAnnouncements, setEventsAnnouncements] = useState(PRELOADED_ANNOUNCEMENTS);
const [editing, setEditing] = useState(false)
const [eventId, setEventId]= useState('')
  const handleEventEdit =(id:string)=>{
    setEditing(true)
    eventsAnnouncements.map((eventAnn)=>{
      if(eventAnn.title===id){

        console.log(eventAnn)
        setEventId(eventAnn.id)
        setEventTitle(eventAnn.title)
        setEventLink(eventAnn.link)
        setEventType(eventAnn.type)
        setEventDescription(eventAnn.content)
        setCta(eventAnn.cta)
        // setEventType(eventAnn.venue)
      }
    })
  }


 // === SEND DATA TO BACKEND ===
  const handleEventUpdate = async () => {
    // e.preventDefault();
    setLoading(true)
    setError(null);

    const newEventData={
      id:eventId,
      title:eventTitle,
      link:eventLink,
      type:eventType,
      content:eventDescription,
      cta:cta
    }

    try {
      const response = await fetch(`/api/event/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEventData),   // ← This sends all form data
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update event');
      }

      alert('✅ Event updated successfully in Google Sheet!');
      // router.push('/events');     // Redirect after success
      // router.refresh();
      setLoading(false)
    } catch (err: any) {
      setError(err.message);
    } finally {
      // setSaving(false);
    }
  };

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState('blogs'); // 'blogs', 'announcements'

      useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('/api/blog-data');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setBlogData(data);
          console.log("Blog data fetched from API:", blogData);
        } catch (err:any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);

      useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/announcement');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);



     useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await fetch('/api/event');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEventsAnnouncements(data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEventData();
  }, []);

  useEffect(() => {
    if(!localStorage.getItem('isLoggedIn')) {
      redirect('/login');
    }
  }, []);

  const handleViewArticle = (id:any) => {
    setSelectedArticleId(id);
    setCurrentView('public-article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArchive = () => {
    setCurrentView('public-archive');
    setSelectedArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateBlog = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newBlogTitle.trim() || !newBlogAuthor.trim() || !newBlogContent.trim()) {
      setBlogFormError('Please fill out all required fields (Title, Author, and Content).');
      return;
    }

    const defaultImages = [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
    ];
    const imageToUse = newBlogImage.trim() || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const newArticle = {
      id: Date.now().toString(),
      title: newBlogTitle,
      permlink: newPermlink,
      author: newBlogAuthor,
      authorRole: newBlogAuthorRole,
      category: newBlogCategory,
      readTime: newBlogReadTime,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      image: imageToUse,
      content: newBlogContent
    };

    setArticles([newArticle, ...articles]);
    
    // Reset fields
    setNewBlogTitle('');
    setNewPermlink('');
    setNewBlogAuthor('');
    setNewBlogAuthorRole('');
    setNewBlogCategory('Design');
    setNewBlogReadTime('5 min read');
    setNewBlogImage('');
    setNewBlogDocUrl('');
    setNewBlogContent('');
    setNewBlogExcerpt('');
    setBlogFormError('');
    
    // Visual Notification Triggered in State (Optional upgrade: Toast)
    alertSuccess('Blog article published successfully!');
  };

  const handleDeleteBlog = (id:any) => {
    if (confirmDelete('Are you sure you want to delete this blog article?')) {
      setArticles(articles.filter(art => art.id !== id));
      if (selectedArticleId === id) {
        setCurrentView('public-archive');
      }
    }
  };

  // const handleCreateAnnouncement = (e:any) => {
  //   e.preventDefault();
  //   if (!newAnnounceTitle.trim() || !newAnnounceContent.trim()) {
  //     setAnnounceFormError('Please fill out both Title and Message content.');
  //     return;
  //   }

  //   const newAnnouncement = {
  //     id: Date.now().toString(),
  //     title: newAnnounceTitle,
  //     content: newAnnounceContent,
  //     type: newAnnounceType,
  //     active: true,
  //     date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  //   };

  //   setAnnouncements([newAnnouncement, ...announcements]);
  //   setNewAnnounceTitle('');
  //   setNewAnnounceContent('');
  //   setNewAnnounceType('info');
  //   setAnnounceFormError('');

  //   alertSuccess('Announcement published successfully!');
  // };

  // Handle inputs dynamically and type-safely
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value, type } = e.target;
    
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
  //   }));
  // };
// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatusMessage('');

//     // 3. Construct the payload matching your Apps Script keys exactly
//     const payload: SpreadsheetPayload = {
//       ...formData,
//       id: crypto.randomUUID(), // Generates a unique string ID
//       date: new Date().toISOString(), // Standard ISO date string
//     };

//     const newAnnouncement = {
//       id: Date.now().toString(),
//       title: newAnnounceTitle,
//       content: newAnnounceContent,
//       type: newAnnounceType,
//       active: true,
//       date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
//     };

//     try {
//       // 4. Send the POST request
//       // Note: We use 'mode: "cors"' if you allowed "Anyone" access on your deployment
//       const response = await fetch(APPS_SCRIPT_URL, {
//         method: 'POST',
//         mode: 'cors', 
//         headers: {
//           'Content-Type': 'text/plain', // Prevents pre-flight CORS triggers in some Apps Script setups
//         },
//         body: JSON.stringify(newAnnouncement), // Send the announcement data as JSON string
//       });

//       const result = await response.json();

//       if (result.status === 'success') {
//         setStatusMessage("success");
//         // Reset form
//         setFormData({ title: '', content: '', type: 'Announcement', active: true });
//       } else {
//         throw new Error(result.message || 'Failed to write to sheet.');
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       setStatusMessage(
        
//          'An error occurred while submitting.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setStatusMessage('');

  // 1. Pick your sheet
  const targetSheetName = "Sheet1"; // Change this to your actual sheet name if different

  // 2. Build the object keys to match that specific sheet's headers EXACTLY
    const newAnnouncement = {
      sheetName: targetSheetName,
      id: Date.now().toString(),
      title: newAnnounceTitle,
      content: newAnnounceContent,
      type: newAnnounceType,
      active: true,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

  try {
    console.log("Submitting announcement to Google Apps Script:", newAnnouncement);
    const response = await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL as string, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'text/plain', 
      },
      body: JSON.stringify(newAnnouncement), 
    });

    const result = await response.json();

  //   let result;
  // try {
  //   result = JSON.parse(rawText);
  // } catch (parseError) {
  //   console.log("Server did not return JSON. Raw response was:", rawText);
  //   throw new Error("Invalid server response format.");
  // }

    if (result.status === 'success') {
      setStatusMessage("success");
    } else {
      setStatusMessage("Failed to submit announcement.");
      throw new Error(result.message || 'Failed to write to sheet.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    setStatusMessage('An error occurred while submitting.');
  } finally {
    setLoading(false);
  }
};  


const handleNewBlog = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setStatusMessage('');

  // 1. Pick your sheet
  const targetSheetName = "blogs"; // Change this to your actual sheet name if different

  // 2. Build the object keys to match that specific sheet's headers EXACTLY
    const newBlog= {
      sheetName: targetSheetName,
      id: Date.now().toString(),
      title: newBlogTitle,
      permlink: newPermlink,
      excerpt: newBlogExcerpt,
      docUrl: newBlogDocUrl,
      authorRole: newBlogAuthorRole,
      author: newBlogAuthor,
      category: newBlogCategory,
      readTime: newBlogReadTime,
      image: newBlogImage,

      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL as string, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'text/plain', 
      },
      body: JSON.stringify(newBlog), 
    });

    const result = await response.json();

    if (result.status === 'success') {
      setStatusMessage("success");
    } else {
      setStatusMessage("Failed to submit blog post.");
      throw new Error(result.message || 'Failed to write to sheet.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    setStatusMessage('An error occurred while submitting.');
  } finally {
    setLoading(false);
  }
}; 

const handleEventSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setEventFormError('');

  // 1. Pick your sheet
  const targetSheetName = "events"; // Change this to your actual sheet name if different

  // 2. Build the object keys to match that specific sheet's headers EXACTLY
    const newEvent= {
      sheetName: targetSheetName,
      id: Date.now().toString(),
      title: eventTitle,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: eventDescription,
      link: eventLink,
      venue: eventType,
      cta: cta
    };

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL as string, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'text/plain', 
      },
      body: JSON.stringify(newEvent), 
    });

    const result = await response.json();

    if (result.status === 'success') {
      setEventFormError("");
    } else {
      setEventFormError("Failed to submit event.");
      throw new Error(result.message || 'Failed to write to sheet.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    setEventFormError('An error occurred while submitting.');
  } finally {
    setLoading(false);
  }
};
const handleDeleteAnnouncement = (id:any) => {
    if (confirmDelete('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(ann => ann.id !== id));
    }
  };

  const toggleAnnouncementStatus = (id:any) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, active: !ann.active } : ann
    ));
  };

  // Safe non-blocking custom modal triggers (simulating alert/confirms cleanly)
  const [successToast, setSuccessToast] = useState('');
  const alertSuccess = (msg:any) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const [deleteConfirmCallback, setDeleteConfirmCallback] = useState(null);
  const confirmDelete = (msg:any) => {
    // In-app fallback cleanly satisfying the iframe limitations
    return window.confirm(msg);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const categories = ['All', 'Design', 'Engineering', 'Productivity', 'Business', 'Life'];

  // Stats Counters
  const totalViewsSimulated = useMemo(() => {
    return (articles.length * 142) + 389;
  }, [articles]);

  const selectedArticle = articles.find(art => art.id === selectedArticleId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 my-24 pt-4 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-all duration-300">
      
      {}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-4 rounded-xl shadow-2xl animate-bounce border border-emerald-500">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <p className="font-semibold text-sm">{successToast}</p>
        </div>
      )}

      {}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleBackToArchive}>
              <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Blog
                </span>
                <span className="text-xs block font-semibold text-slate-400 -mt-1 uppercase tracking-widest">Portal</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">

              
              <button 
                onClick={() => setCurrentView('admin')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  currentView === 'admin' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </button>
                            <button 
                onClick={() => {
                  localStorage.removeItem('isLoggedIn');
                  redirect('/login');
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  currentView === 'admin' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CirclePower className="h-4 w-4 text-red-500" />
                Logout
              </button>
            </nav>

            {/* Mobile Hamburger Trigger */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
            <button 
              onClick={() => {
                setCurrentView('public-archive');
                setSelectedArticleId(null);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition ${
                currentView.startsWith('public') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Blog Archive
            </button>
            <button 
              onClick={() => {
                setCurrentView('admin');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition flex items-center gap-3 ${
                currentView === 'admin' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Admin Dashboard
            </button>
          </div>
        )}
      </header>

      {}


      {/* Main Content Area Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">



        {}
        {currentView === 'public-article' && selectedArticle && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Back Button */}
            <button 
              onClick={handleBackToArchive}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition group mb-2"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition duration-150" />
              Back to Blog Feed
            </button>

            {/* Article Wrapper Card */}
            <article className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200">
              
              {/* Dynamic Hero Banner */}
              <div className="relative h-64 sm:h-[420px] w-full overflow-hidden">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                    {selectedArticle.category}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight leading-tight">
                    {selectedArticle.title}
                  </h1>
                </div>
              </div>

              {/* Author & Publishing Meta Area */}
              <div className="px-6 py-4 sm:px-8 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                    {selectedArticle.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">{selectedArticle.author}</span>
                    <span className="text-xs text-slate-400 font-semibold">Author Profile</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {selectedArticle.readTime}
                  </span>
                  <span>•</span>
                  <span>Published on {selectedArticle.date}</span>
                </div>
              </div>

              {/* Rich Content Display */}
              <div className="px-6 py-8 sm:p-10">
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal whitespace-pre-line prose max-w-none">
                  {selectedArticle.content}
                </p>
              </div>

              {/* Social share engagement deck simulation */}
              <div className="px-6 py-6 sm:px-10 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-500 transition px-3 py-2 rounded-lg hover:bg-rose-50">
                    <Heart className="h-4 w-4" />
                    Like Post
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition px-3 py-2 rounded-lg hover:bg-indigo-50">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>

                <span className="text-xs text-slate-400 font-semibold">
                  Views: {Math.floor(Math.random() * 80) + 120} reads today
                </span>
              </div>

            </article>

            {/* Bottom recommendation trigger section */}
            <div className="bg-indigo-900 text-white rounded-3xl p-8 shadow-xl text-center space-y-4">
              <h3 className="text-xl font-bold">Enjoyed Sarah's or Marcus's thoughts?</h3>
              <p className="text-indigo-200 text-sm max-w-lg mx-auto">
                Explore similar content under our primary tags or subscribe to notifications to stay informed on newly posted articles.
              </p>
              <div className="flex justify-center gap-3">
                <button 
                  onClick={handleBackToArchive}
                  className="bg-white text-indigo-900 hover:bg-indigo-50 font-extrabold px-6 py-2.5 rounded-xl text-xs transition duration-150 shadow-sm"
                >
                  Return to Feed
                </button>
              </div>
            </div>

          </div>
        )}

        {}
        {currentView === 'admin' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Dashboard Headers */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-3xl font-black text-slate-950 tracking-tight flex items-center gap-3">
                  <LayoutDashboard className="h-8 w-8 text-indigo-600" />
                  System Admin Console
                </h1>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Manage written stories, archive lists, and announce dynamic notifications immediately to your readers.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link 
                  href={'/'}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 transition"
                >
                  <Eye className="h-4 w-4" />
                  View Public Site
                </Link>
              </div>
            </div>

            {/* Dashboard Numerical Analytical Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Active Articles</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">{blogData.length}</span>
                </div>
                <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl">
                  <FileText className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Active Notices</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">
                    {announcements.length}
                  </span>
                </div>
                <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl">
                  <Megaphone className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Total Events this year</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">{totalViewsSimulated}</span>
                </div>
                <div className="bg-purple-100 text-purple-700 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">System Status</span>
                  <span className="text-2xl font-black text-emerald-600 mt-1 block">ONLINE</span>
                </div>
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>

            </div>

            {}
            <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs inline-flex gap-1.5">
              <button 
                onClick={() => setAdminTab('blogs')}
                className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                  adminTab === 'blogs' 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FileText className="h-4 w-4" />
                Articles Manager
              </button>
              <button 
                onClick={() => setAdminTab('announcements')}
                className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                  adminTab === 'announcements' 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Megaphone className="h-4 w-4" />
                Announcements Workspace
              </button>

                <button 
                onClick={() => setAdminTab('events')}
                className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                  adminTab === 'events' 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FileText className="h-4 w-4" />
                Events Manager
              </button>
            </div>

 

            {/* SUBTAB CONTENT 1: Blogs Manager */}
            {adminTab === 'blogs' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Area: Creation Form (5/12) */}
                <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <PlusCircle className="h-5 w-5 text-indigo-600" />
                      Publish New Article
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold mt-1">Fields marked with (*) are mandatory</p>
                  </div>

                  <form onSubmit={handleNewBlog} className="space-y-4">
                    {blogFormError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-lg flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        {blogFormError}
                      </div>
                    )}

                    {/* Blog Title */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Article Title *
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Navigating Microservice Complexity"
                        value={newBlogTitle}
                        onChange={(e) => setNewBlogTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    {/* Blog permlink */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Article Permalink *
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Navigating_Microservice_Complexity (No Spaces or special characters)"
                        value={newPermlink}
                        onChange={(e) => setNewPermlink(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    {/* Blog Author */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Author Name *
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Dr. Jordan Vance"
                        value={newBlogAuthor}
                        onChange={(e) => setNewBlogAuthor(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    {/* Dual Selector Row: Category and Read time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                          Category
                        </label>
                        <select 
                          value={newBlogCategory}
                          onChange={(e) => setNewBlogCategory(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        >
                          {categories.filter(c => c !== 'All').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                          Read Duration
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g. 5 min read"
                          value={newBlogReadTime}
                          onChange={(e) => setNewBlogReadTime(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Cover Image Input */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Cover Image URL <span className="text-slate-400 lowercase italic">(optional)</span>
                      </label>
                      <input 
                        type="url"
                        placeholder="Leave blank for random high-quality Unsplash image"
                        value={newBlogImage}
                        onChange={(e) => setNewBlogImage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* DOC URL*/}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Document URL <span className="text-slate-400 lowercase italic">*</span>
                      </label>
                      <input 
                        type="url"
                        placeholder="https://docs.google.com/document/d/1gDoK9CbBdeUYdxVGUBSAI_a2RPj9AgeQhVQW0uBSdEU/edit?usp=sharing"
                        required
                        value={newBlogDocUrl}
                        onChange={(e) => setNewBlogDocUrl(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Blog excerpt Textarea */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Excerpt * <span className="text-slate-400 lowercase italic">({newBlogContent.split(/\s+/).filter(Boolean).length} words typed)</span>
                      </label>
                      <textarea 
                        rows={4}
                        placeholder="Write your beautiful article content here. Keep it structured and rich..."
                        value={newBlogExcerpt}
                        onChange={(e) => setNewBlogExcerpt(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 font-normal leading-relaxed"
                        required
                      ></textarea>
                    </div>



                    {/* Form submit */}
                    <button 
                    // onClick={handleGeneratePost}
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition duration-150 flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Plus className="h-4 w-4" />
                      {loading ? 'Publishing...' : 'Publish Article'}
                    </button>

                  </form>
                </div>

                {/* Right Area: List & Control Grid (7/12) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Live Articles Manager Table</h3>
                    <p className="text-slate-500 text-xs font-semibold mt-1">Review, view, or remove published content from the system database.</p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-100">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50/75 border-b border-slate-200 text-xs text-slate-400 font-extrabold uppercase">
                          <th className="p-4">Details</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {blogData.map((article, index) => (
                          <tr key={index} className="hover:bg-slate-50/40 transition">
                            {/* Title & Author */}
                            <td className="p-4 max-w-[280px]">
                              <p className="font-bold text-slate-800 line-clamp-1">{article.title}</p>
                              <span className="text-xs text-slate-400 font-semibold">{article.author}</span>
                            </td>

                            {/* Category Tag */}
                            <td className="p-4">
                              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                                {article.category}
                              </span>
                            </td>

                            {/* Date */}
                            <td className="p-4 text-xs font-semibold text-slate-500 whitespace-nowrap">
                              {article.date}
                            </td>

                            {/* Actions Column */}
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <Link 
                                  href={`/blog/${article.permlink}`}
                                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                  title="View Live Page"
                                >
                                  <Eye className="h-4 w-4" />
                                </Link>
                                {/* <button 
                                  // onClick={() => handleDeleteBlog(article.id)}
                                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                  title="Delete Article"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button> */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>
            )}

            {}
            {adminTab === 'announcements' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Form (5/12) */}
                <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-indigo-600" />
                      Create New Announcement
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold mt-1">Broadcast direct updates or emergency warning warnings on live headers.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {announceFormError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-lg flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        {announceFormError}
                      </div>
                    )}

                    {/* Announcement Title */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Announcement Header *
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Scheduled Network Refresh"
                        value={newAnnounceTitle}
                        onChange={(e) => setNewAnnounceTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    {/* Severity Selection */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Broadcasting Type / Severity
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          type="button"
                          onClick={() => setNewAnnounceType('info')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                            newAnnounceType === 'info' 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Info className="h-3.5 w-3.5" />
                          Info
                        </button>
                        <button 
                          type="button"
                          onClick={() => setNewAnnounceType('warning')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                            newAnnounceType === 'warning' 
                              ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Warning
                        </button>
                        <button 
                          type="button"
                          onClick={() => setNewAnnounceType('success')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                            newAnnounceType === 'success' 
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Success
                        </button>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Announcement Content Message *
                      </label>
                      <textarea 
                        rows={4}
                        placeholder="Write a clear, concise broadcast statement..."
                        value={newAnnounceContent}
                        onChange={(e) => setNewAnnounceContent(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 leading-relaxed"
                        required
                      ></textarea>
                    </div>

                    {/* Broadcast Action */}
                    <button 
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition duration-150 flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Plus className="h-4 w-4" />
                      {loading ? 'Submitting...' : 'Deploy Live Broadcast'}
                  
                    </button>

                  </form>
                </div>

                {/* Right Announcements Listing List (7/12) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Current Noticeboard Logs</h3>
                    <p className="text-slate-500 text-xs font-semibold mt-1">Configure status toggles or completely delete active alerts.</p>
                  </div>

                  <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                    {announcements.length === 0 ? (
                      <p className="text-slate-400 text-sm italic py-8 text-center">No announcements created yet. Use the tool on the left to write one.</p>
                    ) : (
                      announcements.map((ann, index) => (
                        <div 
                          key={index} 
                          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50/50 transition"
                        >
                          <div className="space-y-1.5 max-w-[400px]">
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide ${
                                ann.type === 'warning' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : ann.type === 'success' 
                                    ? 'bg-emerald-100 text-emerald-800' 
                                    : 'bg-blue-100 text-blue-800'
                              }`}>
                                {ann.type}
                              </span>
                              <span className="text-xs text-slate-400 font-semibold">{ann.date}</span>
                            </div>
                            <h4 className="font-extrabold text-slate-800 text-sm">{ann.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{ann.content}</p>
                          </div>

                          <div className="flex items-center gap-3 justify-end shrink-0 pt-2 sm:pt-0">
                            {/* Toggle Button */}
                            <button 
                              onClick={() => toggleAnnouncementStatus(ann.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                ann.active 
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {ann.active ? 'Active' : 'Disabled'}
                            </button>
                            
                            {/* Delete Button */}
                            <button 
                              onClick={() => handleDeleteAnnouncement(ann.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* SUBTAB CONTENT 3: Events Manager */}

            {adminTab === 'events' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Form (5/12) */}
                <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-indigo-600" />
                      Create New Event
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold mt-1">Broadcast direct updates or emergency warning warnings on live headers.</p>
                  </div>

                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    {eventFormError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-lg flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        {eventFormError}
                      </div>
                    )}

                    {/* Event Title */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Event Title *
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Scheduled Network Refresh"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    {/* EventLink */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Event Link *
                      </label>
                      <input 
                        type="url"
                        placeholder="e.g. https://example.com/event"
                        value={eventLink}
                        onChange={(e) => setEventLink(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    {/* Severity Selection */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Event Type / Severity
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          type="button"
                          onClick={() => setEventType('webinar')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                            eventType === 'webinar' 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Info className="h-3.5 w-3.5" />
                          Webinar
                        </button>
                        <button 
                          type="button"
                          onClick={() => setEventType('conference')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                            eventType === 'conference' 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Conference
                        </button>
                        <button 
                          type="button"
                          onClick={() => setEventType('workshop')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                            eventType === 'workshop' 
                              ? 'bg-green-600 text-white border-green-600 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Workshop
                        </button>
                      </div>
                    </div>

                       <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                          Event CTA
                        </label>
                        <select 
                          value={cta}
                          onChange={(e) => setCta(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        >
                          {["Read More", "Register Now", "Join Here"].filter(c => c !== 'All').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                    {/* Message Body */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Event Description *
                      </label>
                      <textarea 
                        rows={4}
                        placeholder="Write a clear, concise event description..."
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 leading-relaxed"
                        required
                      ></textarea>
                    </div>

                    {/* Broadcast Action */}
                    {editing?(
                    <button
                          type="button"                    // ← Important: not submit
                          onClick={handleEventUpdate}      // ← Fixed
                          disabled={loading}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition duration-150 flex items-center justify-center gap-2 shadow-xs disabled:opacity-70"
                        >
                          <Plus className="h-4 w-4" />
                          {loading ? 'Updating...' : 'Update Event'}
                        </button>
                    ):(<>
                    
                    <button 
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition duration-150 flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Plus className="h-4 w-4" />
                      {loading ? 'Submitting...' : 'Deploy Upcoming Event'}
                  
                    </button>
                    
                    </>)}


                  </form>
                </div>

                {/* Right Announcements Listing List (7/12) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Current Noticeboard Logs</h3>
                    <p className="text-slate-500 text-xs font-semibold mt-1">Configure status toggles or completely delete active alerts.</p>
                  </div>

                  <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                    {eventsAnnouncements.length === 0 ? (
                      <p className="text-slate-400 text-sm italic py-8 text-center">No announcements created yet. Use the tool on the left to write one.</p>
                    ) : (
                      eventsAnnouncements.map((ann, index) => (
                        <div 
                          key={index} 
                          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50/50 transition"
                        >
                          <div className="space-y-1.5 max-w-[400px]">
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide ${
                                ann.type === 'warning' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : ann.type === 'success' 
                                    ? 'bg-emerald-100 text-emerald-800' 
                                    : 'bg-blue-100 text-blue-800'
                              }`}>
                                {ann.type}
                              </span>
                              <span className="text-xs text-slate-400 font-semibold">{ann.date}</span>
                            </div>
                            <h4 className="font-extrabold text-slate-800 text-sm">{ann.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{ann.content}</p>
                          </div>

                          <div className="flex items-center gap-3 justify-end shrink-0 pt-2 sm:pt-0">
                            {/* Toggle Button */}
                            <button 
                              onClick={() => toggleAnnouncementStatus(ann.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                ann.active 
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {ann.active ? 'Active' : 'Disabled'}
                            </button>
                            {/* Edit button */}
                            <button 
                              onClick={() => handleEventEdit(ann.title)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            >
                              <Edit2 className="h-4.5 w-4.5" />
                            </button>
                            
                            {/* Delete Button */}
                            <button 
                              onClick={() => handleDeleteAnnouncement(ann.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {}


    </div>
  );
}