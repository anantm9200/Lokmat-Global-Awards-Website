import { motion } from "motion/react";
import { Globe2, TrendingUp, Users } from "lucide-react";

export default function GlobalEconomicFootprintsSection() {
  const footprintStats = [
    {
      value: "7",
      label: "GLOBAL BUSINESS CITIES",
      description: "Singapore · Cairo · London · Dubai · Hong Kong · Baku · Port Louis",
      icon: Globe2,
      gradient: "from-red-500 via-orange-400 to-amber-300",
    },
    {
      value: "$5.3 Trillion+",
      label: "COMBINED HOST-ECONOMY GDP",
      description: "Powering International Trade & Investment Partnerships",
      icon: TrendingUp,
      gradient: "from-amber-400 via-orange-500 to-red-500",
    },
    {
      value: "207M+",
      label: "COMBINED POPULATION REACH",
      description: "Connecting High-Impact Global & Regional Demographics",
      icon: Users,
      gradient: "from-red-600 via-rose-500 to-amber-400",
    },
  ];

  return (
    <section className="bg-[#0b0c10] text-white pt-[30px] pb-[30px] md:py-10 relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full px-[3%] relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto mb-10 sm:mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-2"
          >
            <Globe2 className="w-3.5 h-3.5 text-red-400" />
            Strategic Global Presence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-white"
          >
            Global Economic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">
              Footprints
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          {footprintStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative bg-[#14151c] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-xl hover:border-red-500/40 transition-all duration-300"
              >
                {/* Accent top border gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-red-600/5 rounded-full blur-2xl group-hover:bg-red-600/15 transition-all duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-colors">
                      <Icon className="w-4 h-4 text-red-400" />
                    </div>
                  </div>

                  <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-1 whitespace-nowrap`}>
                    {stat.value}
                  </div>

                  <h3 className="stat-subtext text-white text-xs sm:text-sm font-bold uppercase tracking-widest leading-snug">
                    {stat.label}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
