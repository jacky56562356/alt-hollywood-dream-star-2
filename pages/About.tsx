
import React from 'react';
import { Target, Users2, Rocket, Building2, Award, Clapperboard, Star, CheckCircle, Network, Briefcase, Megaphone, Gem, ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 items-center">
          <div>
            <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-2">About the Institution</h2>
            <h1 className="text-3xl md:text-5xl font-cinematic font-black mb-6 tracking-tight leading-tight">Hollywood Standard. Youth Spirit.</h1>
            
            <div className="space-y-4 text-sm md:text-base text-brandGray leading-relaxed font-light">
              <p>
                ALT HOLLYWOOD DREAM STAR was founded in the heart of Los Angeles with a single, uncompromising vision: to revolutionize youth acting training by placing it firmly within the context of professional film production.
              </p>
              <p>
                We identified a critical gap in the industry—where traditional acting schools focused solely on classroom exercises, the professional world demanded set experience. ALT was built to bridge that gap.
              </p>
              <div className="p-5 border-l-4 border-brandCyan bg-brandCyan/5 italic text-white/90 rounded-r-xl text-sm leading-relaxed mt-4">
                "Our philosophy is simple: True growth happens under the lights. We provide the platform to turn potential into a career."
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
             <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-[3/4] shadow-xl shadow-brandCyan/10 w-full max-w-[300px] md:max-w-[400px]">
                <img referrerPolicy="no-referrer" 
                  src="https://i.ibb.co/ycRFxBZ4/Chat-GPT-Image-2026-3-23-12-23-04.png" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Young performers on set"
                  loading="lazy"
                />
                <div className="absolute inset-0 brand-bg opacity-[0.05] mix-blend-overlay"></div>
             </div>
             {/* Decorative backing element */}
             <div className="absolute top-2 -right-2 w-full max-w-[300px] md:max-w-[400px] h-full border border-white/5 rounded-2xl -z-10 hidden md:block"></div>
          </div>
        </div>

        {/* NEW IMAGE GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-16">
           <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden border border-white/10">
              <img referrerPolicy="no-referrer" src="https://i.ibb.co/8DDg94mN/professional-camera-man-at-work-2022-02-09-18-59-44-utc.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Professional Camera Man" loading="lazy" />
           </div>
           <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden border border-white/10">
              <img referrerPolicy="no-referrer" src="https://i.ibb.co/gZhJvX2t/blog-1.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Blog 1" loading="lazy" />
           </div>
           <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden border border-white/10">
              <img referrerPolicy="no-referrer" src="https://i.ibb.co/tM4zj1Zt/blog-3.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Blog 3" loading="lazy" />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Card 1 */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brandCyan/40 transition-all">
            <div className="h-40 overflow-hidden relative">
                <img referrerPolicy="no-referrer" 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Professional Excellence"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brandBlack/40 group-hover:bg-transparent transition-all"></div>
                <div className="absolute bottom-3 left-4 w-8 h-8 brand-bg text-white rounded-lg flex items-center justify-center shadow-lg shadow-brandCyan/20 z-10">
                  <Award size={18} />
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-cinematic font-black mb-1 group-hover:brand-gradient-text transition-colors">Professional Excellence</h3>
                <p className="text-brandGray text-xs md:text-sm leading-snug">Adhering to major Hollywood production standards.</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brandCyan/40 transition-all">
            <div className="h-40 overflow-hidden relative">
                <img referrerPolicy="no-referrer" 
                  src="https://images.unsplash.com/photo-1581331474665-a0b6ed7174bc?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Production Hub"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brandBlack/40 group-hover:bg-transparent transition-all"></div>
                <div className="absolute bottom-3 left-4 w-8 h-8 brand-bg text-white rounded-lg flex items-center justify-center shadow-lg shadow-brandCyan/20 z-10">
                  <Clapperboard size={18} />
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-cinematic font-black mb-1 group-hover:brand-gradient-text transition-colors">Production Hub</h3>
                <p className="text-brandGray text-xs md:text-sm leading-snug">Scriptwriting, role selection, and filming under one roof.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brandCyan/40 transition-all">
            <div className="h-40 overflow-hidden relative">
                <img referrerPolicy="no-referrer" 
                  src="https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Artistic Development"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brandBlack/40 group-hover:bg-transparent transition-all"></div>
                <div className="absolute bottom-3 left-4 w-8 h-8 brand-bg text-white rounded-lg flex items-center justify-center shadow-lg shadow-brandCyan/20 z-10">
                  <Star size={18} />
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-cinematic font-black mb-1 group-hover:brand-gradient-text transition-colors">Artistic Development</h3>
                <p className="text-brandGray text-xs md:text-sm leading-snug">Developing discipline, portfolios, and networking.</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Career Accelerator */}
      <section className="py-12 my-12 relative border-y border-white/5 bg-white/[0.02] overflow-hidden">
         {/* Decorative Background */}
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         <div className="absolute -left-20 top-20 w-72 h-72 brand-bg blur-[100px] opacity-20 rounded-full"></div>
         <div className="absolute -right-20 bottom-20 w-72 h-72 bg-amber-500 blur-[100px] opacity-10 rounded-full"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
               <h2 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase mb-4">Youth Performance Training & Film Production</h2>
               <h1 className="text-4xl md:text-6xl font-cinematic font-black mb-6 tracking-tight text-white">
                  The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandCyan to-brandPurple">Creative Launchpad</span>
               </h1>
               <div className="text-brandGray max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-light space-y-4">
                  <p>
                    We are a leading institution dedicated to the artistic development of youth and children through professional performance training. Our systematic curriculum ensures that every student moves beyond theory to participate in real, self-produced film productions.
                  </p>
                  <p>
                    These original works are submitted to international film festivals, providing a prestigious platform to showcase our students' emerging skills. By immersing young performers in authentic filmmaking, we ignite their creative vitality and provide profound artistic experiences that enrich their youth.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card 1: Festival Recognition */}
               <div className="group relative p-6 rounded-3xl border border-white/10 bg-brandBlack overflow-hidden hover:border-brandCyan/50 transition-all duration-500 min-h-[350px] flex flex-col justify-end">
                  {/* Background Image: Professional Recognition - Clearer */}
                <div className="absolute inset-0 z-0">
                    <img referrerPolicy="no-referrer" 
                        src="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&q=80&w=800" 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-110"
                        alt="Film Festival Recognition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/80 to-transparent"></div>
                </div>
                  
                  <div className="relative z-10">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity -mt-32">
                         <Network size={80} />
                      </div>
                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brandCyan/20 to-blue-600/20 border border-brandCyan/30 flex items-center justify-center text-brandCyan mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                         <Award size={24} />
                      </div>
                      <h3 className="text-xl font-cinematic font-bold text-white mb-3">Festival Recognition</h3>
                      <p className="text-brandGray text-xs md:text-sm leading-relaxed mb-6 font-medium">
                         Our self-produced films are submitted to major international film festivals, giving our students a global platform to showcase their skills.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brandCyan group-hover:translate-x-2 transition-transform">
                         <span>Global Exposure</span> <ArrowUpRight size={14} />
                      </div>
                  </div>
               </div>

               {/* Card 2: Major Studios */}
               <div className="group relative p-6 rounded-3xl border border-white/10 bg-brandBlack overflow-hidden hover:border-brandPurple/50 transition-all duration-500 min-h-[350px] flex flex-col justify-end">
                   {/* Background Image: Professional Camera/Film Set - Clearer */}
                  <div className="absolute inset-0 z-0">
                    <img referrerPolicy="no-referrer" 
                        src="https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800" 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-110"
                        alt="Professional Film Production"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/80 to-transparent"></div>
                  </div>
                  
                  <div className="relative z-10">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity -mt-32">
                         <Clapperboard size={80} />
                      </div>
                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brandPurple/20 to-pink-600/20 border border-brandPurple/30 flex items-center justify-center text-brandPurple mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(112,0,255,0.3)]">
                         <Clapperboard size={24} />
                      </div>
                      <h3 className="text-xl font-cinematic font-bold text-white mb-3">Professional Production</h3>
                      <p className="text-brandGray text-xs md:text-sm leading-relaxed mb-6 font-medium">
                         Every student participates in professional-grade filmmaking. We create original content that highlights individual performance and technical excellence.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brandPurple group-hover:translate-x-2 transition-transform">
                         <span>Real Set Experience</span> <ArrowUpRight size={14} />
                      </div>
                  </div>
               </div>

               {/* Card 3: Job Opportunities */}
               <div className="group relative p-6 rounded-3xl border border-white/10 bg-brandBlack overflow-hidden hover:border-amber-500/50 transition-all duration-500 min-h-[350px] flex flex-col justify-end">
                  {/* Background Image: Audition/Spotlight/Performance - Clearer */}
                  <div className="absolute inset-0 z-0">
                    <img referrerPolicy="no-referrer" 
                        src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800" 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-110"
                        alt="Artistic Performance"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/80 to-transparent"></div>
                  </div>
                  
                  <div className="relative z-10">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity -mt-32">
                         <Gem size={80} />
                      </div>
                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                         <Star size={24} />
                      </div>
                      <h3 className="text-xl font-cinematic font-bold text-white mb-3">Artistic Experience</h3>
                      <p className="text-brandGray text-xs md:text-sm leading-relaxed mb-6 font-medium">
                         We empower children with creative vitality. Through real filmmaking, they gain profound artistic experiences that define their youth and build confidence.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 group-hover:translate-x-2 transition-transform">
                         <span>Creative Growth</span> <ArrowUpRight size={14} />
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border-t border-white/10 pt-12">
           <div>
              <h2 className="text-2xl font-cinematic font-black mb-3">Our Commitment</h2>
              <p className="text-brandGray text-sm md:text-base leading-relaxed mb-6 font-light">
                At ALT, we believe every child has a unique star power. Our professional faculty works tirelessly to tailor education to each individual actor's strengths.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                   <CheckCircle className="text-brandCyan" size={16} />
                   <span className="text-xs md:text-sm font-bold">15+ Annual Professional Productions</span>
                </div>
                <div className="flex gap-3 items-center">
                   <CheckCircle className="text-brandCyan" size={16} />
                   <span className="text-xs md:text-sm font-bold">100% Student Participation in On-Set Projects</span>
                </div>
                <div className="flex gap-3 items-center">
                   <CheckCircle className="text-brandCyan" size={16} />
                   <span className="text-xs md:text-sm font-bold">Direct Access to Global Streaming Markets</span>
                </div>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <img referrerPolicy="no-referrer" src="https://i.ibb.co/gZhJvX2t/blog-1.jpg" className="rounded-xl border border-white/10 h-32 w-full object-cover" alt="On set production" loading="lazy" />
              <img referrerPolicy="no-referrer" src="https://i.ibb.co/tM4zj1Zt/blog-3.jpg" className="rounded-xl border border-white/10 mt-6 h-32 w-full object-cover" alt="Film set" loading="lazy" />
           </div>
        </div>
      </div>
    </div>
  );
}
