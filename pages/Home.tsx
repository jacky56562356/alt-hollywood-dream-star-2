
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Film, Star, TrendingUp, Users, Clapperboard, Monitor, Send, Search, Award, ShieldCheck, Globe, Camera, Zap, CheckCircle, Quote, ArrowRight, Trophy, Sparkles, X, GraduationCap } from 'lucide-react';
import { FILMS } from '../constants';

const ECOSYSTEM_ITEMS = [
  {
    title: "Hands-on Sets",
    desc: "Experience the intensity of active soundstages. Master professional call sheets, set etiquette, and rigorous shooting schedules under the guidance of union-level crews.",
    icon: Camera,
    image: "https://i.ibb.co/S7JBKpZp/u8238228639-behind-the-scenes-photo-of-a-real-childrens-movie-4ec21d2d-7796-4a10-a5a4-8ae8681d2ad7-1.png"
  },
  {
    title: "Elite Training",
    desc: "A dual-focus curriculum mastering method acting and technical screen performance. From deep emotional recall to precise blocking and camera continuity.",
    icon: Zap,
    image: "https://i.ibb.co/8DDg94mN/professional-camera-man-at-work-2022-02-09-18-59-44-utc.jpg"
  },
  {
    title: "Global Network",
    desc: "A bridge to the world's entertainment capitals. Direct production pipelines to major studios in LA, New York, and abroad, ensuring our students reach a global audience.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Career Credits",
    desc: "Graduate with a verifiable IMDb resume. We ensure every student earns professional credits, a cinematic showreel, and tangible industry recognition before they leave.",
    icon: Award,
    image: "https://i.ibb.co/qY9b9ypz/1251303140-shutterstock-1541269967-1.jpg"
  }
];

const TESTIMONIALS = [
  {
    quote: "ALT doesn't just teach acting; they build careers. My daughter went from a classroom to a professional set in 3 months.",
    author: "Jennifer Brooks",
    role: "Parent of Alumni",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "The discipline and set etiquette these kids have is comparable to adult professionals. A joy to cast.",
    author: "Robert Harrison",
    role: "Production Director, LA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Finally, a program that understands the industry. The IMDb credits are real, and the experience is invaluable.",
    author: "Amanda Sterling",
    role: "Industry Professional",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  }
];

