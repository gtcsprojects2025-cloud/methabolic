// src/app/goals/page.tsx  (or /stemxafrica/goals if nested)
"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export default function Projectpage() {
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
    
      const mediaFiles = [
        "IMG_5236.JPEG",
        "IMG_5238.JPEG",
        "onana3.jpg",
        "Image 11.jpeg",
        "p1.jpg",
        "Image 12.jpeg",
        "Image 6.jpeg",
        "Image 10.jpeg",
        "onana1.jpg",
        "onana2.jpg",
        "Image 3.jpeg",
        "Image 4.jpeg",
        "Image 16.mp4",
        "IMG_5232.mp4",
        "vi.mp4",
    "imagevid.mp4",
    "vid2.mp4",
    "vid3.mp4",
        "vid4.mp4",
    "vid5.mp4",
    "vid6.mp4",

      ];
    
      const spanPatterns = [
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-2",
        "col-span-1 row-span-1",
        "col-span-2 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-2",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-2 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-2",
        "col-span-1 row-span-1",
      ];
  return (
    <>
       <section className="bg-white  shadow-xl  ">
       
             <div className="text-center mt-35 mb-5 pb-10">
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-15">
              STEM<span className="text-red-600">x</span>AFRICA
            </h1>
            <p className="text-base md:text-md text-gray-700 mb-5 italic">
              Building Africa’s future, one student at a time
            </p>
              <p className="text-base max-w-6xl mx-auto md:text-md px-6 text-gray-700 ">
STEMxAfrica is turning vision into action through initiatives that combine education, research infrastructure, and global collaboration. These initiatives inspire the next generation of African scientists and position Africa as a leader in metabolomics.            </p>

            </div>

        
     </section>

<section className="py-16 bg-white">
    <div className=" justify-between max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
    <div className=" ">
        <p className="text-purple-900 font-bold">Activation model</p>
        <h1 className="text-2xl font-bold text-black">STEMxAfrica Initiative</h1>
        <p className="text-black">A continent-wide pipeline that ignites interest in metabolomics and AI among young Africans via outreach campaigns, webinars, and on-site activations that build scientific literacy.</p>
        <a href="https://docs.google.com/document/d/1k3zbkqaeDF3PWvm3lA0V5WAZORFDf8LZzhj10Z75yQ0/edit?tab=t.0" className="inline-block mt-6  text-purple-900 font-medium rounded-full transition">Read more ↗</a>
       
    </div>
    <div className=" ">
        <p className="text-purple-900 font-bold">Clubs & continuity</p>
        <h1 className="text-2xl font-bold text-black">STEMxClubs</h1>
<p className="text-black">In-school clubs that sustain engagement after activations, guided by trained facilitators, flexible curricula, and real-world problem solving tied to health, climate, and food systems.</p>
      <a href="https://docs.google.com/document/d/1k3zbkqaeDF3PWvm3lA0V5WAZORFDf8LZzhj10Z75yQ0/edit?tab=t.0" className="inline-block mt-6  text-purple-900 font-medium rounded-full transition">Read more ↗</a>
       
    </div></div>
    {/* meet the teams button  */}
    <div className="text-center mt-10">
         <a href="https://stemx-launchpad.web.app">
          <button className="border-2 border-purple-900 hover:bg-purple-600  text-purple-900 px-6 py-3 rounded-full text-base font-medium hover:text-white transition">
            Meet The Team
          </button>
        </a>
    </div>

</section>
{/* gallery section  */}
<section className="py-16 bg-white max-w-7xl mx-auto px-6">
    
        <div className="text-center mb-12">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-sm mb-4">Gallery</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Moments from STEMxAfrica
          </h1>
        </div>
 <div className="grid grid-cols-3 md:grid-cols-6 gap-3 auto-rows-[140px] md:auto-rows-[160px]">
          {mediaFiles.map((file, index) => {
            const isVideo = /\.(mp4|webm|mov)$/i.test(file);
            const spanClass = spanPatterns[index % spanPatterns.length] || "col-span-1 row-span-1";

            return (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${spanClass}`}
                onClick={() => setSelectedMedia(`/gallery/${file}`)}
              >
                {isVideo ? (
                  <>
                    {/* Video thumbnail with poster fallback and preload */}
                    <video
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"  // Loads first frame quickly
                      loop={false}
                    >
                      <source src={`/gallery/${file}#t=0.5`} type="video/mp4" />
                      {/* Fallback image if video fails to load any frame */}
                      Your browser does not support video.
                    </video>

                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition pointer-events-none">
                      <div className="bg-white/90 rounded-full p-3">
                        <svg className="w-8 h-8 text-purple-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={`/gallery/${file}`}
                    alt={`Gallery moment ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedMedia && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-8 right-8 text-white hover:text-gray-300 transition z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
              aria-label="Close"
            >
              <X size={40} />
            </button>

            <div className="relative max-w-5xl max-h-full">
              {selectedMedia.match(/\.(mp4|webm|mov)$/i) ? (
                <video
                  controls
                  autoPlay
                  loop
                  muted={false}  // Allow sound in lightbox
                  className="w-full h-auto max-h-[90vh] rounded-2xl shadow-2xl"
                  preload="auto"
                >
                  <source src={selectedMedia} type="video/mp4" />
                  Your browser does not support video.
                </video>
              ) : (
                <Image
                  src={selectedMedia}
                  alt="Full view"
                  width={1400}
                  height={1000}
                  className="max-h-[90vh] w-auto mx-auto rounded-2xl shadow-2xl object-contain"
                />
              )}
            </div>
          </div>
        )}



</section>
    </>
  )
}