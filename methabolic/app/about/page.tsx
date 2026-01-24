// src/app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* About Us Hero Section */}
      <section className="py-16 mt-10 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16">
            <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-4">
              About Us
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              About Metabolomics Africa
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-8 max-w-4xl">
              Metabolomics Africa is home to metabolomics experts of African origin who mentor young scientists while advancing metabolomics capacity, infrastructure, and policy across the continent.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-10 max-w-4xl">
              We are a Pan-African nonprofit mobilizing labs, ministries, and industry partners to build metabolomics-powered solutions for health, agriculture, and environmental resilience. Everything we do is fueled by African data, governed by African experts, and shared through open mentorship.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="membership"
                className="bg-purple-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-purple-800 transition inline-block text-center"
              >
                Become a member
              </Link>
              <Link
                href="https://docs.google.com/document/d/1k3zbkqaeDF3PWvm3lA0V5WAZORFDf8LZzhj10Z75yQ0/edit?tab=t.0" // You can create a separate page or section later
                className="text-purple-900 px-8 py-4 rounded-full text-base font-medium hover:bg-purple-50 border-2 border-purple-900 transition inline-block text-center"
              >
                Explore STEMxAfrica →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus - Three Columns */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-4">
            Our Focus
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Capacity & Mentorship */}
            <div className="bg-white rounded-3xl shadow-lg p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Capacity & Mentorship
              </h3>
              <p className="text-base text-gray-700">
                Fellows shadow experts, access instrumentation, and gain governance skills to run metabolomics platforms responsibly.
              </p>
            </div>

            {/* Continental Collaboration */}
            <div className="bg-white rounded-3xl shadow-lg p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Continental Collaboration
              </h3>
              <p className="text-base text-gray-700">
                We encourage collaboration across the continent, ensuring an ecosystem where all stakeholders in metabolomics are able to compare notes.
              </p>
            </div>

            {/* Applied Impact */}
            <div className="bg-white rounded-3xl shadow-lg p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Applied Impact
              </h3>
              <p className="text-base text-gray-700">
                Our pilots target African priorities: food security, antimicrobial resistance, climate resilience, and equitable public health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship DNA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16">
            <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-4">
              Mentorship DNA
            </p>

            <div className="space-y-8 max-w-4xl">
              <p className="text-base md:text-lg text-gray-700">
                Experts of African origin provide 1:1 mentorship circles and rapid design reviews.
              </p>
              <p className="text-base md:text-lg text-gray-700">
                Students generate and submit ideas, data, or documentation, so mentors can review and provide valuable feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center">
            {/* Large Header */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              STEM<span className="text-red-600">x</span>AFRICA
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-8 italic">
              Building Africa’s future, one student at a time
            </p>

            {/* Tagline & Description */}
            <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-4">
              STEMxAfrica
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              STEMxAfrica
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
              The volunteer and youth wing amplifying metabolomics literacy for every African learner.
            </p>
            <p className="text-base text-gray-700 mb-10 max-w-4xl mx-auto">
              STEMxAfrica welcomes non-experts, storytellers, designers, and operational partners who want to translate metabolomics breakthroughs into classrooms, maker spaces, farms, and clinics.
            </p>

            <ul className="space-y-5 text-base text-gray-700 mb-12 max-w-3xl mx-auto text-left">
              <li className="flex items-start gap-3">
                <span className="text-purple-900 mt-1">•</span>
                <span>Community labs that remix metabolomics experiments for schools and citizen science projects.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-900 mt-1">•</span>
                <span>Mentorship rosters pairing experts with volunteers who host STEM festivals across Africa.</span>
              </li>
            </ul>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="https://docs.google.com/document/d/1k3zbkqaeDF3PWvm3lA0V5WAZORFDf8LZzhj10Z75yQ0/edit?tab=t.0"
                className="bg-purple-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-purple-800 transition"
              >
                Learn more
              </Link>
              <Link
                href="membership"
                className="text-purple-900 px-8 py-4 rounded-full text-base font-medium hover:bg-purple-50 border-2 border-purple-900 transition"
              >
                Join STEMxAfrica →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dives / Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16">
            <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-8">
              Deep Dives • Overview
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-12">
                {/* Our Goals */}
                <div>
                  <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Our Goals</p>
                  <p className="text-base text-gray-700">
                    We believe Africa’s future in science, health, agriculture, and technology depends on the investments we make now. By 2030, metabolomics should be accessible, celebrated, and aligned with the realities of the AI era across the continent.
                  </p>
                </div>

                {/* Events */}
                <div>
                  <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Events</p>
                  <p className="text-base text-gray-700">
                    STEMxAfrica activations roll across the continent with club launches, workshops, and hands-on sessions that welcome millions of learners into metabolomics.
                  </p>
                </div>

                {/* Blog */}
                <div>
                  <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Blog</p>
                  <p className="text-base text-gray-700">
                    Coming soon. Expect field notes from experts and volunteers, plus newsletters featuring project breakdowns and funding calls.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-12">
                {/* Our Projects */}
                <div>
                  <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Our Projects</p>
                  <p className="text-base text-gray-700">
                    STEMxAfrica is turning vision into action through initiatives that combine education, research infrastructure, and global collaboration. These initiatives inspire the next generation of African scientists and position Africa as a leader in metabolomics.
                  </p>
                </div>

                {/* Gallery */}
                <div>
                  <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Gallery</p>
                  <p className="text-base text-gray-700">
                    STEMxAfrica visuals across goals, activations, and learner stories pulled from Firebase Storage.
                  </p>
                </div>

                {/* Join Us */}
                <div>
                  <p className="text-purple-900 font-bold uppercase tracking-wider text-xs mb-3">Join Us</p>
                  <p className="text-base text-gray-700">
                    Upload your profile, share your focus areas, and tell us how you want to contribute. Experts mentor; volunteers deploy STEMx programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}