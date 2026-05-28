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

const API_KEY = "AIzaSyCSxOEPg9tshhaZdQSSAnEtfbSMblPLJgY"




export const PRELOADED_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'System Maintenance Scheduled',
    content: 'We will be conducting database optimization on Sunday, May 24, at 02:00 AM UTC. Expect temporary read-only access for up to 15 minutes.',
    type: 'warning',
    active: true,
    date: 'May 22, 2026'
  },
  {
    id: '2',
    title: '🎉 Welcome to Our New Creator Hub!',
    content: 'We have launched our newly integrated authoring workspace today. Create rich articles, manage your metrics, and customize announcements effortlessly.',
    type: 'success',
    active: true,
    date: 'May 20, 2026'
  },
    {
    id: '3',
    title: '🎉 Testing Announcement!',
    content: 'We have launched our newly integrated authoring workspace today. Create rich articles, manage your metrics, and customize announcements effortlessly.',
    type: 'success',
    active: true,
    date: 'May 20, 2026'
  }
];

