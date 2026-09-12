import React, { useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import EventCard from "@/src/components/EventCard";
import { useEvents } from "@/src/hooks/useEvents";
import { motion } from "motion/react";
import { Globe, TrendingUp, Building2, Award } from "lucide-react";

export default function LGEC() {
  const { events, loading } = useEvents();

  useEffect(() => {
    document.title = "Lokmat Global Economic Convention (LGEC) | Lokmat Events";
    window.scrollTo(0, 0);
  }, []);

  // Filter events corresponding to LGEC (Singapore & London)
  const lgecEvents = events.filter((e) => 
    e.title.toLowerCase().includes("economic convention") ||
    e.id === "1" || 
    e.id === "singapore-2024" || 
    e.id === "london-2025"
  );

  const pillars = [
    {
      icon: Globe,
      title: "Global Footprint",
      description: "Connecting Indian economic leadership with international trade corridors."
    },
    {
      icon: TrendingUp,
      title: "Strategic Dialogue",
      description: "Convening policymakers, industrial leaders, and investors."
    },
    {
      icon: Building2,
      title: "Industry Alliances",
      description: "Fostering trade partnerships across global financial hubs."
    },
    {
      icon: Award,
      title: "Prestigious Honors",
      description: "Recognizing pioneering achievers on international stages."
    }
  ];

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full pt-[143px] pb-[30px] md:pt-[179px] md:pb-28 relative">
        {/* Hero Section */}
        <section className="w-full px-[3%] mb-[60px] md:mb-14">
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 max-w-7xl text-left"
            >
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase bg-red-50 text-red-600 border border-red-100 mb-4">
                LGEC
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-extrabold tracking-tight mb-4 text-[#111111] whitespace-normal sm:whitespace-nowrap leading-tight sm:leading-none">
                <span className="block sm:inline">Lokmat Global </span>
                <span className="block sm:inline">Economic Convention</span>
              </h1>

              {/* Mobile Logo Display: Pill -> Title -> Logo -> Content */}
              <div className="block md:hidden my-5">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-white border border-gray-100 shadow-sm p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/548938_1fd265b8996d407995b8147541858509~mv2.jpg"
                    alt="Lokmat Global Economic Convention Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-[95%]">
                <p>
                  LGEC is Lokmat’s international business and economic platform, taking conversations on India, global markets, enterprise and leadership beyond national borders. It brings together policymakers, business leaders, entrepreneurs, investors, innovators and cultural voices to exchange perspectives and explore opportunities across markets.
                </p>
                <p>
                  Through keynotes, panels, leadership conversations, networking and awards, LGEC examines economic trends, entrepreneurship, innovation, policy and international business. From Singapore to London, each edition connects India with the world and brings together those shaping tomorrow’s economy.
                </p>
              </div>
            </motion.div>

            {/* Right Logo Display (Desktop / Tablet) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex flex-shrink-0 w-52 h-52 md:w-68 md:h-68 lg:w-[270px] lg:h-[270px] rounded-2xl bg-white border border-gray-100 shadow-sm p-4 sm:p-6 items-center justify-center overflow-hidden"
            >
              <img
                src="https://static.wixstatic.com/media/548938_1fd265b8996d407995b8147541858509~mv2.jpg"
                alt="Lokmat Global Economic Convention Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </section>

        {/* Editions & Cards Section */}
        <section className="w-full px-[3%] mb-[60px] md:mb-16">
          <div className="mb-8">
            <span className="text-red-600 font-bold tracking-[0.25em] uppercase text-xs block mb-1">Chapters</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
              Convention <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Editions</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-8 h-8 border-3 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {lgecEvents.map((event, idx) => (
                <EventCard key={event.id} event={event} index={idx} hideLocationYear={true} />
              ))}
            </div>
          )}
        </section>

        {/* Minimal Pillars Section */}
        <section className="w-full px-[3%]">
          <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, idx) => {
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
