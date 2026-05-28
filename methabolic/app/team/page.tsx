
// src/app/team/page.jsx
import { getSheetData } from '../components/sheets';

// Opt into dynamic rendering if your sheet updates frequently
export const revalidate = 3600; // Revalidate data at most every hour

export default async function TeamPage() {
  const teamMembers = await getSheetData();

  if (teamMembers.length === 0) {
    return <p className="p-8 text-center">No data found or failed to load sheet.</p>;
  }

  return (
    
    <div className="max-w-4xl mx-auto p-8">
        
      <h1 className="text-3xl font-bold mb-6">Our Team</h1>
      
      <div className="grid gap-4 md:grid-cols-1">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg"
          >
            {/* Adjust keys based on your sheet's lowercase column headers */}
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-sm opacity-80">{member.role}</p>
            <span className="inline-block mt-2 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
              {member.location}
            </span>
          </div>
        ))}
      </div>
      
    </div>
  );
}