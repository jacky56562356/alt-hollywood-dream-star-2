
import React from 'react';
import { Mail, MapPin, Phone, Info } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="brand-gradient-text text-sm font-black tracking-[0.4em] uppercase mb-6">Connect</h2>
            <h1 className="text-6xl font-cinematic font-black mb-12 tracking-tight">Get In Touch</h1>
            
            <div className="space-y-10 mb-12">
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brandCyan group-hover:brand-bg group-hover:text-white transition-all shrink-0 shadow-lg border border-white/5">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 tracking-wide">Headquarters</h4>
                  <p className="text-brandGray font-light">633 W 5th St, Los Angeles, CA 90071, USA</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brandCyan group-hover:brand-bg group-hover:text-white transition-all shrink-0 shadow-lg border border-white/5">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 tracking-wide">Branch Office</h4>
                  <p className="text-brandGray font-light">17800 Castleton St, Suite 173, City of Industry, CA 91748, USA</p>
                </div>
              </div>
              
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brandCyan group-hover:brand-bg group-hover:text-white transition-all shrink-0 shadow-lg border border-white/5">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 tracking-wide">Email Address</h4>
                  <p className="text-brandGray font-light">altdreamstar@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brandCyan group-hover:brand-bg group-hover:text-white transition-all shrink-0 shadow-lg border border-white/5">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 tracking-wide">Industry Hotline</h4>
                  <p className="text-brandGray font-light">+1 (323) 918-6688</p>
                </div>
              </div>
            </div>

            <div className="p-10 border border-brandCyan/20 rounded-2xl bg-brandCyan/5 relative">
              <div className="flex items-center gap-4 text-brandCyan mb-6">
                <Info size={24} />
                <h4 className="font-black uppercase tracking-[0.2em] text-xs">Registration Notice</h4>
              </div>
              <p className="text-sm text-brandGray leading-relaxed font-light">
                All student applicants are reviewed by our professional production board. Participation is strictly subject to specific project requirements and current ensemble availability. We strongly recommend submitting high-quality media links for faster review.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative group">
               <img referrerPolicy="no-referrer" 
                 src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=800" 
                 className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                 alt="Los Angeles Map"
               />
               <div className="absolute inset-0 brand-bg opacity-[0.05]"></div>
               <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="p-10 bg-brandBlack/90 border border-brandCyan/40 text-center rounded-2xl backdrop-blur-sm shadow-2xl">
                    <p className="text-[10px] brand-gradient-text font-black mb-2 tracking-[0.3em] uppercase">Headquarters</p>
                    <p className="text-4xl font-cinematic font-black tracking-tight">Los Angeles</p>
                    <div className="w-12 h-0.5 brand-bg mx-auto mt-6"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
