// src/app/goals/page.tsx  (or /stemxafrica/goals if nested)
import Link from "next/link";
import Image from "next/image";

export default function GoalsPage() {
  return (
    <>
      {/* Hero / Goals Introduction */}
      <section className="py-16 md:py-24 mt-10">
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
              Our Goals
            </h2>
            <p className="text-base md:text-md text-gray-700 mb-10">
              We believe Africa’s future in science, health, agriculture, and technology depends on the investments we make now. By 2030, metabolomics should be accessible, celebrated, and aligned with the realities of the AI era across the continent.
            </p>

            {/* Highlight Box */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-3xl p-4 ">
              <p className="text-base md:text-md text-gray-800">
                These goals are a blueprint for transforming Africa’s role in science — inspiring millions, building labs, training scientists, and forging collaborations so Africa becomes a generator of globally recognized discoveries.
              </p>
            </div>
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
                  src="/Image 2.JPEG" // Replace with your actual file names in public/goals/
                  alt="Center of Excellence building"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Launch 10 centers of excellence
                </h3>
                <p className="text-base text-gray-700">
                  Stand up 10 fully equipped metabolomics centers across Africa by 2035, housing LC-MS and NMR instruments to support research, training, and collaborations rooted in African realities.
                </p>
              </div>
            </div>

            {/* Goal 2 */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/Image 3.jpeg"
                  alt="Students reaching 10 million"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Reach 10,000,000+ students
                </h3>
                <p className="text-base text-gray-700">
                  Introduce metabolomics to over 10 million students by 2030 through Omics Clubs, STEM campaigns, AI-enabled edtech, teacher training, and partnerships so every learner gains early exposure.
                </p>
              </div>
            </div>

            {/* Goal 3 */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/Image 4.jpeg"
                  alt="Establishing Omics Clubs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Establish 1,000+ Omics Clubs
                </h3>
                <p className="text-base text-gray-700">
                  Launch at least 1,000 functional Omics Clubs with learning kits, teacher training, and competitions as grassroots platforms for -omics education across African secondary schools.
                </p>
              </div>
            </div>

            {/* Goal 4 */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/Image 5.jpg"
                  alt="Training African scientists"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Train 1,000+ African scientists
                </h3>
                <p className="text-base text-gray-700">
                  Run workshops, fellowships, and online programs that prepare 1,000 African scientists in metabolomics and data science, creating a skilled talent pool to lead breakthroughs.
                </p>
              </div>
            </div>

            {/* Goal 5 */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden md:col-span-2 md:col-span-1">
              <div className="relative h-64">
                <Image
                  src="/Image 6.jpeg"
                  alt="Global partnerships"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Forge 100+ global partnerships
                </h3>
                <p className="text-base text-gray-700">
                  Secure 100+ active partnerships with universities, labs, industry leaders, and funders to advance training, research, and access to metabolomics infrastructure for Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white  shadow-xl p-10 md:p-16">
        <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16">
         <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-4">
              STEMxAfrica
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
Our Projects            </h2>
            <p className="text-base md:text-md text-gray-700 mb-10">
STEMxAfrica is turning vision into action through initiatives that combine education, research infrastructure, and global collaboration. These initiatives inspire the next generation of African scientists and position Africa as a leader in metabolomics.            </p>
    </div> </div>
     </section>

<section className="py-16 bg-white">
    <div className=" justify-between max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
    <div className=" ">
        <p className="text-purple-900 font-bold">Activation model</p>
        <h1 className="text-2xl font-bold">STEMxAfrica Initiative</h1>
        <p>A continent-wide pipeline that ignites interest in metabolomics and AI among young Africans via outreach campaigns, webinars, and on-site activations that build scientific literacy.</p>
        <a href="https://docs.google.com/document/d/1k3zbkqaeDF3PWvm3lA0V5WAZORFDf8LZzhj10Z75yQ0/edit?tab=t.0" className="inline-block mt-6  text-purple-900 font-medium rounded-full transition">Read more ↗</a>
       
    </div>
    <div className=" ">
        <p className="text-purple-900 font-bold">Clubs & continuity</p>
        <h1 className="text-2xl font-bold">STEMxClubs</h1>
<p>In-school clubs that sustain engagement after activations, guided by trained facilitators, flexible curricula, and real-world problem solving tied to health, climate, and food systems.</p>
      <a href="https://docs.google.com/document/d/1k3zbkqaeDF3PWvm3lA0V5WAZORFDf8LZzhj10Z75yQ0/edit?tab=t.0" className="inline-block mt-6  text-purple-900 font-medium rounded-full transition">Read more ↗</a>
       
    </div></div>
</section>



    </>
  );
}