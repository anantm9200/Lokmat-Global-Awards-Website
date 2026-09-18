import React from "react";
import { Globe } from "lucide-react";

export default function GlobalMapSection() {
  return (
    <section className="pt-[30px] pb-[30px] md:py-16 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="w-full px-[3%]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold text-xs uppercase tracking-widest mb-3">
            <Globe className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>International Footprint</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111]">
            Global Presence
          </h2>
          <p className="text-gray-500 font-light mt-3 text-base md:text-lg">
            Connecting key economic corridors and thought leaders across Asia, Europe, and Africa.
          </p>
        </div>

        {/* Clean Static Map Container with 5% Zoom In Effect */}
        <div 
          className="relative w-full rounded-3xl p-2 sm:p-4 md:p-6 shadow-2xl overflow-hidden flex items-center justify-center select-none border border-gray-800/80 bg-[#070809] group cursor-pointer"
        >
          <img
            src="https://static.wixstatic.com/media/548938_53e417d96eba4f72bc1c94919146d3e3~mv2.png"
            alt="Lokmat Global Presence & International Footprint Map"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[760px] object-contain transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.05]"
          />
        </div>

      </div>
    </section>
  );
}
