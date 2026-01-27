import Link from 'next/link';

export default function BlogArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 pt-32 text-gray-800 leading-relaxed">
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900">
          Addressing Africa’s Health Challenges Through Metabolomics
        </h1>
        <p className="text-xl text-gray-600 italic">
          Moving from reactive care to predictive, data-driven medicine.
        </p>
      </header>

      {/* Intro Section */}
      <section className="mb-10">
        <p className="mb-4">
          Africa faces a complex web of health challenges: from infectious diseases to rising chronic conditions like diabetes, hypertension, and cancer. Yet, within these challenges lies an opportunity: to lead in health innovation by understanding the biology of Africa itself.
        </p>
        <p className="mb-4">
          <strong>Metabolomics</strong> offers that opportunity. As the study of the small molecules that reflect the state of health in real time, metabolomics allows scientists to see what is truly happening inside the body—long before symptoms appear. For a continent often described as “data poor” but biologically rich, this science could be a turning point for African healthcare through organizations like <Link href="https://www.metabolomicsafrica.org" className="text-emerald-700 underline font-medium">Metabolomics Africa</Link>.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* What is Metabolomics */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">What Is Metabolomics in Health?</h2>
        <p className="mb-4">
          Every heartbeat, every breath, and every cell reaction produces thousands of metabolites: chemical fingerprints that show how the body functions. These molecules change when disease starts, when treatment works, or when the environment affects the body.
        </p>
        
        <p className="mt-4">
          Metabolomics captures those changes, helping researchers identify biomarkers that signal disease early, predict outcomes, and monitor response to therapy. Unlike traditional approaches that react to symptoms, metabolomics offers predictive and precise insight: an approach Africa urgently needs.
        </p>
      </section>

      {/* Landscape Section */}
      <section className="mb-10 p-6 bg-emerald-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">The African Health Landscape</h2>
        <p>
          The continent continues to battle infectious diseases like malaria, HIV/AIDS, and tuberculosis, while non-communicable diseases (NCDs) are rising rapidly. Because drug responses often vary significantly due to genetic and metabolic differences across populations, metabolomics offers precision that transcends geographical differences.
        </p>
      </section>

      {/* Transformation List */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-emerald-800">How Metabolomics Can Transform African Healthcare</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h3 className="font-bold text-lg">Early Disease Detection</h3>
            <p className="text-sm">Identify diabetes, cancer, and malaria before clinical symptoms appear, saving lives and reducing costs.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-4">
            <h3 className="font-bold text-lg">Precision Medicine</h3>
            <p className="text-sm">Tailor treatments to individual biology to reduce adverse drug reactions.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-4">
            <h3 className="font-bold text-lg">Nutrition Research</h3>
            <p className="text-sm">Understand how indigenous foods and herbal medicines affect health.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-4">
            <h3 className="font-bold text-lg">Public Health Surveillance</h3>
            <p className="text-sm">Monitor environmental and infectious disease outbreaks through population metabolic shifts.</p>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">The Infrastructure Challenge</h2>
        <p className="mb-4">
          Metabolomics requires advanced analytical equipment like mass spectrometers and NMR systems. <Link href="https://www.metabolomicsafrica.org/about" className="text-emerald-700 underline font-medium">Metabolomics Africa seeks to change that</Link> by:
        </p>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>Establishing regional Centres of Excellence.</li>
          <li><Link href="https://www.metabolomicsafrica.org/collaborations" className="text-emerald-700 underline">Partnering with universities to integrate omics education</Link>.</li>
          <li><Link href="https://www.metabolomicsafrica.org/education" className="text-emerald-700 underline">Training scientists and clinicians</Link> to collect, process, and interpret metabolic data.</li>
        </ul>
      </section>

      {/* Traditional Medicine */}
      <section className="mb-10">
        <blockquote className="border-t border-b py-6 italic text-gray-700 border-emerald-200">
          "This integration bridges ancestral wisdom with modern science, ensuring that Africa’s medical future honours its roots while embracing innovation."
        </blockquote>
      </section>

      {/* Conclusion & CTA */}
      <section className="bg-emerald-900 text-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
        <p className="mb-6">
          The world is looking to Africa for new biological insights. Now is the time for Africa to look inward and lead.
        </p>
        <Link 
          href="https://www.metabolomicsafrica.org/coming-initiatives" 
          className="inline-block bg-white text-emerald-900 font-bold py-3 px-6 rounded-md hover:bg-emerald-50 transition-colors"
        >
          Building the Future of African Healthcare
        </Link>
        <p className="mt-6 text-emerald-100 text-sm">
          Partner with us or email <span className="underline italic">metabolomicsafrica@gmail.com</span> to support training and infrastructure.
        </p>
      </section>
    </article>
  );
}