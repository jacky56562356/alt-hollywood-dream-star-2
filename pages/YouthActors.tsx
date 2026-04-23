
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';

export default function YouthActors() {
  const { actors } = useData();

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-2">Youth Performers</h2>
          <h1 className="text-3xl md:text-5xl font-cinematic font-black mb-3 tracking-tight">Our Stars</h1>
          <p className="text-brandGray text-sm md:text-base font-light leading-snug">
            Selected, trained, and developed through real film projects, building professional portfolios and industry-ready experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {actors.map((actor, index) => (
            <Link to={`/actors/${actor.id}`} key={actor.id} className="group cursor-pointer flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-brandCyan/40 transition-all duration-500 shadow-xl">
              <div className="relative aspect-[4/5] overflow-hidden border-b border-white/10">
                <img referrerPolicy="no-referrer" 
                  src={actor.imageUrl} 
                  alt={actor.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading={index < 8 ? "eager" : "lazy"}
                  fetchPriority={index < 4 ? "high" : "auto"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                {actor.isAwardWinner && (
                  <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm p-1 rounded-lg border border-white/10">
                    <img 
                      src="https://i.ibb.co/TqJBkL9F/Chat-GPT-Image-2025-8-29-15-46-30-1.jpg" 
                      alt="Award Winner" 
                      className="h-8 w-auto object-contain rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-cinematic font-bold tracking-wide group-hover:text-brandCyan transition-colors mb-1">{actor.name}</h3>
                  <p className="text-[10px] text-brandGray font-black uppercase tracking-widest">Age: {actor.ageRange}</p>
                </div>
                
                <div className="space-y-4 mt-auto">
                  <div>
                    <p className="text-[10px] text-brandCyan uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-3 h-px bg-brandCyan/50"></span> Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {actor.skills.map((skill, i) => (
                        <span key={i} className="text-[10px] font-medium px-2 py-1 bg-white/5 border border-white/10 rounded text-brandGray/90">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] text-brandCyan uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-3 h-px bg-brandCyan/50"></span> Credits
                    </p>
                    <ul className="space-y-1.5">
                      {actor.credits.map((credit, i) => (
                        <li key={i} className="text-[11px] text-brandGray/90 flex items-start gap-2 leading-snug">
                          <span className="text-brandCyan/50 mt-1 text-[6px]">■</span>
                          <span>{credit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
