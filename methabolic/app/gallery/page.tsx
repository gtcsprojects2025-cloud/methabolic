// src/app/gallery/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export default function GalleryPage() {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  // Your media files (case-sensitive – match exact filenames in public/gallery/)
  const mediaFiles = [
    "Image 2.JPEG",
    "IMG_5236.JPEG",
    "IMG_5238.JPEG",
    "Image 5.jpg",
     "onana3.jpg",
    "Image 11.jpeg",
    "IMG_5234.JPEG",
    "IMG_5235.JPEG",
    "onana4.jpeg",
    "Image 12.jpeg",
     "onana5.jpeg",
    "Image 6.jpeg",
    "Image 10.jpeg",
    "IMG_5232.mp4",
    "onana1.jpg",
    "onana2.jpg",
  "Image 13.jpeg",
    "Image 14.jpeg",
    "Image 3.jpeg",
     "onana6.jpeg",
    "Image 4.jpeg",
    "Image 16.mp4",
  ];

  // Random sizes for collage effect (you can tweak ratios)
  const getRandomSpan = () => {
    const spans = ["col-span-1 row-span-1", "col-span-2 row-span-1", "col-span-1 row-span-2", "col-span-2 row-span-2"];
    return spans[Math.floor(Math.random() * spans.length)];
  };

  return (
    <section className="py-16 mt-10 md:py-24 bg-white mt-10 min-h-screen">
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

        {/* Collage Grid – Irregular sizes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {mediaFiles.map((file, index) => {
            const isVideo = file.toLowerCase().endsWith(".mp4") || file.toLowerCase().endsWith(".webm") || file.toLowerCase().endsWith(".mov");
            const spanClass = getRandomSpan(); // Random size variation

            return (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${spanClass}`}
                onClick={() => setSelectedMedia(`/gallery/${file}`)}
              >
                {isVideo ? (
                  <video className="w-full h-full object-cover">
                    <source src={`/gallery/${file}`} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={`/gallery/${file}`}
                    alt={`Gallery moment ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                )}

                {/* Play icon overlay for videos */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white/80 rounded-full p-4">
                      <svg className="w-12 h-12 text-purple-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Full-Screen Lightbox Modal */}
        {selectedMedia && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-8 right-8 text-white hover:text-gray-300 transition"
              onClick={() => setSelectedMedia(null)}
            >
              <X size={40} />
            </button>

            <div className="relative max-w-5xl max-h-full">
              {selectedMedia.endsWith(".mp4") || selectedMedia.endsWith(".webm") || selectedMedia.endsWith(".mov") ? (
                <video controls autoPlay className="w-full h-auto max-h-[90vh] rounded-2xl">
                  <source src={selectedMedia} type="video/mp4" />
                  Your browser does not support video.
                </video>
              ) : (
                <Image
                  src={selectedMedia}
                  alt="Full screen preview"
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}