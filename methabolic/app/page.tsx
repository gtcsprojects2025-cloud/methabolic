


"use client";
import Link from "next/link";
import { useState } from "react";
import { Pause,    Dna, 
  Database, 
  Cpu, 
  Sprout, 
  GraduationCap, 
  Users, 
  ChevronRight, 
  Layers, 
  FileText, 
  Globe, 
  Play, 
  Search, 
  Sparkles, 
  MapPin, 
  Award, 
  Calendar, 
  ShieldCheck, 
  BookOpen, 
  Activity, 
  TrendingUp, 
  HeartPulse, 
  ExternalLink,
  ChevronDown,
  ArrowRight,
  UserPlus,
  Compass,
  FileSpreadsheet, 
  Building} from "lucide-react";
import Footer from "./components/Footer";
export default function Home() {
  const [videoPlaying, setVideoPlaying] = useState(true);

    // Trigger temporary floating notification
  const showToast = (message:any) => {
    setCustomNotify(message);
    setTimeout(() => setCustomNotify(null), 4000);
  };
  

  const audiencePaths = [
    { title: "Mentorship Network", paragraph: "Connect, mentor, and collaborate with emerging scientists across the continent. The mentor intake form will be published here shortly.", link: "Sign up to mentor →", url:"https://docs.google.com/forms/d/e/1FAIpQLSfR8oq7QDOVCFYGGy8nqICnck3SnYbmHonepuPhuOtxhnuuTg/viewform" },
    { title: "1st African Metabolomics Conference", paragraph: "Explore the 1st African Metabolomics Conference 2026, the flagship gathering hosted by Metabolomics South Africa (MSA). Dive into conference programming.", link: "Explore the 1st African Metabolomics Conference 2026 →", url:"https://www.metabolomics-sa.co.za/metabolomics-africa-2026" },
    { title: "Data Contribution", paragraph: "Help build the Pan-African knowledge graph by securely contributing metabolomics datasets.", link: "Contact us to learn more →", url:"mailto:metabolomicsafrica@gmail.com" },
  ];


  const METABOLITE_REGISTRY = [
  {
    id: 'met-1',
    name: 'Aspalathin',
    formula: 'C21H24O11',
    mass: '452.41 m/z',
    source: 'Aspalathus linearis (Rooibos)',
    category: 'Medicinal Plants & Food',
    region: 'Cederberg, South Africa',
    significance: 'Unique C-glycoside flavonoid with intense antioxidant and hypoglycemic properties, currently modeled for type-2 diabetes management systems.',
    abundance: 88,
    peaks: [120, 240, 310, 452]
  },
  {
    id: 'met-2',
    name: 'Artemisinin',
    formula: 'C15H22O5',
    mass: '282.33 m/z',
    source: 'Artemisia annua (African Cultivars)',
    category: 'Traditional Medicine Validation',
    region: 'East & Southern Africa',
    significance: 'Sesquiterpene lactone pivotal for antimalarial therapeutic frameworks. High-throughput profiling helps standardize dose formulations.',
    abundance: 94,
    peaks: [150, 210, 255, 282]
  },
  {
    id: 'met-3',
    name: 'Harpagoside',
    formula: 'C24H30O11',
    mass: '494.49 m/z',
    source: 'Harpagophytum procumbens (Devil\'s Claw)',
    category: 'Medicinal Plants',
    region: 'Kalahari Desert',
    significance: 'Iridoid glycoside clinically validated for anti-inflammatory and analgesic efficacy. Important biomarker for traditional phytomedicines.',
    abundance: 72,
    peaks: [180, 290, 395, 494]
  },
  {
    id: 'met-4',
    name: 'L-DOPA (African Mucuna)',
    formula: 'C9H11NO4',
    mass: '197.19 m/z',
    source: 'Mucuna pruriens (Velvet Bean)',
    category: 'Precision Agriculture & Health',
    region: 'West African Tropical Forests',
    significance: 'Natural dopamine precursor essential for neurodegenerative therapeutics. Local dataset mapping is establishing high-yielding varieties.',
    abundance: 65,
    peaks: [90, 135, 170, 197]
  },
  {
    id: 'met-5',
    name: '1-Deoxynojirimycin (DNJ)',
    formula: 'C6H13NO4',
    mass: '163.17 m/z',
    source: 'Morus mesozygia (African Mulberry)',
    category: 'Traditional Medicine Validation',
    region: 'Sub-Saharan Forests',
    significance: 'Alpha-glucosidase inhibitor mapped for its capacity to reduce postprandial blood glucose spikes in longitudinal metabolic monitoring.',
    abundance: 58,
    peaks: [80, 110, 145, 163]
  }
];

  const [activeTab, setActiveTab] = useState('home'); // 'home', 'amp', 'association', 'webinars', 'contact'
  const [selectedMetabolite, setSelectedMetabolite] = useState(METABOLITE_REGISTRY[0]);
  const [activeWhyTab, setActiveWhyTab] = useState('definition');
  const [webinarSearch, setWebinarSearch] = useState('');
  const [webinarFilter, setWebinarFilter] = useState('All');
  const [membershipForm, setMembershipForm] = useState({ name: '', email: '', institution: '', tier: 'Professional', area: 'Metabolomics' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [customNotify, setCustomNotify] = useState(null);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Video Background */}
     <section className="relative h-screen flex items-end justify-start overflow-hidden mt-16">
      {/* Background Video - Your local video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        id="hero-video"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Use the imported local video */}
<source src="/hero-video.mp4" type="video/mp4" />
        {/* Optional fallback message if video fails to load */}
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70" />

   {/* Pause/Play Button */}
      <button
        onClick={() => {
          const vid = document.getElementById("hero-video") as HTMLVideoElement;
          if (vid) {
            vid.paused ? vid.play() : vid.pause();
            setVideoPlaying(!vid.paused);
          }
        }}
        className="absolute bottom-8 right-8 bg-white/20 p-2 rounded-full hover:bg-white/40 z-10 transition"
      >
        {videoPlaying ? <Pause className="text-white" size={20} /> : <Play className="text-white" size={20} />}
      </button>

  {/* Hero Content - Bottom Left */}
            {/* HERO SECTION */}
            <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-900">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[250px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Vision & Identity */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-full">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">Strategic Scientific Platform</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                      The African <br className="hidden sm:inline" />
                      <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">Metabolome Project</span>
                    </h1>

                    <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-wide border-l-4 border-teal-500 pl-4">
                      Building Africa’s Metabolomics Infrastructure
                    </p>

                    <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
                      Creating African-led metabolomics datasets, tools, and talent to advance precision health, traditional medicine validation, agriculture, environmental monitoring, and AI-powered discovery.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                      <Link href="/amp" className="bg-slate-900 hover:bg-slate-850 text-white font-bold px-6 py-4 rounded-xl text-sm border border-slate-800 hover:border-teal-500/45 transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Explore the AMP Initiative</span>
                        <ChevronRight className="w-4 h-4 text-teal-400" />
                      </Link>
                      <button 
                        onClick={() => {
                          const target = document.getElementById('why-matters');
                          target?.scrollIntoView({ behavior: 'smooth' });
                        }} 
                        className="bg-transparent hover:bg-slate-900 text-slate-300 hover:text-white font-semibold px-6 py-4 rounded-xl text-sm transition-all text-center"
                      >
                        Why Metabolomics Matters
                      </button>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-900/80">
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-white">54</div>
                        <p className="text-xs text-slate-400 font-medium">African Countries Mapped</p>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-teal-400">10k+</div>
                        <p className="text-xs text-slate-400 font-medium">Plants & Crops Catalogued</p>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-indigo-400">1st</div>
                        <p className="text-xs text-slate-400 font-medium">Continental Data Standard</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interactive Spectra Explorer Component */}
                  <div className="lg:col-span-5 bg-slate-900/60 border border-slate-850 rounded-2xl p-6 shadow-2xl backdrop-blur-sm relative">
                    <div className="absolute top-4 right-4 flex items-center space-x-1.5 text-[10px] font-bold tracking-widest text-teal-400 uppercase bg-teal-950/40 px-2 py-1 rounded-full border border-teal-500/20">
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                      <span>Live Spectra Viewer</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-300 mb-1 flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-teal-400" />
                      <span>Metabolite Spectrograph (LC-MS)</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mb-6">
                      Click high-intensity peaks to inspect raw data profiles within our continental reference system.
                    </p>

                    {/* Interactive Spectrometer Visualization */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/50 mb-6 relative">
                      {/* Vertical Y-Axis Label */}
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[9px] text-slate-500 font-mono tracking-widest uppercase">
                        Intensity (%)
                      </div>

                      {/* Peak chart area */}
                      <div className="h-40 flex items-end justify-between px-6 pb-2 border-b border-l border-slate-800 relative">
                        {/* Background gridlines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                          <div className="border-t border-slate-500 w-full" />
                          <div className="border-t border-slate-500 w-full" />
                          <div className="border-t border-slate-500 w-full" />
                        </div>

                        {/* Chart Peaks generated dynamically */}
                        {METABOLITE_REGISTRY.map((m) => {
                          const isSelected = selectedMetabolite.id === m.id;
                          return (
                            <button
                              key={m.id}
                              onClick={() => {
                                setSelectedMetabolite(m);
                                showToast(`Loaded: ${m.name} spectrum`);
                              }}
                              className="group/peak relative flex flex-col items-center focus:outline-none"
                              style={{ width: '12%' }}
                            >
                              {/* Peak height corresponding to abundance */}
                              <div 
                                className={`w-1.5 sm:w-2 rounded-t transition-all duration-300 ${isSelected ? 'bg-gradient-to-t from-teal-500 to-cyan-400 h-28 w-2 sm:w-2.5 shadow-lg shadow-teal-500/20' : 'bg-slate-700 hover:bg-slate-500 group-hover/peak:bg-teal-400/60'}`}
                                style={{ height: `${m.abundance * 1.2}px` }}
                              />
                              <span className={`text-[9px] font-mono mt-1 ${isSelected ? 'text-teal-400 font-bold' : 'text-slate-500'}`}>
                                {m.mass.split(' ')[0]}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* X-axis title */}
                      <div className="text-center text-[10px] text-slate-400 mt-2 font-mono tracking-wider">
                        Mass-to-Charge Ratio (m/z)
                      </div>
                    </div>

                    {/* Selected Metabolite Metadata Display */}
                    <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            {selectedMetabolite.category}
                          </span>
                          <h4 className="text-base font-black text-white mt-1.5">
                            {selectedMetabolite.name}
                          </h4>
                          <p className="text-[11px] text-teal-400 font-mono mt-0.5">
                            Formula: {selectedMetabolite.formula} | Mass: {selectedMetabolite.mass}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 leading-relaxed font-light bg-slate-950 p-2.5 rounded border border-slate-900">
                        <span className="font-semibold text-white">Geographic Source:</span> {selectedMetabolite.source} ({selectedMetabolite.region})
                        <p className="mt-1.5 text-slate-400 italic">
                          "{selectedMetabolite.significance}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                        <span>Database Reference Key</span>
                        <span className="font-mono text-teal-300">MA-{selectedMetabolite.id.toUpperCase()}</span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </section>
</section>

      {/* Pan-African Metabolomics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 items-start">
            <div className="md:col-span-1">
              <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Pan-African Metabolomics</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Building Africa’s Metabolomics Network Together
              </h2>
              <p className="text-base text-gray-700 mb-8">
                Metabolomics Africa is an early-stage collective aligning experts, students, and partners to grow metabolomics capacity, mentorship, and pilot projects that address health, agriculture, and climate priorities across the continent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="membership" className="">
                <button className="bg-purple-900 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-purple-800 transition">
                  Join us
                </button>
                </a>
                <a href="ourGoals" className="">
                <button className="border-2 border-purple-900 text-purple-900 px-6 py-3 rounded-full text-base font-medium hover:bg-purple-50 transition">
                  Our vision & mission
                </button></a>

              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">


                 <div className="relative rounded-2xl overflow-hidden row-span-2 bg-white shadow-lg">
             <img
            src="gallery/mt.jpeg"
            alt="Pilot samples analysis in lab"
            className="w-full h-full opacity-50 object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/60 to-transparent" />
          <div className="relative p-8 text-white flex flex-col justify-end h-full">
            <p className="uppercase tracking-wider text-sm mb-2 opacity-90">Latest Network Updates (What we aim to achieve)</p>
            <ul className="space-y-4 text-lg">
              <li>• African Country 1: Our first pilot samples arrived from community biobanks and are entering analysis.</li>
              <li>• African Country 2: Cohort 1 of the in-house certification training has successfully graduated.</li>
              <li>• African Country 3: Stakeholder meeting held to harmonize data sharing standards with policy bodies.</li>
            </ul>
            <p className="mt-6 text-sm uppercase tracking-wider opacity-80">Signal updated • Just now</p>
          </div>
        </div>
            
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <img src="gallery/onana1.jpg" alt="Training graduation" className="w-full h-40 object-cover rounded-xl mb-3" />
                <p className="text-base text-gray-800">Cohort graduation and certification in metabolomics training.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <img src="https://nationalmetabolomicsplatform.co.za/wp-content/uploads/2023/07/Pr_Analysis_BLOG_Sept2023_1693809530.jpg" alt="African metabolomics lab scientists" className="w-full h-40 object-cover rounded-xl mb-3" />
                <p className="text-base text-gray-800">Harmonizing data sharing standards across African countries.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <p className="text-3xl font-bold text-purple-900 mb-1">10+</p>
              <p className="text-lg text-gray-700">African countries</p>
              <p className="text-sm text-gray-600 mt-1">Engaged in our early-stage network</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <p className="text-3xl font-bold text-purple-900 mb-1">75+</p>
              <p className="text-lg text-gray-700">mentors</p>
              <p className="text-sm text-gray-600 mt-1">Metabolomics and AI specialists</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <p className="text-3xl font-bold text-purple-900 mb-1">3</p>
              <p className="text-lg text-gray-700">pilots</p>
              <p className="text-sm text-gray-600 mt-1">Focused research underway</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Metabolomics Matters */}
                  <section id="why-matters" className="py-20 border-b border-slate-900 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold tracking-widest text-white uppercase bg-purple-900 px-3 py-1.5 rounded-full border border-teal-800/20">The Scientific Engine</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
                    Why Metabolomics Matters to Africa
                  </h2>
                  <p className="text-black mt-4 text-base sm:text-lg">
                    While genes lay the blueprint of life, small molecules represents the ultimate direct signature of biology interacting with environment, diet, and disease.
                  </p>
                </div>

                {/* Sub-Tabs Selector */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  <button 
                    onClick={() => setActiveWhyTab('definition')}
                    className={`px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase font-bold transition-all border ${activeWhyTab === 'definition' ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'}`}
                  >
                    1. What is Metabolomics?
                  </button>
                  <button 
                    onClick={() => setActiveWhyTab('infrastructure')}
                    className={`px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase font-bold transition-all border ${activeWhyTab === 'infrastructure' ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'}`}
                  >
                    2. Why Africa Needs Platforms
                  </button>
                  <button 
                    onClick={() => setActiveWhyTab('datasets')}
                    className={`px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase font-bold transition-all border ${activeWhyTab === 'datasets' ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'}`}
                  >
                    3. The Power of African Datasets
                  </button>
                </div>

                {/* Tab content wrapper */}
                <div className="bg-black border border-slate-850 rounded-2xl p-6 sm:p-10">
                  {activeWhyTab === 'definition' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <div className="w-10 h-10 bg-teal-950 text-teal-400 border border-teal-800/40 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">The Real-Time Language of Biology</h3>
                        <p className="text-slate-300 leading-relaxed font-light">
                          Metabolomics is the comprehensive identification and quantification of all small-molecule chemical metabolites (amino acids, lipids, sugars, signals) within an organism.
                        </p>
                        <p className="text-slate-400 leading-relaxed text-sm">
                          Unlike the genome which tells you what <span className="text-emerald-400 font-semibold italic">could</span> happen, the metabolome tells you exactly what <span className="text-teal-400 font-semibold italic">is happening</span> right now in response to therapeutics, environmental stress, or nutrition.
                        </p>
                      </div>
                      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 space-y-4">
                        <h4 className="text-xs font-bold tracking-widest text-indigo-400 uppercase">The Biological Hierarchy</h4>
                        <div className="space-y-3 font-mono text-xs">
                          <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800/60 text-slate-400">
                            <span>GENOMICS (Potential)</span>
                            <span className="text-slate-500">Static Blueprint</span>
                          </div>
                          <div className="flex items-center justify-between p-1 bg-slate-900 rounded border border-slate-800/60 text-slate-400">
                            <span>TRANSCRIPTOMICS (Intent)</span>
                            <span className="text-slate-500"> Gene Activation</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800/60 text-slate-400">
                            <span>PROTEOMICS (Action)</span>
                            <span className="text-slate-500">Functional Vehicles</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-teal-950/30 rounded border border-teal-800/40 text-teal-300 font-bold">
                            <span>METABOLOMICS (Outcome)</span>
                            <span className="text-teal-400">Actual Phenotype</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeWhyTab === 'infrastructure' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <div className="w-10 h-10 bg-indigo-950 text-indigo-400 border border-indigo-800/40 rounded-lg flex items-center justify-center">
                          <Database className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">Consolidating Fragmented Capacity</h3>
                        <p className="text-slate-300 leading-relaxed font-light">
                          Africa has world-class scientists but historically lacked centralized, high-throughput metabolomics infrastructure. Individual institutions face massive instrument capital costs and sample bottlenecks.
                        </p>
                        <p className="text-slate-400 leading-relaxed text-sm">
                          By building a coordinated **scientific infrastructure platform**, we standardize specimen logistics, cross-validate mass spectrometry workflows, and provide open access to state-of-the-art computational pipelines.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-805">
                          <h4 className="text-xs font-bold text-teal-400">Instrument Hubs</h4>
                          <p className="text-slate-400 text-xs mt-2">Connecting mass spectrometry and NMR networks across Sub-Saharan hubs.</p>
                        </div>
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-805">
                          <h4 className="text-xs font-bold text-teal-400">QA/QC Standards</h4>
                          <p className="text-slate-400 text-xs mt-2">Harmonizing sample preparation and storage across multi-national biobanks.</p>
                        </div>
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-805">
                          <h4 className="text-xs font-bold text-teal-400">Cloud Computing</h4>
                          <p className="text-slate-400 text-xs mt-2">Deploying processing resources to analyze raw files without local supercomputing requirements.</p>
                        </div>
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-805">
                          <h4 className="text-xs font-bold text-teal-400">Sovereign Repositories</h4>
                          <p className="text-slate-400 text-xs mt-2">Securing direct ownership of chemical signatures of African genetic resources.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeWhyTab === 'datasets' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <div className="w-10 h-10 bg-emerald-950 text-emerald-400 border border-emerald-800/40 rounded-lg flex items-center justify-center">
                          <Sprout className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">Correcting the Global Disparity</h3>
                        <p className="text-slate-300 leading-relaxed font-light">
                          Less than 2% of non-European biological profiles reside in global reference databases. This data desert means clinical and agricultural diagnostic tools frequently fail when deployed in African populations.
                        </p>
                        <p className="text-slate-400 leading-relaxed text-sm">
                          Our focus on generating **African-led datasets** directly drives accuracy in local diagnostics, cataloguing medicinal chemical spaces, and preparing unique targets for automated, AI-driven drug discovery.
                        </p>
                      </div>
                      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Strategic Data Targets</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-white p-2 bg-slate-900 rounded">
                            <span>Traditional Phytotherapy Markers</span>
                            <span className="text-emerald-400 font-bold font-mono">3,400+ Mapped</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-white p-2 bg-slate-900 rounded">
                            <span>Clinical Cohorts (Metabolic Syndrome)</span>
                            <span className="text-teal-400 font-bold font-mono">1,800+ Profiles</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-white p-2 bg-slate-900 rounded">
                            <span>Climate-Resilient Crop Biosignatures</span>
                            <span className="text-cyan-400 font-bold font-mono">1,200+ Genotypes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </section>



            {/* Strategic Importance for Africa */}
            <section className="py-20 border-b border-slate-900 bg-black from-slate-950 to-indigo-950/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Text */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3 py-1.5 rounded-full border border-indigo-800/20">Continental Sovereignty</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      Strategic Importance for Africa
                    </h2>
                    <p className="text-slate-300 leading-relaxed font-light">
                      Africa represents the most biologically diverse landmass on Earth, with unique genomic diversity, rich medicinal flora, and urgent food-security needs. Yet, the continent remains a "data desert" in international biomedical repositories.
                    </p>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      Without native metabolomics systems, diagnostic platforms, personalized wellness treatments, and pesticide development remain geared entirely to non-African populations. Developing native datasets is an act of clinical, environmental, and economical sovereignty.
                    </p>

                    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start space-x-3">
                      <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">Sovereignty of Data Assets</h4>
                        <p className="text-xs text-slate-400 mt-1">Ensuring local researchers retain ownership, publishing, and translational intellectual property for materials collected inside African borders.</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Stat Cards */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="p-6 bg-slate-900/50 border border-slate-850 rounded-xl space-y-3 hover:border-teal-500/30 transition-all">
                      <div className="text-3xl font-black text-emerald-400">&lt; 2%</div>
                      <h4 className="text-sm font-bold text-white">Global Database Representation</h4>
                      <p className="text-xs text-slate-400">Our main priority is bridging this gap by uploading validated African biosignatures to international portals while protecting IP.</p>
                    </div>

                    <div className="p-6 bg-slate-900/50 border border-slate-850 rounded-xl space-y-3 hover:border-teal-500/30 transition-all">
                      <div className="text-3xl font-black text-teal-400">70%</div>
                      <h4 className="text-sm font-bold text-white">Healthcare Dependency</h4>
                      <p className="text-xs text-slate-400">Over two-thirds of primary care reliance is tied to plant-derived traditional formulas. Standardization is crucial.</p>
                    </div>

                    <div className="p-6 bg-slate-900/50 border border-slate-850 rounded-xl space-y-3 hover:border-teal-500/30 transition-all">
                      <div className="text-3xl font-black text-cyan-400">2x</div>
                      <h4 className="text-sm font-bold text-white">Chronic Disease Acceleration</h4>
                      <p className="text-xs text-slate-400">Cardiometabolic diseases are expanding quickly. Predictive diagnostics are crucial for high-risk cohorts.</p>
                    </div>

                    <div className="p-6 bg-slate-900/50 border border-slate-850 rounded-xl space-y-3 hover:border-teal-500/30 transition-all">
                      <div className="text-3xl font-black text-indigo-400">54-N</div>
                      <h4 className="text-sm font-bold text-white">Harmonized Network</h4>
                      <p className="text-xs text-slate-400">Unifying fragmented universities into one digital pipeline to optimize national scientific leverage.</p>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* Strategic Partnerships and Engagement */}

            <section className="py-20 border-b border-slate-900 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Side text */}
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-white uppercase bg-purple-900 px-3 py-1.5 rounded-full border border-emerald-850/25">Ecosystem Operations</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      Strategic Partnerships & Engagements
                    </h2>
                    <p className="text-black leading-relaxed font-light">
                      To build credible continental infrastructure, we actively collaborate with academic entities, government institutions, clinical trial groups, and international diagnostic partners.
                    </p>
                    <p className="text-black leading-relaxed text-xs">
                      These partnerships drive harmonized ethical baselines, specimen logistic pipelines, and cloud computational resource sharing.
                    </p>
                    
                    <button 
                      onClick={() => showToast('Inquire sent! Our coordination cell will reach out within 48 hours.')}
                      className="bg-whitehover:bg-indigo-900/50 text-black border border-indigo-500/30 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Propose Collaborations
                    </button>
                  </div>

                  {/* Right Side visual logo categorization */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Universities & Research Centres */}
                    <div className="bg-black p-5 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                        Universities & Research Centres
                      </h4>

                    </div>

                    {/* Government & Policy Engagement */}
                    <div className="bg-black p-5 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                        Government & Policy Engagements
                      </h4>

                    </div>

                    {/* Research Institutions */}
                    <div className="bg-black p-5 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                        Research Institutions
                      </h4>

                    </div>

                    {/* Clinical Collaborators & Biobanks */}
                    <div className="bg-black p-5 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                        Clinical Biobanks & Industry Partners
                      </h4>

                    </div>

                  </div>

                </div>

              </div>
            </section>

      {/* Training Architecture */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Training architecture</p>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Empowering Africa’s Next Generation</h2>
          <p className="text-base text-gray-700 mb-10">From school clubs to global scientists.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "IMMERSIVE", title: "STEMxAfrica Digital Platform", desc: "AI-powered learning and gamified challenges transforming African students into future leaders in metabolomics, biotech, and data science." },
              { tag: "APPLIED", title: "School STEM Clubs", desc: "Igniting passion for technology in young learners through robotics and coding clubs." },
              { tag: "POLICY", title: "University & Professional Pathways", desc: "Advanced training, mentorship, and global opportunities for emerging African engineers and scientists." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-900 rounded-2xl p-6 text-white">
                <p className="text-purple-400 font-semibold text-xs uppercase mb-2">{item.tag}</p>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Community Pathways */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Community pathways</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ways to plug into the Metabolomics Africa network
          </h2>
          <p className="text-base text-gray-700 mb-10 max-w-3xl">
            Whether you mentor, convene, or contribute data, every action strengthens our ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audiencePaths.map((path) => (
              <div key={path.title} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{path.title}</h3>
                <p className="text-base text-gray-700 mb-6">{path.paragraph}</p>
                <a href={path.url} className="text-purple-900 font-medium text-sm hover:underline flex items-center gap-1">
                  {path.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundational Pillars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">THE INFRASTRUCTURE MAP</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Structural Pillars: Solving Africa’s Grand Challenges
            </h2>
            <p className="text-base text-gray-700 max-w-3xl">
              {/* These are the long-term arenas where metabolomics, paired with African governance and mentorship, shifts systems for millions of people. */}
            Metabolomics Africa maps capabilities, structures datasets, and organizes collaborations through five core administrative blocks.
            </p>
          </div>

          <div className="space-y-20">
            {[
              { title: "African Metabolome Project (AMP)", desc: "Building standard reference datasets for the flora, foodstuffs, microclimates, and metabolic clinical baselines unique to the African continent", img: "gallery/lab.jpg" , icon: Database, focusAreas: ["Plants", "Indigenous Crops", "Reference Profiles"]},
              { title: "Precision Health & AI", desc: " Leveraging automated AI classifiers to map complex multi-omics pathways, accelerate diagnostic screening, and run predictive risk models.", img: "gallery/fc.jpg", icon:Cpu, focusAreas: ["Longitudinal Datasets ", "Diagnostics", "AI Classifiers"], },
              { title: "Phytotherapy & African Plants", desc: "Applying high-resolution chemical fingerprinting to historically validated medicinal plants and leafy traditional vegetables to standardize utility.", img: "cd.png", icon: Sprout, focusAreas: ["Chemical Marker Mapping", "Standardization"] },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:grid-flow-col-dense md:[&>div:nth-child(1)]:order-2' : ''}`}>
                  <div>
                     <div className="w-12 h-12 bg-emerald-950 text-emerald-400 border border-emerald-800/40 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all">
                          {Icon ? <Icon className="w-6 h-6" /> : null}
                     </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                    <p className="text-base text-gray-700">{pillar.desc}</p>

                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] text-slate-400 font-semibold block">Key Focus Areas:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.focusAreas.map((area, j) => (
                            <span key={j} className="text-[9px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded font-mono">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                  </div>
                  <img src={pillar.img} alt={pillar.title} className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Field Notes & Convenings</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Observatory Moments</h2>
          <p className="text-base text-gray-700 mb-10 max-w-3xl">
            Every gathering or studio hour unlocks new collaborators and pathways. Here is where we are convening next.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <p className="text-purple-900 font-semibold uppercase tracking-wider text-sm">11–13 March 2026</p>
                <a href="https://www.metabolomics-sa.co.za/metabolomics-africa-2026" className="">
                <button className="mt-4 md:mt-0 border-2 border-purple-900 text-purple-900 px-6 py-3 rounded-full text-base font-medium hover:bg-purple-50 transition">
                  Visit Conference Site
                </button>
                </a>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1st African Metabolomics Conference 2026</h3>
              <p className="text-base text-gray-700">
                Metabolomics South Africa (MSA) hosts the continental summit featuring translational demos, policy convenings, and Africa-first metabolomics standards.
              </p>
            </div> */}

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <p className="text-purple-900 font-semibold uppercase tracking-wider text-sm">Monthly • Virtual</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdKT5Iq8Ucxgojp9f23bQckR7Q6TgI0UmkSD2_kzWVeyxcuAg/viewform" className="">
                <button className="mt-4 md:mt-0 border-2 border-amber-600 text-amber-700 px-6 py-3 rounded-full text-base font-medium hover:bg-amber-50 transition opacity-80">
Register Here               
 </button>
                </a>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Metabolomics Africa Studio Hours</h3>
              <p className="text-base text-gray-700">
                Open community session for Q&A, live consulting for farmers, healthcare workers, producers, and biotech partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Charter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl shadow-xl p-10 md:p-16 text-center text-white">
            <p className="uppercase tracking-widest text-xs opacity-90 mb-4">Mission in Construction</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              A collaborative charter for metabolomics across Africa
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto mb-10 opacity-90">
              We are codifying our continental charter and open governance model with partners right now. Expect a public release soon, and in the meantime, reach out if you want to co-author it with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="membership" className="">
              <button className="bg-white text-purple-900 px-8 py-3 rounded-full text-base font-medium hover:bg-gray-100 transition shadow-md">
                Explore membership tiers
              </button>
              </a>
              <a href="mailto:metabolomicsafrica@gmail.com" className="">
              <button className="border-2 border-white text-white px-8 py-3 rounded-full text-base font-medium hover:bg-white/10 transition">
                Email the coordination cell
              </button></a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}