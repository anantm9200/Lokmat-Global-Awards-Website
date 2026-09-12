import React, { useState } from "react";
import { motion } from "motion/react";
import logoImg from "@/src/assets/images/regenerated_image_1781776475830.png";
import {
  Sparkles,
  Building2,
  Award,
  Users,
  Globe
} from "lucide-react";

export default function AboutBrandSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(0);

  const numericalCards = [
    {
      id: "hubs",
      number: "7",
      title: "Business Hubs",
      icon: Building2
    },
    {
      id: "awardees",
      number: "400+",
      title: "Awardees",
      icon: Award
    },
    {
      id: "attendees",
      number: "2000+",
      title: "Global Attendees",
      icon: Users
    },
    {
      id: "continents",
      number: "3",
      title: "Continents",
      icon: Globe
    }
  ];

  return (
    <section className="w-full px-[3%] pt-[30px] pb-[30px] md:my-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full rounded-3xl bg-white text-[#111111] p-8 sm:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200/80 relative overflow-hidden"
      >
        {/* Top Brand Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500" />

        {/* Ambient Subtle Warm Corner Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Badge & Brand Title with Logo & Est. Pill */}
        <div className="relative z-10 mb-10 pb-8 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 font-bold text-xs uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-red-600" /> About The Brand
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
              Lokmat <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Media Group</span>
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-red-600 mt-2">
              Legacy of Excellence & Impact
            </p>
          </div>

          {/* Lokmat Logo & Year of Establishment Card/Pill */}
          <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#FAFAFA] border border-gray-200/80 shadow-sm self-start md:self-auto hover:border-red-200 hover:shadow-md transition-all">
            <img 
              src={logoImg} 
              alt="Lokmat Logo" 
              className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply"
            />
            <div className="h-7 w-px bg-gray-200" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 leading-none">Est.</span>
              <span className="text-sm sm:text-base font-bold text-[#111111] tracking-tight leading-tight mt-0.5">1971</span>
            </div>
          </div>
        </div>

        {/* Narrative Paragraphs - full width stretched to right edge of cards */}
        <div className="relative z-10 mb-12 space-y-5 w-full">
          <p className="text-gray-700 font-light text-base sm:text-lg leading-relaxed">
            <strong className="text-[#111111] font-bold">Lokmat Media Pvt. Ltd.</strong> is a leading media company with interests in a diversified portfolio of publishing, broadcast, digital, entertainment and community. It has an employee strength of more than 3,000 and has a PAN-India network of offices.
          </p>
          <p className="text-gray-700 font-light text-base sm:text-lg leading-relaxed">
            Lokmat Media Group publishes India's No.1 Marathi daily <span className="text-[#111111] font-semibold">‘Lokmat’</span>, along with <span className="text-[#111111] font-semibold">‘Lokmat Samachar’</span> and <span className="text-[#111111] font-semibold">‘Lokmat Times’</span>, with a combined readership of 2.56 Cr (source: All India, Total Readership, IRS 2019, Q4). Keeping abreast with the changing digital landscape, Lokmat Group makes its content available for its readers through its multilingual news portals and mobile news app.
          </p>
          <p className="text-gray-700 font-light text-base sm:text-lg leading-relaxed">
            Lokmat entered the TV space in 2008 and it co-owns a 24-hour news and current affairs channel <span className="text-[#111111] font-semibold">‘News18 Lokmat’</span> (formerly known as IBN Lokmat), through a JV with the Network18 Group.
          </p>
          <p className="text-gray-700 font-light text-base sm:text-lg leading-relaxed">
            Lokmat’s experiential marketing division – <span className="text-[#111111] font-semibold">‘Taplight’</span> organizes various annual properties like <span className="text-[#111111] font-semibold">‘Lokmat Maharashtrian of the Year’</span>, <span className="text-[#111111] font-semibold">‘Lokmat Most Stylish’</span>, <span className="text-[#111111] font-semibold">‘Lokmat DIA’</span>, <span className="text-[#111111] font-semibold">‘Lokmat Infra Conclave’</span>, <span className="text-[#111111] font-semibold">'Lokmat Maha Marathon'</span>, <span className="text-[#111111] font-semibold">‘Lokmat Women Summit’</span> etc., which are the benchmarks in their respective categories. It also provides comprehensive 360-degree marketing solutions to clients including ‘BTL’ promotions and client-led activations. It is the largest event management company in Maharashtra in terms of the number of events held. This division also runs various community forums focused on Women, Youth and Children.
          </p>
        </div>

        {/* Numerical Cards Grid */}
        <div className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {numericalCards.map((card, idx) => {
              const Icon = card.icon;
              const isHovered = hoveredCard === idx;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(idx)}
                  className={`relative p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default group ${
                    isHovered
                      ? "bg-white border-red-200 shadow-xl shadow-red-600/5 -translate-y-1"
                      : "bg-[#FAFAFA] border-gray-200/80 hover:bg-white hover:border-red-200 hover:shadow-lg"
                  }`}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 mb-6 ${
                        isHovered
                          ? "bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-md shadow-red-600/20 scale-105"
                          : "bg-red-50 border border-red-100 text-red-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight mb-2 group-hover:text-red-600 transition-colors duration-300">
                        {card.number}
                      </div>

                      <h3 className="stat-subtext text-sm sm:text-base font-bold text-gray-600 uppercase tracking-wider group-hover:text-[#111111] transition-colors duration-300">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
