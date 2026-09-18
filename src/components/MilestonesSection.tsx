import React from "react";
import { motion } from "motion/react";
import { Milestone } from "lucide-react";

export const milestones = [
  {
    year: "1971",
    title: "Founding Legacy",
    desc: "Inception of Lokmat as a primary publication, building the foundational trust and deep regional connection with millions.",
  },
  {
    year: "2010",
    title: "Lokmat Maharashtrian of the Year",
    desc: "Launched India's largest regional awards property, celebrating remarkable individuals across public service, science, art, and sport.",
  },
  {
    year: "2023",
    title: "International Debut in Dubai",
    desc: "The Lokmat International Awards debuted at Grand Hyatt, Dubai, celebrating cross-border excellence and international trade ties.",
  },
  {
    year: "2024",
    title: "Singapore Economic Convention & Baku",
    desc: "Evolved into global economic dialogue platforms at Shangri-La Hotel, Singapore and Flame Towers, Baku, convening high-level trade networks.",
  },
  {
    year: "2025",
    title: "London Savoy & Hong Kong Chapters",
    desc: "Hosted the prestigious Global Economic Convention at The Savoy, London, and strategic corridors in Hong Kong, recognizing Global Sakhis & Kohinoors.",
  },
  {
    year: "2026 & Beyond",
    title: "One World Vision & Cairo",
    desc: "Strengthened collaborative global leadership ties in Cairo, Egypt, paving the path for the upcoming highly anticipated Mauritius chapter.",
  }
];

export default function MilestonesSection() {
  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="w-full px-[3%]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Chronology of Impact</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
            Our Major <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Milestones</span>
          </h2>
          <p className="text-gray-500 font-light mt-4 text-base md:text-lg">
            The journey of a regional powerhouse evolving into a major orchestrator of global thought leadership.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line connector */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((m, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-white bg-red-600 shadow-md -translate-x-1/2 flex items-center justify-center z-10">
                    <Milestone className="w-3 h-3 text-white" />
                  </div>

                  {/* Content panel */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0">
                    <div className={`p-8 bg-white border border-gray-150 rounded-2xl shadow-sm hover:border-red-200 transition-all duration-300 ${
                      isLeft ? "md:text-right" : "md:text-left"
                    }`}>
                      <span className="inline-block px-3 py-1 bg-red-50 text-red-600 font-bold text-sm rounded-lg mb-4">
                        {m.year}
                      </span>
                      <h3 className="text-xl font-bold text-[#111111] mb-3">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>

                  {/* Empty side for layout spacing */}
                  <div className="hidden md:block w-[10%]"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
