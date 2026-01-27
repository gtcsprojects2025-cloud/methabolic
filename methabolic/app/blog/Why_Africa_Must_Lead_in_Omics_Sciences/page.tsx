import Link from 'next/link';

export default function LeadInOmicsArticle() {
  return (
    <article className="max-w-4xl mx-auto px-6 pt-32 py-16 text-gray-900 antialiased">
      {/* Hero Header Section */}
      <header className="mb-16 border-b pb-12 border-gray-100">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-tight">
          Why Africa Must Lead in <span className="text-indigo-600">Omics Sciences</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
          The next frontier of scientific innovation belongs to Africa—not by chance, but by design.
        </p>
      </header>

      {/* Intro Section */}
      <section className="mb-12 text-lg leading-relaxed">
        <p className="mb-6">
          Africa stands at a decisive moment in its scientific history. With over 1.4 billion people, immense biodiversity, and the fastest-growing youth population in the world, the continent is uniquely positioned to lead a new era of discovery through omics sciences: genomics, proteomics, and particularly <strong>metabolomics and phenomics</strong>.
        </p>
        <p>
          These disciplines are reshaping medicine, agriculture, and biotechnology globally. However, Africa remains underrepresented in these frontier fields. This imbalance is not due to a lack of potential, but a lack of access. 
        </p>
      </section>

      {/* The Omics Pillar Section */}
      <section className="mb-16 bg-indigo-50 rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-indigo-900">What Are Omics Sciences?</h2>
        <div className="grid gap-8">
          {[
            { title: "Genomics", desc: "Reveals the blueprint of life (DNA)." },
            { title: "Transcriptomics", desc: "Shows how genes are expressed (RNA)." },
            { title: "Proteomics", desc: "Identifies functional proteins." },
            { title: "Metabolomics", desc: "Captures small molecules reflecting health and function." },
            { title: "Phenomics", desc: "Translates molecular changes into observable traits." }
          ].map((item) => (
            <div key={item.title} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <span className="font-bold text-indigo-600 w-32 shrink-0 text-xl">{item.title}</span>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
        
      </section>

      {/* The African Advantage Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">The African Advantage</h2>
        <p className="mb-8">
          Africa’s greatest strength is diversity: genetic, cultural, ecological, and microbial. This diversity holds the clues to solving some of the world’s most pressing problems.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <h3 className="font-bold text-indigo-600 mb-2">Health</h3>
            <p className="text-sm">Unlocking unique disease patterns and genetic variants for targeted treatments.</p>
          </div>
          <div className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <h3 className="font-bold text-indigo-600 mb-2">Agriculture</h3>
            <p className="text-sm">Leveraging soil and crop diversity for resilient food systems.</p>
          </div>
          <div className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
            <h3 className="font-bold text-indigo-600 mb-2">Environment</h3>
            <p className="text-sm">Critical insights into climate adaptation from the Congo Basin to the Sahel.</p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="mb-16 prose prose-indigo max-w-none">
        <h2 className="text-3xl font-bold">Leadership, Not Just Participation</h2>
        <p>
          Leadership means owning the research agenda. It means designing projects that reflect African priorities and building regional centres of excellence that rival global standards. 
        </p>
        <p>
          <Link href="https://www.metabolomicsafrica.org" className="text-indigo-600 font-bold no-underline hover:underline">Metabolomics Africa</Link> is championing this vision by democratising access to omics science and equipping the next generation of innovators.
        </p>
      </section>

      {/* Scientific Sovereignty Quote */}
      <section className="mb-16 py-12 px-8 bg-slate-900 text-white rounded-3xl text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold italic mb-4">
            "Omics is more than a set of tools; it is the language of life. When Africa learns to speak it fluently, the world will listen differently."
          </h2>
          <p className="text-indigo-400 font-bold tracking-widest uppercase text-sm">Scientific Sovereignty</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/grid.svg')]"></div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Help us accelerate Africa’s omics revolution. Partner with us to support research, training, and collaboration.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link 
            href="https://www.metabolomicsafrica.org" 
            className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
          >
            Explore our Website
          </Link>
          <a href="mailto:metabolomicsafrica@gmail.com" className="text-indigo-600 font-medium hover:text-indigo-800">
            metabolomicsafrica@gmail.com
          </a>
        </div>
      </footer>
    </article>
  );
}