import { motion } from "motion/react";

export default function ImpactSection() {
  const stats = [
    { 
      label: "Continents", 
      value: "3", 
      suffix: "Asia · Europe · Africa", 
      color: "from-red-500 to-orange-500" 
    },
    { 
      label: "Distinguished Awardees", 
      value: "400+", 
      suffix: "Recognised Across Editions", 
      color: "from-orange-500 to-yellow-400" 
    },
    { 
      label: "Global Attendees", 
      value: "2,000+", 
      suffix: "Leaders, Changemakers and Delegates", 
      color: "from-yellow-500 to-red-500" 
    },
  ];

  return (
    <section className="border-t border-gray-100 bg-white pt-[30px] pb-[30px] md:py-22 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-red-100 to-orange-100 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none" 
      />

      <div className="w-[100vw] px-[3%] my-0 md:my-[3%] lg:my-[3%] relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between">
          
          {/* Section Header */}
          <div className="w-full lg:w-[35%] pt-1">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between lg:h-[397px]"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
                <span className="block text-[#111111]">Impact by the</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 block mt-1.5 pr-2">Numbers</span>
              </h2>
              
              {/* Desktop-only placement of the body quote card (side-by-side with cards on lg+) */}
              <div className="hidden lg:block bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-2xl relative overflow-hidden my-4">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-orange-400" />
                <p className="text-sm md:text-base italic text-gray-600 leading-snug font-sans relative z-10 pl-2">
                  "Creating national impact through recognition, culture and meaningful conversations. Lokmat Experiences brings together influential voices, iconic platforms and high-impact events that set new benchmarks for credibility, scale and prestige."
                </p>
                {/* Quote mark decoration */}
                <span className="absolute -bottom-8 -right-4 text-8xl text-gray-50 font-serif font-black pointer-events-none select-none leading-none">"</span>
              </div>
            </motion.div>
          </div>

          {/* Numbers Cards Grid */}
          <div className="w-full lg:w-[61%] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 ml-auto">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col ${i === 1 ? 'lg:mt-8' : i === 2 ? 'lg:mt-16' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ 
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                      scale: { duration: 0.2 },
                    }}
                    className="flex flex-col items-start justify-start text-left sm:items-center sm:justify-center sm:text-center p-5 sm:p-7 md:p-8 bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl sm:rounded-[2rem] shadow-[0_12px_36px_rgba(0,0,0,0.035)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.07)] transition-shadow duration-300 relative overflow-hidden h-auto sm:h-[360px] lg:h-[397px]"
                  >
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 opacity-0 hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br ${stat.color} pointer-events-none`} />
                    
                    {/* Title */}
                    <span className="stat-subtext text-[#111111] text-xs sm:text-sm font-bold uppercase tracking-widest block mb-1.5 sm:mb-2 leading-snug relative z-10 text-left sm:text-center w-full">
                      {stat.label}
                    </span>

                    {/* Numbers */}
                    <h3 className={`text-4xl sm:text-[41px] md:text-[47px] lg:text-[54px] xl:text-[68px] font-black tracking-tighter my-1.5 sm:my-3 text-transparent bg-clip-text bg-gradient-to-br ${stat.color} relative z-10 text-left sm:text-center w-full`}>
                      {stat.value}
                    </h3>
                    
                    {/* Sub note paragraph */}
                    <div className="w-full relative z-10 mt-1 sm:mt-auto text-left sm:text-center">
                      <span className="font-sans text-[11px] sm:text-xs font-medium text-gray-600 bg-white/90 border border-gray-100 px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl inline-block shadow-sm max-w-full leading-snug text-left sm:text-center">
                        {stat.suffix}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Tablet & Mobile Placement: Body content in a card AFTER the numbers cards */}
          <div className="w-full block lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-7 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-orange-400" />
              <p className="text-sm sm:text-base italic text-gray-600 leading-relaxed font-sans relative z-10 pl-2">
                "Creating national impact through recognition, culture and meaningful conversations. Lokmat Experiences brings together influential voices, iconic platforms and high-impact events that set new benchmarks for credibility, scale and prestige."
              </p>
              {/* Quote mark decoration */}
              <span className="absolute -bottom-8 -right-4 text-8xl text-gray-50 font-serif font-black pointer-events-none select-none leading-none">"</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
