
"use client";

import Image from "next/image";
import {  Sprout, Globe, Compass,} from "lucide-react";



export default function EventPage() {


  return (
    <>
    
         <div className="border-b border-slate-900 pb-10 mb-12 bg-black px-5 md:px-24 py-36 mt-10 md:py-24">
              <span className="text-xs font-bold tracking-widest text-teal-400 uppercase bg-teal-950/50 px-3 py-1.5 rounded-full border border-teal-800/20">The Flagship Project</span>
              <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
                African Metabolome Project (AMP)
              </h1>
              <p className="text-lg text-slate-300 mt-3 font-light leading-relaxed max-w-4xl">
                AMP is our centralized, continental initiative tasked with capturing, cataloguing, and analyzing biochemical signatures unique to African populations, food crop varieties, and endemic flora.
              </p>
   
        </div>

                    {/* Core Strategy Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 px-5 md:px-24 py-16 mt-[-50] md:py-24 bg-slate-400/20">
              
              <div className="bg-black p-6 rounded-2xl border border-slate-850 space-y-4">
                <div className="w-10 h-10 bg-teal-950 text-white border border-teal-850 rounded-lg flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">What AMP Is</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  A high-throughput biological data pipeline mapping mass-to-charge chemical indexes from local biobanks. This creates a standard continental repository, preventing biopiracy and securing intellectual property.
                </p>
              </div>

              <div className="bg-black p-6 rounded-2xl border border-slate-850 space-y-4">
                <div className="w-10 h-10 bg-emerald-950 text-white border border-emerald-850 rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Why Plants & Crops First?</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  With 70% primary reliance on plant traditional medicine and severe climate threat to staple food chains, mapping botanical chemotypes is a highly structured, actionable starting pilot project.
                </p>
              </div>

              <div className="bg-black p-6 rounded-2xl border border-slate-850 space-y-4">
                <div className="w-10 h-10 bg-indigo-950 text-white border border-indigo-850 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Long-Term Vision</h3>
                <p className="text-white text-xs sm:text-sm leading-relaxed">
                  Transitioning raw chemical libraries directly to automated machine learning model servers. AMP aims to enable precise personalized medicine for African genomic profiles.
                </p>
              </div>

            </div>
    </>
  )


}