export default function Home() {
  const [lightboxImage, setLightboxImage] = React.useState<string | null>(null);

  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          {/* YouTube Video Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/Z1ucuyxlmf0?autoplay=1&mute=1&loop=1&playlist=Z1ucuyxlmf0&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1"
              className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            ></iframe>
          </div>
          {/* Dark mask overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/50 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center px-4 animate-in fade-in zoom-in-95 duration-700 mt-16">
          <h2 className="brand-gradient-text text-xs md:text-sm font-black tracking-[0.5em] mb-3 uppercase drop-shadow-lg">
            Training · Film Production · Global Exposure
          </h2>
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-5xl md:text-8xl font-cinematic font-black brand-gradient-text leading-tight md:leading-[0.9] tracking-tighter mb-2 drop-shadow-2xl">
              ALT
            </h1>
            <h2 className="text-xl md:text-3xl font-cinematic font-bold tracking-[0.3em] uppercase text-white/95 drop-shadow-xl">
              Hollywood Dream Star
            </h2>
          </div>
          <p className="text-sm md:text-lg text-white/80 font-medium mb-6 max-w-2xl mx-auto italic tracking-wide leading-relaxed drop-shadow-md px-4">
            "The premier bridge between world-class training and real Hollywood film production for the next generation of stars."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/summer-camp" className="w-56 sm:w-auto px-8 py-4 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-black font-black rounded-sm uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(191,149,63,0.4)]">
              <Star size={14} fill="currentColor" /> 2026 Summer Camp
            </Link>
            <Link to="/programs" className="w-56 sm:w-auto px-8 py-4 brand-bg text-white font-black rounded-sm uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
              <Play size={14} fill="currentColor" /> View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Summer Camp Highlight Banner */}
      <section className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] py-4 relative z-20 shadow-[0_0_30px_rgba(191,149,63,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-black">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex w-10 h-10 bg-black rounded-full items-center justify-center text-[#FCF6BA]">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-black uppercase tracking-widest text-sm md:text-base">2026 Hollywood Film Summer Camp</h3>
              <p className="text-xs font-bold opacity-80">Real Film Production Experience for Kids • Limited Spots</p>
            </div>
          </div>
          <Link to="/summer-camp" className="px-8 py-3 bg-black text-[#FCF6BA] text-xs font-black uppercase tracking-[0.2em] rounded-sm hover:scale-105 transition-transform whitespace-nowrap shadow-xl flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Featured Films Showcase (Visual Impact) */}
      <section className="py-10 bg-brandBlack border-b border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-brandCyan/5 blur-3xl rounded-full pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
               <div>
                  <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-2">Now Streaming</h2>
                  <h3 className="text-3xl md:text-4xl font-cinematic font-black tracking-tight text-white">Latest Productions</h3>
               </div>
               <Link to="/films" className="flex items-center gap-2 text-brandCyan text-xs font-bold uppercase tracking-widest hover:text-white transition-colors group">
                  View Full Library <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
               </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
               {FILMS.slice(0, 5).map((film) => (
                  <Link to="/films" key={film.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-brandCyan/50 transition-all cursor-pointer">
                     <img referrerPolicy="no-referrer"
                        src={film.posterUrl} 
                        alt={film.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="eager"
                        fetchPriority="high"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-brandBlack/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <span className="text-[9px] brand-bg text-white px-2 py-0.5 rounded w-fit mb-2 font-bold uppercase tracking-wide">{film.genre}</span>
                        <h4 className="text-sm font-bold text-white leading-tight">{film.title}</h4>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </section>

      {/* NEW SECTION: Industry News & Awards */}
      <section className="py-12 bg-[#080808] border-b border-white/5 relative overflow-hidden min-h-[400px] flex items-center">
        {/* Background Decorative elements */}
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brandCyan/5 blur-[100px] rounded-full pointer-events-none"></div>

        {/* STARLIGHT & PARTICLES BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Gold Dust Particles */}
            {[...Array(30)].map((_, i) => (
               <div
                  key={`dust-${i}`}
                  className="absolute bg-amber-400/30 rounded-full animate-float"
                  style={{
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                     width: `${Math.random() * 2 + 1}px`,
                     height: `${Math.random() * 2 + 1}px`,
                     animationDuration: `${Math.random() * 10 + 10}s`,
                     animationDelay: `${Math.random() * 5}s`,
                  }}
               />
            ))}
            
            {/* Twinkling Stars (Walk of Fame vibe) */}
            {[...Array(12)].map((_, i) => (
               <div
                  key={`star-${i}`}
                  className="absolute text-amber-200/20 animate-pulse"
                  style={{
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                     animationDuration: `${Math.random() * 3 + 2}s`,
                     animationDelay: `${Math.random() * 2}s`,
                     transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 45}deg)`
                  }}
               >
                  <Star size={Math.random() * 12 + 6} fill="currentColor" />
               </div>
            ))}

            {/* Magic Sparkles */}
            {[...Array(8)].map((_, i) => (
               <div
                  key={`sparkle-${i}`}
                  className="absolute text-brandCyan/30 animate-pulse"
                  style={{
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                     animationDuration: `${Math.random() * 2 + 1.5}s`,
                     animationDelay: `${Math.random() * 3}s`,
                  }}
               >
                  <Sparkles size={Math.random() * 16 + 8} />
               </div>
            ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10 justify-center">
             <div className="h-px bg-white/10 w-12 md:w-24"></div>
             <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brandGray flex items-center gap-2 text-center">
                <Sparkles size={12} className="text-amber-400" />
                Industry Recognition & Awards
             </h2>
             <div className="h-px bg-white/10 w-12 md:w-24"></div>
          </div>

          <div className="flex flex-col gap-12">
             {/* News Item 1: Golden State Film Festival */}
             <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-brandCyan/50 transition-all duration-500 shadow-2xl flex flex-col lg:flex-row relative">
                {/* Elegant Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brandCyan/5 blur-[60px] rounded-full pointer-events-none"></div>
                
                {/* Content Area */}
                <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center relative z-10">
                   <div className="mb-8 max-w-[200px]">
                      <img referrerPolicy="no-referrer"
                         src="https://i.ibb.co/kssxQ1DR/golden-state-film-festival-logo.jpg"
                         onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling!.classList.remove('hidden');
                         }}
                         className="w-full h-auto object-contain drop-shadow-lg rounded-lg" 
                         alt="Golden State Film Festival" 
                         loading="lazy"
                      />
                      <div className="hidden flex flex-col items-center justify-center text-center h-full">
                         <Film size={24} className="text-white mb-1" />
                         <span className="text-[8px] uppercase font-bold text-white leading-tight">Golden State</span>
                      </div>
                   </div>
                   
                   <div className="inline-block px-4 py-1.5 border border-brandCyan/30 rounded-full bg-brandCyan/10 mb-4 w-max">
                       <p className="text-[10px] font-black uppercase tracking-widest text-brandCyan">Official Selection</p>
                   </div>
                   
                   <h3 className="text-3xl sm:text-4xl font-cinematic font-black text-white mb-2 group-hover:text-brandCyan transition-colors">The Garden</h3>
                   <p className="text-brandGray text-sm font-bold tracking-[0.1em] uppercase mb-8">Golden State Film Festival</p>
                   
                   <div className="space-y-6">
                      <div>
                         <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Film size={16} className="text-brandCyan" /> About the Festival
                         </h4>
                         <p className="text-sm text-brandGray/80 leading-relaxed">
                            The Golden State Film Festival serves as a premier platform for emerging filmmakers, hosted at the historic TCL Chinese Theatre in Hollywood. It recognizes outstanding independent cinema from around the globe.
                         </p>
                      </div>
                      <div>
                         <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Award size={16} className="text-brandCyan" /> Award & Recognition
                         </h4>
                         <p className="text-sm text-brandGray/80 leading-relaxed">
                            Selected for its outstanding cinematography and compelling narrative, "The Garden" represents the pinnacle of our students' creative vision and technical execution, standing out among thousands of submissions.
                         </p>
                      </div>
                   </div>
                </div>

                {/* Image Gallery Area - Decorated 4-Frame Layout */}
                <div className="lg:w-1/2 p-8 lg:p-12 lg:pl-0 flex items-center justify-center relative z-10">
                   <div className="relative p-4 sm:p-6 bg-[#050505] rounded-2xl border border-white/10 shadow-2xl w-full">
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brandCyan/50 rounded-tl-2xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brandCyan/50 rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brandCyan/50 rounded-bl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brandCyan/50 rounded-br-2xl"></div>
                      
                      {/* Film strip decorative holes */}
                      <div className="absolute top-2 left-6 right-6 flex justify-between opacity-20">
                         {[...Array(6)].map((_, i) => <div key={i} className="w-6 h-1.5 bg-white rounded-full"></div>)}
                      </div>
                      <div className="absolute bottom-2 left-6 right-6 flex justify-between opacity-20">
                         {[...Array(6)].map((_, i) => <div key={i} className="w-6 h-1.5 bg-white rounded-full"></div>)}
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 mb-4">
                         <div className="relative aspect-[4/3] bg-[#111] rounded-lg border border-white/5 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img shadow-inner" onClick={() => setLightboxImage("https://i.ibb.co/Gf12rGbT/Chat-GPT-Image-2026-3-22-14-21-03.png")}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <img referrerPolicy="no-referrer" src="https://i.ibb.co/Gf12rGbT/Chat-GPT-Image-2026-3-22-14-21-03.png" className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/img:scale-105 drop-shadow-lg" alt="The Garden Still 1" loading="lazy" />
                         </div>
                         <div className="relative aspect-[4/3] bg-[#111] rounded-lg border border-white/5 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img shadow-inner" onClick={() => setLightboxImage("https://i.ibb.co/bMtVxnWT/20260301101021-372-10.jpg")}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <img referrerPolicy="no-referrer" src="https://i.ibb.co/bMtVxnWT/20260301101021-372-10.jpg" className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/img:scale-105 drop-shadow-lg" alt="The Garden Still 2" loading="lazy" />
                         </div>
                         <div className="relative aspect-[4/3] bg-[#111] rounded-lg border border-white/5 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img shadow-inner" onClick={() => setLightboxImage("https://i.ibb.co/rKrN1Sdx/20260301101027-374-10.jpg")}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <img referrerPolicy="no-referrer" src="https://i.ibb.co/rKrN1Sdx/20260301101027-374-10.jpg" className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/img:scale-105 drop-shadow-lg" alt="The Garden Still 3" loading="lazy" />
                         </div>
                         <div className="relative aspect-[4/3] bg-[#111] rounded-lg border border-white/5 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img shadow-inner" onClick={() => setLightboxImage("https://i.ibb.co/bMtVxnWT/20260301101021-372-10.jpg")}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <img referrerPolicy="no-referrer" src="https://i.ibb.co/bMtVxnWT/20260301101021-372-10.jpg" className="max-w-full max-h-full object-cover transition-transform duration-700 group-hover/img:scale-105 drop-shadow-lg" alt="The Garden Still 4" loading="lazy" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* News Item 2: Golden Feather Awards */}
             <div className="bg-[#1a1500]/40 border border-amber-500/20 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all duration-500 shadow-2xl flex flex-col lg:flex-row relative">
                {/* Elegant Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-[60px] rounded-full pointer-events-none"></div>
                
                {/* Content Area */}
                <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center relative z-10">
                   <div className="mb-8 max-w-[200px]">
                      <img referrerPolicy="no-referrer"
                         src="https://i.ibb.co/TqJBkL9F/Chat-GPT-Image-2025-8-29-15-46-30-1.jpg"
                         onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling!.classList.remove('hidden');
                         }}
                         className="w-full h-auto object-contain drop-shadow-lg rounded-lg" 
                         alt="Golden Feather Awards" 
                         loading="lazy"
                      />
                      <div className="hidden flex flex-col items-center justify-center text-center h-full">
                         <Trophy size={24} className="text-amber-400 mb-1" />
                         <span className="text-[8px] uppercase font-bold text-amber-400 leading-tight">Golden Feather</span>
                      </div>
                   </div>
                   
                   <div className="inline-block px-4 py-1.5 border border-amber-500/30 rounded-full bg-amber-500/10 mb-4 w-max">
                       <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                          <Star size={10} fill="currentColor" /> Jury Award Winner <Star size={10} fill="currentColor" />
                       </p>
                   </div>
                   
                   <h3 className="text-3xl sm:text-4xl font-cinematic font-black text-white mb-2 group-hover:text-amber-400 transition-colors">The Shift</h3>
                   <p className="text-brandGray text-sm font-bold tracking-[0.1em] uppercase mb-4">Golden Feather Awards</p>
                   
                   <div className="flex flex-wrap gap-2 mb-8">
                      <span className="text-xs font-bold border border-amber-500/30 text-amber-200/90 px-2.5 py-1 rounded bg-amber-900/20">Best Story</span>
                      <span className="text-xs font-bold border border-amber-500/30 text-amber-200/90 px-2.5 py-1 rounded bg-amber-900/20">Best Actor</span>
                   </div>
                   
                   <div className="space-y-6">
                      <div>
                         <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Film size={16} className="text-amber-400" /> About the Festival
                         </h4>
                         <p className="text-sm text-brandGray/80 leading-relaxed">
                            The Golden Feather Awards celebrates excellence in storytelling and cinematic arts. It is a highly competitive international festival dedicated to honoring visionary directors, actors, and crews who push the boundaries of modern filmmaking.
                         </p>
                      </div>
                      <div>
                         <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Trophy size={16} className="text-amber-400" /> Award & Recognition
                         </h4>
                         <p className="text-sm text-brandGray/80 leading-relaxed">
                            A sweeping narrative that captured the hearts of the jury, taking home multiple top honors at this year's Golden Feather Awards for its emotional depth and powerful performances.
                         </p>
                      </div>
                   </div>
                </div>

                {/* Image Gallery Area - Decorated 4-Frame Layout */}
                <div className="lg:w-1/2 p-8 lg:p-12 lg:pl-0 flex items-center justify-center relative z-10">
                   <div className="relative p-4 sm:p-6 bg-[#050505] rounded-2xl border border-white/10 shadow-2xl w-full">
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/50 rounded-tl-2xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/50 rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/50 rounded-bl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500/50 rounded-br-2xl"></div>
                      
                      {/* Film strip decorative holes */}
                      <div className="absolute top-2 left-6 right-6 flex justify-between opacity-20">
                         {[...Array(6)].map((_, i) => <div key={i} className="w-6 h-1.5 bg-amber-500/50 rounded-full"></div>)}
                      </div>
                      <div className="absolute bottom-2 left-6 right-6 flex justify-between opacity-20">
                         {[...Array(6)].map((_, i) => <div key={i} className="w-6 h-1.5 bg-amber-500/50 rounded-full"></div>)}
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 mb-4">
                         <div className="relative aspect-[4/3] bg-[#111] rounded-lg border border-amber-500/10 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img shadow-inner" onClick={() => setLightboxImage("https://i.ibb.co/1Gj2K8CX/d92babf9ca9b15b9fe754beaa383a6cf.jpg")}>
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <img referrerPolicy="no-referrer" src="https://i.ibb.co/1Gj2K8CX/d92babf9ca9b15b9fe754beaa383a6cf.jpg" className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/img:scale-105 drop-shadow-lg opacity-90" alt="The Shift Still 1" loading="lazy" />
                         </div>
                         <div className="relative aspect-[4/3] bg-[#111] rounded-lg border border-amber-500/10 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img shadow-inner" onClick={() => setLightboxImage("https://i.ibb.co/TqHKNcjx/1731693e1e0ea8102582bec61f0aed1d.jpg")}>
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <img referrerPolicy="no-referrer" src="https://i.ibb.co/TqHKNcjx/1731693e1e0ea8102582bec61f0aed1d.jpg" className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/img:scale-105 drop-shadow-lg opacity-90" alt="The Shift Still 2" loading="lazy" />
                         </div>
                         <div className="relative aspect-[4/3] bg-[#111] rounded-lg border border-amber-500/10 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img shadow-inner" onClick={() => setLightboxImage("https://i.ibb.co/KczJSxQZ/356736.jpg")}>
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <img referrerPolicy="no-referrer" src="https://i.ibb.co/KczJSxQZ/356736.jpg" className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/img:scale-105 drop-shadow-lg opacity-90" alt="The Shift Still 3" loading="lazy" />
                         </div>
                         <div className="relative aspect-[4/3] bg-[#111] rounded-lg border border-amber-500/10 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img shadow-inner" onClick={() => setLightboxImage("https://i.ibb.co/5XPZYkgB/20260122155907-1672-151.jpg")}>
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <img referrerPolicy="no-referrer" src="https://i.ibb.co/5XPZYkgB/20260122155907-1672-151.jpg" className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/img:scale-105 drop-shadow-lg opacity-90" alt="The Shift Still 4" loading="lazy" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* 2025 Golden Feather Individual Awards */}
          <div className="mt-20 pt-16 border-t border-white/10">
             <div className="text-center mb-16">
                <div className="inline-block px-4 py-1.5 border border-amber-500/30 rounded-full bg-amber-500/10 mb-4">
                   <p className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                      <Trophy size={14} fill="currentColor" /> 2025 Golden Feather Awards <Trophy size={14} fill="currentColor" />
                   </p>
                </div>
                <h3 className="text-3xl md:text-4xl font-cinematic font-black text-white">2025 Golden Feather Awards</h3>
             </div>

             {/* Best Actor */}
             <div className="mb-16">
                <h4 className="text-xl font-bold text-center text-white mb-10 flex items-center justify-center gap-4">
                   <span className="h-px bg-white/20 w-12 sm:w-24"></span>
                   <span className="tracking-widest uppercase text-sm sm:text-base">Best Actor Award</span>
                   <span className="h-px bg-white/20 w-12 sm:w-24"></span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 max-w-xs mx-auto gap-4">
                   {/* Evan Wen */}
                   <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all text-center shadow-xl hover:shadow-amber-500/10">
                      <div className="aspect-[3/4] overflow-hidden cursor-pointer relative" onClick={() => setLightboxImage("https://i.ibb.co/TxPsjKY5/Carin-Yates-Photography2-3-2024-269.jpg")}>
                         <img referrerPolicy="no-referrer" src="https://i.ibb.co/TxPsjKY5/Carin-Yates-Photography2-3-2024-269.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Evan Wen" loading="lazy" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                      <div className="p-6">
                         <h5 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">Evan Wen</h5>
                      </div>
                   </div>
                   {/* Paul yunsheng Liu */}
                   <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all text-center shadow-xl hover:shadow-amber-500/10">
                      <div className="aspect-[3/4] overflow-hidden cursor-pointer relative" onClick={() => setLightboxImage("https://i.ibb.co/v40LfrmN/4.png")}>
                         <img referrerPolicy="no-referrer" src="https://i.ibb.co/v40LfrmN/4.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Paul yunsheng Liu" loading="lazy" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                      <div className="p-6">
                         <h5 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">Paul yunsheng Liu</h5>
                      </div>
                   </div>
                </div>
             </div>

             {/* Best Actress */}
             <div>
                <h4 className="text-xl font-bold text-center text-white mb-10 flex items-center justify-center gap-4">
                   <span className="h-px bg-white/20 w-12 sm:w-24"></span>
                   <span className="tracking-widest uppercase text-sm sm:text-base">Best Actress Award</span>
                   <span className="h-px bg-white/20 w-12 sm:w-24"></span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 max-w-lg mx-auto gap-4">
                   {/* Veronica Tiffany Chen */}
                   <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all text-center shadow-xl hover:shadow-amber-500/10">
                      <div className="aspect-[3/4] overflow-hidden cursor-pointer relative" onClick={() => setLightboxImage("https://i.ibb.co/mVLL5mQs/2.png")}>
                         <img referrerPolicy="no-referrer" src="https://i.ibb.co/mVLL5mQs/2.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Veronica Tiffany Chen" loading="lazy" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                      <div className="p-6">
                         <h5 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">Veronica Tiffany Chen</h5>
                      </div>
                   </div>
                   {/* Catherine Jing */}
                   <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all text-center shadow-xl hover:shadow-amber-500/10">
                      <div className="aspect-[3/4] overflow-hidden cursor-pointer relative" onClick={() => setLightboxImage("https://i.ibb.co/fY46H6Dd/3.png")}>
                         <img referrerPolicy="no-referrer" src="https://i.ibb.co/fY46H6Dd/3.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Catherine Jing" loading="lazy" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                      <div className="p-6">
                         <h5 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">Catherine Jing</h5>
                      </div>
                   </div>
                   {/* Lexi Shen */}
                   <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all text-center shadow-xl hover:shadow-amber-500/10">
                      <div className="aspect-[3/4] overflow-hidden cursor-pointer relative" onClick={() => setLightboxImage("https://i.ibb.co/RJMv66s/Carin-Yates-Photography10-27-2024-2-pp-removebg-preview.png")}>
                         <img referrerPolicy="no-referrer" src="https://i.ibb.co/RJMv66s/Carin-Yates-Photography10-27-2024-2-pp-removebg-preview.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Lexi Shen" loading="lazy" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                      <div className="p-6">
                         <h5 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">Lexi Shen</h5>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-brandBlack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-4">Our Legacy & Mission</h2>
              <h3 className="text-3xl md:text-5xl font-cinematic font-black mb-6 leading-tight tracking-tight text-white">
                Where Training Meets <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Real Film Production</span>
              </h3>
              
              <div className="space-y-6 text-brandGray text-sm md:text-base leading-relaxed font-light mb-8">
                <p>
                  ALT HOLLYWOOD DREAM STAR is not just a school; it's a launchpad. Based in Los Angeles, we operate as a full-cycle creative hub where acting training integrates seamlessly with professional filmmaking.
                </p>
                <p>
                  We provide young performers aged 6–18 with hands-on experience in professional sets, industry-standard workflows, and official film distribution. Our "Film-First" methodology ensures education translates directly to screen performance.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-brandCyan/10 text-brandCyan"><CheckCircle size={16} /></div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm">Authentic Sets</h5>
                    <p className="text-xs text-brandGray">High-fidelity studio environments.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="p-1 rounded-full bg-brandCyan/10 text-brandCyan"><CheckCircle size={16} /></div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm">IMDb Credits</h5>
                    <p className="text-xs text-brandGray">Verified professional recognition.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="p-1 rounded-full bg-brandCyan/10 text-brandCyan"><CheckCircle size={16} /></div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm">Festival Exposure</h5>
                    <p className="text-xs text-brandGray">Submission to international film festivals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="p-1 rounded-full bg-brandCyan/10 text-brandCyan"><CheckCircle size={16} /></div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm">Global Reach</h5>
                    <p className="text-xs text-brandGray">Festivals & Streaming platforms.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
               <div className="absolute inset-0 bg-brandCyan/20 blur-[100px] rounded-full opacity-20"></div>
               <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-4 translate-y-8">
                     <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-2xl border border-white/10 opacity-80" alt="Camera" loading="lazy" />
                     <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <p className="text-3xl font-cinematic font-black text-white mb-1">20+</p>
                        <p className="text-[10px] text-brandGray uppercase tracking-widest font-bold">Festival Selections</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="bg-brandBg border border-brandCyan/20 p-6 rounded-2xl bg-gradient-to-br from-brandCyan/10 to-brandPurple/10 backdrop-blur-sm">
                        <p className="text-3xl font-cinematic font-black text-white mb-1">12+</p>
                        <p className="text-[10px] text-brandGray uppercase tracking-widest font-bold">Original Films</p>
                     </div>
                     <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-2xl border border-white/10 opacity-80" alt="Set Light" loading="lazy" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Impact Statistics */}
      <section className="py-8 border-y border-white/5 bg-brandBlack/50 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
               <div className="group">
                  <p className="text-4xl md:text-5xl font-cinematic font-black text-white mb-2 group-hover:brand-gradient-text transition-colors">80+</p>
                  <p className="text-[10px] text-brandGray uppercase tracking-[0.2em] font-bold">Youth Stars</p>
               </div>
               <div className="group">
                  <p className="text-4xl md:text-5xl font-cinematic font-black text-white mb-2 group-hover:brand-gradient-text transition-colors">30+</p>
                  <p className="text-[10px] text-brandGray uppercase tracking-[0.2em] font-bold">Trained Performers</p>
               </div>
               <div className="group">
                  <p className="text-4xl md:text-5xl font-cinematic font-black text-white mb-2 group-hover:brand-gradient-text transition-colors">20+</p>
                  <p className="text-[10px] text-brandGray uppercase tracking-[0.2em] font-bold">Festival Selections</p>
               </div>
               <div className="group">
                  <p className="text-4xl md:text-5xl font-cinematic font-black text-white mb-2 group-hover:brand-gradient-text transition-colors">8+</p>
                  <p className="text-[10px] text-brandGray uppercase tracking-[0.2em] font-bold">Industry Awards</p>
               </div>
            </div>
         </div>
      </section>

      {/* NEW SECTION: University Admissions */}
      <section className="py-12 bg-brandBlack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="absolute inset-0 bg-brandCyan/20 blur-[100px] rounded-full opacity-20"></div>
               <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-4 translate-y-8">
                     <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-2xl border border-white/10 opacity-80 h-64 w-full object-cover" alt="University Campus" loading="lazy" />
                  </div>
                  <div className="space-y-4">
                     <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-2xl border border-white/10 opacity-80 h-64 w-full object-cover" alt="Graduation" loading="lazy" />
                  </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right duration-1000">
              <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-4">Academic Advancement</h2>
              <h3 className="text-3xl md:text-5xl font-cinematic font-black mb-6 leading-tight tracking-tight text-white">
                University <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Admissions</span>
              </h3>
              
              <div className="space-y-6 text-brandGray text-sm md:text-base leading-relaxed font-light mb-8">
                <p>
                  Our comprehensive training and professional IMDb credits provide a significant advantage for students applying to top-tier universities and film schools.
                </p>
                <p>
                  We guide our students in building a standout portfolio that showcases their dedication, creativity, and real-world industry experience, setting them apart in the competitive college admissions process.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="p-3 rounded-full bg-brandCyan/10 text-brandCyan"><GraduationCap size={24} /></div>
                 <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm">Portfolio Building</h5>
                    <p className="text-xs text-brandGray">Crafting compelling applications.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-12 bg-brandBlack relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-cinematic font-black mb-4 tracking-tight text-white">Our Core Ecosystem</h2>
            <div className="w-12 h-0.5 brand-bg mx-auto mb-4"></div>
            <p className="text-brandGray max-w-2xl mx-auto text-sm leading-relaxed font-light">From initial discovery to international distribution, our system is designed for professional results.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {ECOSYSTEM_ITEMS.map((item, index) => (
              <div key={index} className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-brandCyan/50 transition-all duration-500">
                <div className="absolute inset-0">
                  <img referrerPolicy="no-referrer"
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/80 to-transparent"></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-12 h-12 brand-bg rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-brandCyan/20 transform group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-xl font-cinematic font-bold mb-2 text-white group-hover:brand-gradient-text transition-all">{item.title}</h4>
                  <p className="text-brandGray text-xs leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.desc}
                  </p>
                  <div className="w-0 h-0.5 brand-bg mt-4 transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Testimonials */}
      <section className="py-12 bg-[#080a0e] relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-8 text-center">Industry & Parent Voices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
               {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-2xl relative hover:bg-white/[0.07] transition-colors">
                     <Quote className="text-brandCyan/20 absolute top-6 right-6" size={40} />
                     <div className="flex items-center gap-4 mb-6">
                        <img referrerPolicy="no-referrer" src={t.image} className="w-12 h-12 rounded-full object-cover border border-white/10" alt={t.author} loading="lazy" />
                        <div>
                           <p className="text-white font-bold text-sm">{t.author}</p>
                           <p className="text-brandGray text-xs uppercase tracking-wider">{t.role}</p>
                        </div>
                     </div>
                     <p className="text-brandGray text-sm italic leading-relaxed">"{t.quote}"</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden text-center flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-brandBlack">
             {/* Grayscale Big Screen Effect */}
             <img referrerPolicy="no-referrer"
               src="https://i.ibb.co/5xXXdHrB/u8238228639-v-7-f5d92d51-ca1a-4aea-9a0c-c19abca23644-1.png" 
               className="w-full h-full object-cover opacity-60 grayscale brightness-75 contrast-125" 
               alt="Classic Hollywood Cinema" 
               loading="lazy" 
             />
             {/* Silver/Grey Overlay to simulate a big screen */}
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/50 to-gray-900/80 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-black/80 opacity-60"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           {/* Box styles updated to match grey screen theme */}
           <div className="bg-white/5 backdrop-blur-sm p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl animate-fade-up">
              <h2 className="text-4xl md:text-6xl font-cinematic font-black mb-4 tracking-tighter drop-shadow-2xl text-white">Your Hollywood Debut Awaits</h2>
              <p className="text-white/80 text-lg md:text-xl mb-8 font-medium tracking-wide drop-shadow-lg max-w-2xl mx-auto">
                Step onto the big screen. The audience is waiting for your performance.
              </p>
              <a href="mailto:altdreamstar@gmail.com" className="inline-block px-14 py-6 bg-white text-black font-black rounded-full uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] text-xs md:text-sm hover:bg-gray-200">
                Apply Now
              </a>
           </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2" onClick={() => setLightboxImage(null)}>
            <X size={32} />
          </button>
          <img src={lightboxImage} alt="Full screen" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
