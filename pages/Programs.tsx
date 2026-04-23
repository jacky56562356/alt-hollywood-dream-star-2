
import React, { useState } from 'react';
import { Layout, Video, Share2, Trophy, Award, Star, History as HistoryIcon, Sparkles, Clapperboard, Mic2, Users, Film, X, ZoomIn } from 'lucide-react';
import { HISTORY } from '../constants';

const FESTIVAL_IMAGES = [
  "https://i.ibb.co/1JdcHFK9/179b50bd376d8cfa82289e99501dac49-1.jpg",
  "https://i.ibb.co/tpMxQ0z3/93e11fe81b005b241daf7fe0ede317e1.jpg",
  "https://i.ibb.co/jZ8b7DQD/IMG-3304.jpg",
  "https://i.ibb.co/1Gj2K8CX/d92babf9ca9b15b9fe754beaa383a6cf.jpg",
  "https://i.ibb.co/5XPZYkgB/20260122155907-1672-151.jpg",
  "https://i.ibb.co/bMtVxnWT/20260301101021-372-10.jpg",
  "https://i.ibb.co/m7XVxC4/20260301100525-317-10.jpg",
  "https://i.ibb.co/67yDvWwf/20260301101011-369-10.jpg",
  "https://i.ibb.co/FLWhVFqW/20260326145512-455-10.jpg",
  "https://i.ibb.co/YB6gWM9L/20260326145435-449-10.jpg",
  "https://i.ibb.co/hxyLy7WK/20260326145502-453-10.jpg",
  "https://i.ibb.co/CsXTwYVB/789f8972a2a611f0a39472362ca9b9d2.jpg",
  "https://i.ibb.co/TqHKNcjx/1731693e1e0ea8102582bec61f0aed1d.jpg"
];

const MENTORSHIP_IMAGES = [
  "https://storage.googleapis.com/aistudio-janus-prod-appspot/image-3-20260323_192134.jpg",
  "https://storage.googleapis.com/aistudio-janus-prod-appspot/image-5-20260323_192134.jpg",
  "https://storage.googleapis.com/aistudio-janus-prod-appspot/image-1-20260323_192134.jpg",
  "https://storage.googleapis.com/aistudio-janus-prod-appspot/image-2-20260323_192134.jpg",
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581331474665-a0b6ed7174bc?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800"
];

