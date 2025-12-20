


"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import Footer from "./components/Footer";
export default function Home() {
  const [videoPlaying, setVideoPlaying] = useState(true);

  const audiencePaths = [
    { title: "Mentorship Network", paragraph: "Connect, mentor, and collaborate with emerging scientists across the continent. The mentor intake form will be published here shortly.", link: "Sign up to mentor →", url:"https://docs.google.com/forms/d/e/1FAIpQLSfR8oq7QDOVCFYGGy8nqICnck3SnYbmHonepuPhuOtxhnuuTg/viewform" },
    { title: "Network Engagement", paragraph: "All roads lead to the 1st African Metabolomics Conference 2026, the flagship gathering hosted by Metabolomics South Africa (MSA). Dive into conference programming.", link: "Explore the 1st African Metabolomics Conference 2026 →", url:"https://www.metabolomics-sa.co.za/metabolomics-africa-2026" },
    { title: "Data Contribution", paragraph: "Help build the Pan-African knowledge graph by securely contributing metabolomics datasets.", link: "Contact us to learn more →", url:"mailto:metabolomicsafrica@gmail.com" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section with Video Background */}
     <section className="relative h-screen flex items-end justify-start overflow-hidden">
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
  <div className="relative z-10 px-6 pb-12 max-w-4xl">
    <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4 leading-tight">
        African biodiversity in motion
      </h1>
      <p className="text-base md:text-lg text-gray-800 mb-8 max-w-2xl">
        Metabolomics Africa exists to power the interrogation of living biosignatures so communities can protect food systems, health, and climate futures.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/ourGoals">
          <button className="border-2 border-purple-900 text-purple-900 px-6 py-3 rounded-full text-base font-medium hover:bg-purple-50 transition">
            View our mission
          </button>
        </a>
        <a href="https://www.metabolomics-sa.co.za/metabolomics-africa-2026" target="_blank" rel="noopener noreferrer">
          <button className="bg-purple-900 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-purple-800 transition">
            Attend the 1st Metabolomics Africa Conference in 2026
          </button>
        </a>
      </div>
    </div>
  </div>
</section>

      {/* Pan-African Metabolomics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 items-start">
            <div className="md:col-span-1">
              <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Pan-African Metabolomics</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Building Africa’s metabolomics network together
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

      {/* Training Architecture */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Training architecture</p>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Empowering Africa’s next generation</h2>
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
      </section>

      {/* Community Pathways */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Community pathways</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ways to plug into the Metabolomics Africa network
          </h2>
          <p className="text-base text-gray-700 mb-10 max-w-3xl">
            Whether you mentor, convene, or contribute data, every action strengthens this early-stage ecosystem.
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
            <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Foundational Pillars</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our foundational pillars: Solving Africa’s grand challenges
            </h2>
            <p className="text-base text-gray-700 max-w-3xl">
              These are the long-term arenas where metabolomics, paired with African governance and mentorship, shifts systems for millions of people.
            </p>
          </div>

          <div className="space-y-20">
            {[
              { title: "Coordinated capacity", desc: "From mobile field labs to continental mentorship guilds, we connect African scientists with instrumentation, QA/QC, and governance practices to keep metabolomics programs community-owned.", img: "gallery/lab.jpg" },
              { title: "Food and climate resilience", desc: "Soils, crops, and marine ecosystems across Africa demand metabolomics baselines so farmers and fisheries can respond to drought, pests, and climate shocks with evidence, not guesswork.", img: "gallery/fc.jpg" },
              { title: "Community diagnostics", desc: "We prototype translational metabolomics workflows that unlock accessible diagnostics, antimicrobial resistance surveillance, and public-health-ready data for ministries and clinics.", img: "cd.png" },
            ].map((pillar, i) => (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:grid-flow-col-dense md:[&>div:nth-child(1)]:order-2' : ''}`}>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                  <p className="text-base text-gray-700">{pillar.desc}</p>
                </div>
                <img src={pillar.img} alt={pillar.title} className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Field Notes & Convenings</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming observatory moments</h2>
          <p className="text-base text-gray-700 mb-10 max-w-3xl">
            Every gathering or studio hour unlocks new collaborators and pathways. Here is where we are convening next.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
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
            </div>

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