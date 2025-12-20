// src/app/gallery/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export default function GalleryPage() {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const mediaFiles = [
    "IMG_5236.JPEG",
    "IMG_5238.JPEG",
    "Image 5.jpg",
    "p2.jpg",
    "p3.jpg",
    "onana3.jpg",
    "Image 11.jpeg",
    "p1.jpg",
    "p6.jpeg",
    "onana4.jpeg",
    "Image 12.jpeg",
    "onana5.jpeg",
    "p7.jpeg",
    "Image 6.jpeg",
    "Image 10.jpeg",
    "onana1.jpg",
    "p4.jpg",
    "onana2.jpg",
    "Image 3.jpeg",
    "onana6.jpeg",
    "Image 4.jpeg",
    "p5.jpg",
    "Image 16.mp4",
    "IMG_5232.mp4",
    "Image 7.jpg",
    "Image 8.jpg",
    "Image 9.jpg",
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
    <section className="py-16 mt-15 md:py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-sm mb-4">Gallery</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Moments from Metabolomics & STEMxAfrica
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
            Workshops, club launches, mentorship sessions, and community impact across Africa.
          </p>
        </div>

        {/* Grid */}
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
      </div>
    </section>
  );
}