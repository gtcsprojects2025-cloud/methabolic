import Link from 'next/link';

export default function CollaborationArticle() {
  return (
    <article className="max-w-4xl mx-auto px-6 pt-32 py-16 text-slate-800 antialiased">
      {/* Article Header */}
      <header className="mb-12 text-center">
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          Collaboration Is Key: Partnering Across the Continent and Beyond
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </header>

      {/* Intro Section */}
      <section className="prose prose-lg max-w-none mb-12">
        <p className="text-xl leading-relaxed text-slate-600 mb-6">
          Science thrives on collaboration. The greatest discoveries—from decoding DNA to mapping the human microbiome—were made possible not by isolated minds but by networks of shared knowledge, tools, and vision.
        </p>
        <p>
          For Africa, collaboration is not a luxury; it is the lifeline for progress. Across the continent, omics research is growing, from metabolomics and genomics to phenomics and more. At <Link href="https://www.metabolomicsafrica.org" className="text-blue-600 hover:underline font-medium">Metabolomics Africa</Link>, we believe the next chapter of Africa’s scientific journey will be written not in silos, but in partnership.
        </p>
      </section>

      {/* Why Collaboration Matters */}
      <section className="mb-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Collaboration Matters in Omics Research</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="text-blue-600 font-bold text-xl">01</div>
            <p><strong>Share Resources:</strong> Lower costs by sharing laboratories, databases, and expensive analytical instruments.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-blue-600 font-bold text-xl">02</div>
            <p><strong>Exchange Expertise:</strong> Holistic understanding through biologists, data scientists, and clinicians working together.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-blue-600 font-bold text-xl">03</div>
            <p><strong>Enhance Credibility:</strong> High-level partnerships attract international recognition and vital funding.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-blue-600 font-bold text-xl">04</div>
            <p><strong>Accelerate Innovation:</strong> Shorten the distance between discovery and real-world medical application.</p>
          </div>
        </div>
      </section>

      {/* State of Collaboration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">The State of Collaboration in African Science</h2>
        <p className="mb-4">
          Africa already has shining examples of collaboration, such as **H3Africa**, uniting researchers across 30 institutions, and the **African Academy of Sciences (AAS)**. 
        </p>
        
        <p className="mt-4">
          Yet many African scientists still work in isolation due to fragmented networks and competition for scarce resources. A coordinated, continental model for omics collaboration is urgently needed.
        </p>
      </section>

      {/* The Metabolomics Africa Approach */}
      <section className="mb-12 border-l-4 border-blue-600 pl-8 py-2">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-blue-800">The Metabolomics Africa Approach to Partnership</h2>
        <p className="mb-6">
          We are creating a <Link href="https://www.metabolomicsafrica.org/membership" className="text-blue-700 font-bold hover:underline underline-offset-4">Pan-African Metabolomics Network</Link> that connects researchers and nations under a unified goal.
        </p>
        <div className="space-y-4">
          <p><strong>Global Collaborations:</strong> Partnerships with international universities to exchange expertise and access cutting-edge technology.</p>
          <p><strong>Education Exchanges:</strong> We host <Link href="https://www.metabolomicsafrica.org/stem" className="text-blue-600 hover:underline italic">collaborative workshops and mentorship programmes</Link> to ensure skills transfer across borders.</p>
        </div>
      </section>

      {/* Barriers Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Overcoming Barriers</h2>
        <p className="mb-4">
          Data fragmentation and administrative barriers often lock research within silos. <Link href="https://www.metabolomicsafrica.org/about" className="text-blue-600 font-medium hover:underline">Metabolomics Africa is addressing these barriers</Link> through advocacy, open science frameworks, and cross-institutional agreements.
        </p>
      </section>

      {/* CTA / Footer Section */}
      <footer className="mt-16 bg-blue-900 text-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-10 md:p-16 text-center">
          <h2 className="text-3xl font-bold mb-4">The Future is Shared</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            When researchers across Africa view collaboration not as competition but as co-creation, the continent will lead in global scientific contribution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://www.metabolomicsafrica.org/membership" 
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Contribute to our collaborative network
            </Link>
          </div>
          <p className="mt-8 text-blue-200 text-sm">
            Partner with us or email <span className="font-mono">metabolomicsafrica@gmail.com</span> to connect with our programmes.
          </p>
        </div>
      </footer>
    </article>
  );
}