const ProgramSection = ({ icon: Icon, title, items }: { icon: any, title: string, items: string[] }) => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-xl hover:border-brandCyan/30 transition-all group relative overflow-hidden h-full">
    <div className="w-8 h-8 brand-bg text-white rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-brandCyan/20">
      <Icon size={16} />
    </div>
    <h3 className="text-lg font-cinematic font-bold mb-3 tracking-tight group-hover:brand-gradient-text transition-all">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-3 text-brandGray text-xs md:text-sm font-medium">
          <div className="w-1 h-1 brand-bg rounded-full shrink-0"></div>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function Programs() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Split images for two rows
  const midPoint = Math.ceil(FESTIVAL_IMAGES.length / 2);
  const row1 = FESTIVAL_IMAGES.slice(0, midPoint);
  const row2 = FESTIVAL_IMAGES.slice(midPoint);

  // Duplicate arrays to ensure smooth infinite scrolling
  const scrollRow1 = [...row1, ...row1, ...row1, ...row1];
  const scrollRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Programs Header */}
        <div className="max-w-3xl mb-8">
          <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-2">Curriculum</h2>
          <h1 className="text-3xl md:text-5xl font-cinematic font-black mb-4 tracking-tight leading-tight">Professional Pathways</h1>
          <p className="text-brandGray text-sm md:text-base font-light leading-snug">Comprehensive integration of cinematic education and industry-standard workflows.</p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <ProgramSection 
            icon={Layout}
            title="Acting Mastery"
            items={["Acting Fundamentals", "Camera Performance", "Emotional Delivery", "On-Set Professionalism"]}
          />
          <ProgramSection 
            icon={Video}
            title="Film Production"
            items={["Script Development", "Role Selection & Rehearsals", "Professional Filming", "IMDb Post-Production Credits"]}
          />
          <ProgramSection 
            icon={Share2}
            title="Global Exposure"
            items={["Streaming Releases", "Film Festival Strategy", "Industry Showcases", "Professional Showreels"]}
          />
        </div>
      </div>

      {/* NEW: Hollywood Mentorship Program Section */}
      <div className="relative w-full py-12 mb-12 overflow-hidden bg-[#0a0a0a]">
         {/* Background Texture */}
         <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-brandBlack via-transparent to-brandBlack z-10"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            {/* Cinematic Header */}
            <div className="text-center mb-8">
               <div className="flex items-center justify-center gap-3 mb-2">
                 <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-400"></div>
                 <Star className="text-amber-400 fill-amber-400" size={10} />
                 <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-400"></div>
               </div>
               <h2 className="text-amber-100/80 text-[10px] font-black tracking-[0.5em] uppercase mb-2">The Elite Academy</h2>
               <h1 className="text-3xl md:text-5xl font-cinematic font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600 mb-2 drop-shadow-2xl tracking-tight">Hollywood Mentorship</h1>
               <p className="text-white/60 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed italic">
                 "Immersing students in the professional world of cinema, guided by industry directors."
               </p>
            </div>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-10">
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 bg-amber-900/10 shadow-[0_0_20px_rgba(251,191,36,0.2)] shrink-0">
                        <Clapperboard size={16} />
                     </div>
                     <div>
                        <h3 className="text-lg font-cinematic font-bold text-amber-100 mb-1">On-Set Immersion</h3>
                        <p className="text-white/70 text-xs md:text-sm leading-relaxed font-light">
                           Train on active soundstages with professional lighting and crews. Learn to hit marks and perform under real "Action!"
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 bg-amber-900/10 shadow-[0_0_20px_rgba(251,191,36,0.2)] shrink-0">
                        <Users size={16} />
                     </div>
                     <div>
                        <h3 className="text-lg font-cinematic font-bold text-amber-100 mb-1">Director-Led Coaching</h3>
                        <p className="text-white/70 text-xs md:text-sm leading-relaxed font-light">
                           Instruction from working Hollywood directors. Real-time direction on the nuances of a booked role.
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 bg-amber-900/10 shadow-[0_0_20px_rgba(251,191,36,0.2)] shrink-0">
                        <Film size={16} />
                     </div>
                     <div>
                        <h3 className="text-lg font-cinematic font-bold text-amber-100 mb-1">Official IMDb Credits</h3>
                        <p className="text-white/70 text-xs md:text-sm leading-relaxed font-light">
                           Legitimate productions. Graduate with a verified IMDb page and a professional reel.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Hero Image Collage */}
               <div className="relative">
                  <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full opacity-20"></div>
                  <div className="grid grid-cols-2 gap-3 relative">
                     <img referrerPolicy="no-referrer" src="https://i.ibb.co/Mxz5tV1h/20260122155855-1671-151.jpg" className="w-full h-40 object-cover rounded-xl border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-700" alt="Director mentoring student" loading="lazy" />
                     <img referrerPolicy="no-referrer" src="https://i.ibb.co/Z1kzfsbV/20260122155720-1660-151.jpg" className="w-full h-40 object-cover rounded-xl border border-white/10 shadow-2xl translate-y-4 hover:scale-105 transition-transform duration-700" alt="Camera crew" loading="lazy" />
                  </div>
               </div>
            </div>

            {/* Hollywood Veteran Training Gallery */}
            <div className="space-y-4 mb-12">
               <h3 className="text-center text-brandCyan/80 text-[12px] font-black uppercase tracking-[0.4em] mb-4">Hollywood Veteran Training</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "https://i.ibb.co/0ynzzbsf/20260122155834-1668-151.jpg",
                    "https://i.ibb.co/Q3gXL7Gt/20260122155814-1665-151.jpg",
                    "https://i.ibb.co/5W4kfjsB/intro-photo.jpg",
                    "https://i.ibb.co/0p2HWy3Z/filmmaking-in-classroom.jpg"
                  ].map((img, idx) => (
                     <div key={`train-${idx}`} className="aspect-[4/3] rounded-lg overflow-hidden border border-white/5 relative group cursor-pointer">
                        <img referrerPolicy="no-referrer" src={img} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Training" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                           <span className="text-[9px] text-brandCyan uppercase font-bold tracking-widest">Classroom</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* On-Set Production Gallery */}
            <div className="space-y-4">
               <h3 className="text-center text-amber-200/50 text-[12px] font-black uppercase tracking-[0.4em] mb-4">On-Set Production</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    "https://i.ibb.co/QvgYZ8fk/20250929162843-133-10.jpg",
                    "https://i.ibb.co/N24nbFRN/20250929162811-129-10.jpg",
                    "https://i.ibb.co/rfRcKg31/20250929162748-126-10.jpg",
                    "https://i.ibb.co/v6722zd0/20250929162853-135-10.jpg",
                    "https://i.ibb.co/ksvQBvsD/1-25-26-11-18-05-1.jpg",
                    "https://i.ibb.co/F45Tp6qP/20260122155828-1667-151.jpg",
                    "https://i.ibb.co/qLx5FzvQ/20260122155926-1673-151.jpg",
                    "https://i.ibb.co/6JTLb8tt/20260122155823-1666-151.jpg",
                    "https://i.ibb.co/Y4DfD2Vw/20260122155809-1664-151.jpg",
                    "https://i.ibb.co/LXS8q7yn/u8238228639-behind-the-scenes-photo-of-a-real-childrens-movie-5253418c-4b1d-4d9b-8f51-219cc38fdef7-3.png"
                  ].map((img, idx) => (
                     <div key={`onset-${idx}`} className="aspect-[4/3] rounded-lg overflow-hidden border border-white/5 relative group cursor-pointer">
                        <img referrerPolicy="no-referrer" src={img} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="On set" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                           <span className="text-[9px] text-amber-400 uppercase font-bold tracking-widest">On Set</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* New Section: Festival Success & Confidence */}
        <div className="mb-12 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
             <div>
                <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-2">Awards & Confidence</h2>
                <h1 className="text-3xl md:text-5xl font-cinematic font-black mb-4 tracking-tight leading-tight">The Power of Recognition</h1>
                <div className="space-y-3 text-brandGray text-sm md:text-base font-light leading-relaxed">
                  <p>
                    Students routinely participate in prestigious international film festivals, experiencing the tangible rewards of their dedication.
                  </p>
                  <p>
                    Standing on the podium and receiving accolades fuels their confidence, turning aspiring young performers into poised professionals.
                  </p>
                </div>
             </div>
             <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 brand-bg opacity-10 blur-3xl rounded-full"></div>
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 brand-bg rounded-full flex items-center justify-center text-white shadow-xl shadow-brandCyan/20">
                      <Trophy size={20} />
                   </div>
                   <div>
                      <p className="text-2xl font-cinematic font-black text-white">50+</p>
                      <p className="text-[10px] text-brandGray uppercase tracking-widest font-bold">International Awards</p>
                   </div>
                </div>
                <p className="italic text-brandGray text-xs md:text-sm leading-relaxed">"The awards are just the beginning; the self-belief they gain lasts a lifetime."</p>
             </div>
          </div>

          {/* Scrolling Image Rows - Fixed Height, Auto Width to prevent cropping */}
          <div className="relative mb-8 space-y-4 overflow-hidden py-4">
             
             {/* Gradient Masks */}
             <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-brandBlack to-transparent z-10 pointer-events-none"></div>
             <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-brandBlack to-transparent z-10 pointer-events-none"></div>

             {/* Row 1: Scrolling Left */}
             <div className="flex animate-scroll hover:pause-animation gap-4 w-max">
                {scrollRow1.map((src, i) => (
                   <div 
                      key={`r1-${i}`} 
                      className="group relative h-48 md:h-64 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 cursor-pointer bg-brandBlack"
                      onClick={() => setSelectedImage(src)}
                   >
                      <img referrerPolicy="no-referrer" 
                        src={src} 
                        className="h-full w-auto max-w-none object-contain transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                        alt="Festival Award Moment" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-brandBlack/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                             <ZoomIn size={18} />
                          </div>
                      </div>
                   </div>
                ))}
             </div>

             {/* Row 2: Scrolling Right */}
             <div className="flex animate-scroll hover:pause-animation gap-4 w-max" style={{ animationDirection: 'reverse' }}>
                {scrollRow2.map((src, i) => (
                   <div 
                      key={`r2-${i}`} 
                      className="group relative h-48 md:h-64 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 cursor-pointer bg-brandBlack"
                      onClick={() => setSelectedImage(src)}
                   >
                      <img referrerPolicy="no-referrer" 
                        src={src} 
                        className="h-full w-auto max-w-none object-contain transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                        alt="Festival Award Moment" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-brandBlack/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                             <ZoomIn size={18} />
                          </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 opacity-40">
             <div className="flex items-center gap-4 w-full max-w-md">
                <div className="h-px bg-gradient-to-r from-transparent via-brandCyan to-transparent flex-1"></div>
                <div className="flex gap-2 text-brandCyan">
                   <Sparkles size={10} />
                   <Star size={12} fill="currentColor" />
                   <Sparkles size={10} />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-brandPurple to-transparent flex-1"></div>
             </div>
             <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brandGray">Excellence in Motion</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

        {/* History Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-1">Our Evolution</h2>
            <h1 className="text-3xl md:text-5xl font-cinematic font-black tracking-tight">7 Years of Excellence</h1>
            <p className="text-brandGray text-sm mt-1 max-w-2xl mx-auto leading-relaxed">From Los Angeles foundation to premier youth film platform.</p>
          </div>

          <div className="relative border-l-2 border-brandCyan/30 ml-4 md:ml-0 md:left-1/2">
            {HISTORY.map((item, index) => (
              <div key={index} className={`relative mb-6 md:w-1/2 ${index % 2 === 0 ? 'md:left-[-50%] md:pr-8 md:text-right' : 'md:left-0 md:pl-8'}`}>
                {/* Timeline Dot */}
                <div className={`absolute top-0 w-3 h-3 brand-bg rounded-full border-2 border-brandBlack shadow-[0_0_15px_rgba(0,210,255,0.6)] ${index % 2 === 0 ? '-left-[7px] md:left-auto md:-right-[7px]' : '-left-[7px]'}`}></div>
                
                <div className={`animate-in fade-in slide-in-from-bottom duration-1000 group pl-4 md:pl-0`}>
                   {/* Image Card - Reduced Size */}
                   <div className={`w-3/4 md:w-[60%] aspect-video rounded-xl overflow-hidden border border-white/10 mb-3 relative shadow-lg ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      {item.imageUrl && (
                        <img referrerPolicy="no-referrer" 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brandBlack/80 via-transparent to-transparent"></div>
                      <div className={`absolute bottom-2 ${index % 2 === 0 ? 'right-2' : 'left-2'}`}>
                        <span className="px-2 py-0.5 brand-bg text-white text-[9px] font-black uppercase tracking-widest rounded-full">Year {index + 1}</span>
                      </div>
                   </div>

                   {/* Content */}
                  <span className="text-base font-cinematic font-black brand-gradient-text block mb-1 tracking-wider">{item.year}</span>
                  <h3 className="text-sm font-bold text-white mb-1 tracking-wide">{item.title}</h3>
                  <p className="text-brandGray leading-snug text-xs md:text-sm font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX OVERLAY */}
      {selectedImage && (
        <div 
           className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
           onClick={() => setSelectedImage(null)}
        >
          <button 
             className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
          >
             <X size={20} />
          </button>
          
          <div className="max-w-[90vw] max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
             <img referrerPolicy="no-referrer" 
               src={selectedImage} 
               className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10" 
               alt="Enlarged view" 
             />
             <div className="absolute -bottom-10 left-0 w-full text-center">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Tap anywhere to close</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
