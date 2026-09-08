import React, { useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import EventCard from "@/src/components/EventCard";
import { useEvents } from "@/src/hooks/useEvents";
import { motion } from "motion/react";
import { Globe2, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";

export default function LOWS() {
  const { events, loading } = useEvents();

  useEffect(() => {
    document.title = "Lokmat One World Summit & Awards (LOWS&A) | Lokmat Events";
    window.scrollTo(0, 0);
  }, []);

  // Filter events corresponding to LOWS (Dubai, Baku, Hong Kong & Macau, Cairo/Egypt, Mauritius)
  const lowsEvents = events.filter((e) => 
    e.id === "mauritius-2026" ||
    e.id === "cairo-2026" ||
    e.id === "hong-kong-macau-2025" || 
    e.id === "baku-2024" || 
    e.id === "dubai-2023" || 
    e.title.toLowerCase().includes("one world") ||
    e.category.toLowerCase().includes("summit")
  );

  const corePillars = [
    {
      icon: Globe2,
      title: "One World Philosophy",
      description: "Uniting global leaders across borders and industries under a shared vision."
    },
    {
      icon: Sparkles,
      title: "Innovation Exchange",
      description: "Bringing together visionaries in tech, governance, and sustainability."
    },
    {
      icon: HeartHandshake,
      title: "Cultural Diplomacy",
      description: "Blending Indian leadership recognition with international civilizational heritage."
    },
    {
      icon: ShieldCheck,
      title: "Global Progress",
      description: "Addressing global challenges and social impact collectively."
    }
  ];

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full pt-[143px] pb-20 md:pt-[179px] md:pb-28 relative">
        {/* Hero Section */}
        <section className="w-full px-[3%] mb-10 md:mb-14">
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 max-w-7xl text-left"
            >
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase bg-red-50 text-red-600 border border-red-100 mb-4">
                LOWS&A
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-extrabold tracking-tight mb-4 text-[#111111] whitespace-nowrap">
                Lokmat One World Summit & Awards
              </h1>
              <div className="space-y-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-[95%]">
                <p>
                  The Lokmat One World Summit & Awards brings together changemakers, entrepreneurs, innovators, policymakers, business leaders and thought leaders from different sectors and geographies.
                </p>
                <p>
                  Each edition explores business, innovation, leadership, economics, social impact and culture through summit sessions, panels, networking and cultural exchange. The awards recognise individuals whose influence extends beyond their organisations or industries.
                </p>
                <p>
                  Across Dubai, Hong Kong, Baku, Cairo, and Mauritius, the core idea remains unchanged - different countries, industries and perspectives united on one platform for people creating change.
                </p>
              </div>
            </motion.div>

            {/* Right Logo Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-shrink-0 w-44 h-44 sm:w-52 sm:h-52 md:w-68 md:h-68 lg:w-[270px] lg:h-[270px] rounded-2xl bg-white border border-gray-100 shadow-sm p-4 sm:p-6 flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://static.wixstatic.com/media/548938_f3138e1501f74aa0a17aeb8ff15034cf~mv2.jpg"
                alt="Lokmat One World Summit Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </section>

        {/* Editions & Cards Section */}
        <section className="w-full px-[3%] mb-16">
          <div className="mb-8">
            <span className="text-red-600 font-bold tracking-[0.25em] uppercase text-xs block mb-1">Chapters</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
              Summit <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Editions</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-8 h-8 border-3 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {lowsEvents.map((event, idx) => (
                <EventCard key={event.id} event={event} index={idx} hideLocationYear={true} />
              ))}
            </div>
          )}
        </section>

        {/* Minimal Pillars Section */}
        <section className="w-full px-[3%]">
          <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {corePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="flex flex-col items-start space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-1">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#111111]">{pillar.title}</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
