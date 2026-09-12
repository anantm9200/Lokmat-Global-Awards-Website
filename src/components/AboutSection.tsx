import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const aboutImg = "https://static.wixstatic.com/media/548938_b2dd1ed30f5f4454ae182a8598f0553e~mv2.jpg";
const fallbackImg = "https://static.wixstatic.com/media/548938_b2dd1ed30f5f4454ae182a8598f0553e~mv2.jpg";

interface AboutSectionProps {
  showButton?: boolean;
}

export default function AboutSection({ showButton = true }: AboutSectionProps) {
  const [imgSrc, setImgSrc] = useState(aboutImg);

  return (
    <section className="border-t border-gray-100 bg-[#FAFAFA] relative overflow-hidden pt-[30px] pb-[30px] md:py-20">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full mix-blend-multiply filter blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="w-full px-[3%]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-[55px] xl:gap-[71px] w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[40%] xl:w-[38%] pr-3 pb-3 lg:pr-4 lg:pb-4 flex-shrink-0"
          >
            <div className="relative aspect-[4/3] w-full group cursor-pointer">
              <div className="absolute inset-0 bg-red-600 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-[10px] transition-transform duration-500 ease-out group-hover:translate-x-5 group-hover:translate-y-5" />
              <img 
                src={imgSrc} 
                alt="About Lokmat Events" 
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImgSrc(fallbackImg)}
                className="absolute inset-0 w-full h-full object-cover rounded-[10px] group-hover:scale-105 transition-all duration-700 shadow-xl group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
              />
              {/* Overlay Text */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur border border-white/50 p-3 sm:p-4 rounded-[10px] shadow-xl transition-all duration-500 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-2.5 group-hover:shadow-2xl">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-red-600 mb-0.5 sm:mb-1">Since 1971</p>
                <p className="text-[#111111] font-medium text-xs sm:text-sm leading-snug group-hover:text-red-600 transition-colors duration-300">Pioneering Regional Journalism & Culture</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] xl:w-[56%] space-y-6"
          >
            <div>
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm mb-3 block">The Legacy</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
                <span className="block">Shaping <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Narratives</span></span>
                <span className="block">That Inspire the World</span>
              </h2>
            </div>
            
            <p className="text-base sm:text-lg xl:text-xl text-gray-600 leading-relaxed font-light">
              Lokmat GLOCON brings together influential leaders, creators, entrepreneurs, artists, policymakers, industry voices and changemakers through high-impact events, awards, summits and cultural platforms.
            </p>

            <p className="text-base sm:text-lg xl:text-xl text-gray-600 leading-relaxed font-light">
              Built on Lokmat’s trusted media legacy, every experience is designed to celebrate excellence, spark meaningful conversations, create national and international visibility and recognise the people and ideas shaping India’s future.
            </p>

            {showButton && (
              <div className="pt-2">
                <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-4 text-[#111111] hover:text-red-600 group transition-colors uppercase tracking-[0.2em] font-bold text-sm">
                  <span>Discover Our History</span>
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-red-600 transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
