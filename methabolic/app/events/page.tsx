// src/app/goals/page.tsx  (or /stemxafrica/goals if nested)
import Link from "next/link";
import Image from "next/image";

export default function EventPage() {
  return (
    <>
      {/* Hero / Goals Introduction */}
      <section className="py-16 mt-10 md:py-24 bg-white ">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mt-10 mb-5">
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              STEM<span className="text-red-600">x</span>AFRICA
            </h1>
            <p className="text-base md:text-md text-gray-700 mb-5 italic">
              Building Africa’s future, one student at a time
            </p>
            </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 ">
            {/* Large Header */}
           

            {/* Goals Title & Description */}
            <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-4">
              STEMxAfrica
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
Events
            </h2>
            <p className="text-base md:text-md text-gray-700 mb-10">
STEMxAfrica activations roll across the continent with club launches, workshops, and hands-on sessions that welcome millions of learners into metabolomics.

            </p>

          
          </div>
        </div>
      </section>

      {/* Goals Grid with Images */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Goal 1 */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/Image 7.jpg" // Replace with your actual file names in public/goals/
                  alt="Center of Excellence building"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
Maiden Nigeria activation                </h3>
                <p className="text-base text-gray-700">
Held September 26, 2025 across multiple Nigerian states with STEMxClubs launched by Dr. Olanrewaju Smart, SSA to the President of Nigeria on Intergovernmental Affairs. This is part of a 5-year plan to reach 10M students in all 54 countries.                </p>
              </div>
            </div>

            {/* Goal 2 */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/Image 8.jpg"
                  alt="Students reaching 10 million"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
Ghana activation                </h3>
                <p className="text-base text-gray-700">
Held November 28, 2025 across Greater Accra, Ashanti, and Central Regions, featuring metabolomics experts from the USA and Canada and the launch of STEMxClubs in Ghana.                </p>
              </div>
            </div>

            {/* Goal 3 */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/Image 9.jpg"
                  alt="Establishing Omics Clubs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
Tanzania activation                </h3>
                <p className="text-base text-gray-700">
Scheduled for January 30, 2026 in Tanzania, continuing the movement to spark STEM curiosity and expand STEMxClubs across the continent.                </p>
              </div>
            </div>

            
          </div>
        </div>
      </section>
      </>
    );
}
