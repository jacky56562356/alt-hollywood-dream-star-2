
import React from 'react';
import { HISTORY } from '../constants';

export default function History() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="brand-gradient-text text-sm font-black tracking-[0.4em] uppercase mb-4 text-center">Our Evolution</h2>
        <h1 className="text-5xl font-cinematic font-black mb-12 text-center tracking-tight">7 Years of Legacy</h1>

        <div className="relative border-l-2 border-brandCyan/30 ml-4 md:ml-0 md:left-1/2">
          {HISTORY.map((item, index) => (
            <div key={index} className={`relative mb-8 md:w-1/2 ${index % 2 === 0 ? 'md:left-[-50%] md:pr-6 md:text-right' : 'md:left-0 md:pl-6'}`}>
              <div className={`absolute top-0 w-4 h-4 brand-bg rounded-full border-2 border-brandBlack shadow-[0_0_15px_rgba(0,210,255,0.6)] ${index % 2 === 0 ? '-left-[9px] md:left-auto md:-right-[9px]' : '-left-[9px]'}`}></div>
              <div className="group">
                {/* Image Component - Smaller (md:w-[50%]) */}
                {item.imageUrl && (
                   <div className={`w-3/4 md:w-[50%] aspect-video rounded-xl overflow-hidden border border-white/10 mb-3 relative shadow-lg ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      <img referrerPolicy="no-referrer" 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brandBlack/60 to-transparent"></div>
                   </div>
                )}
                
                <div>
                  <span className="text-xl font-cinematic font-black brand-gradient-text block mb-1 tracking-wider">{item.year}</span>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{item.title}</h3>
                  <p className="text-brandGray leading-relaxed text-sm font-light">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
