import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

export default function PartnersCtaSection() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      <section className="pt-[30px] pb-[30px] md:py-16 bg-[#FAFAFA] border-t border-gray-200">
        <div className="w-[100vw] px-[3%]">
          <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_auto] animate-gradient p-8 sm:p-10 md:p-16 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(220,38,38,0.5)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-9 md:gap-12 text-white border border-white/20">
            
            {/* subtle background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-5 sm:space-y-6 relative z-10 text-left"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight text-white text-left">
                <span className="block sm:inline">Create Your Next </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white drop-shadow-sm pr-2 block sm:inline">Big Moment</span>
              </h2>
              <p className="text-white/90 text-base sm:text-lg max-w-3xl font-medium leading-relaxed text-left">
                Explore Lokmat’s prestigious events, awards and leadership platforms. Connect with influential audiences, gain trusted media visibility and discover opportunities designed to strengthen your brand’s national and global presence.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 flex flex-col sm:flex-row gap-4 items-start self-start pt-1 sm:pt-0"
            >
              <button 
                onClick={() => setIsEnquiryOpen(true)}
                className="bg-white text-red-600 px-8 py-4.5 sm:px-8 sm:py-5 font-bold uppercase tracking-widest text-sm hover:bg-gray-50 hover:scale-105 transition-all duration-300 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl group cursor-pointer text-left self-start"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
      />
    </>
  );
}
