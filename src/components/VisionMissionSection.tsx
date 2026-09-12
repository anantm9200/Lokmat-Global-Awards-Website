import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Target, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
const image1 = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800";
const image2 = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800";

export default function VisionMissionSection() {
  const [activeTab, setActiveTab] = useState<"vision" | "mission">("vision");

  const tabsData = {
    vision: {
      tag: "OUR VISION",
      title: "To Be a Dominant Media Player",
      subtitle: "Informing, entertaining, and building super brands.",
      icon: Eye,
      description: "To be a dominant media player by informing and entertaining audiences, staying relevant, and creating super brands.",
      points: [
        "Informing and entertaining diverse global & regional audiences.",
        "Staying relevant through continuous digital and experiential innovation.",
        "Creating and scaling super brands that drive long-term impact."
      ],
      stat: "Super Brands & Media Excellence",
      image: "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
      fallbackImage: image1
    },
    mission: {
      tag: "OUR MISSION",
      title: "To Enrich Lives Every Day",
      subtitle: "Informing, educating, empowering, and entertaining.",
      icon: Target,
      description: "To enrich lives by informing, educating, giving people a voice, and entertaining.",
      points: [
        "Informing & Educating with accurate, high-impact coverage.",
        "Giving people a voice across grassroots, business, and policy platforms.",
        "Entertaining through world-class summits, conclaves, and cultural experiences."
      ],
      stat: "Enriching Millions of Lives",
      image: "https://static.wixstatic.com/media/548938_01de16ecda2648ee8f744a76a35e1a11~mv2.jpg",
      fallbackImage: image2
    }
  };

  const activeContent = tabsData[activeTab];
  const ActiveTabIcon = activeContent.icon;

  return (
    <section className="pt-[30px] pb-[30px] md:py-16 bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA] relative overflow-hidden">
      {/* Background ambient lighting elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full px-[3%] relative z-10">
        
        {/* Interactive Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100/80 border border-gray-200/80 backdrop-blur-md shadow-inner gap-1">
            {(["vision", "mission"] as const).map((tabKey) => {
              const tabInfo = tabsData[tabKey];
              const Icon = tabInfo.icon;
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "text-gray-600 hover:text-red-600 hover:bg-gray-200/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-md"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tabKey === "vision" ? "Our Vision" : "Our Mission"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-200/80 rounded-3xl p-8 lg:p-12 shadow-xl shadow-gray-100 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                {/* Left Text Box */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                        <ActiveTabIcon className="w-5 h-5" />
                      </div>
                      <span className="text-red-600 font-bold text-xs uppercase tracking-[0.2em]">
                        {activeContent.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-bold text-[#111111] mb-3 leading-tight">
                      {activeContent.title}
                    </h3>

                    <p className="text-gray-600 text-base md:text-lg font-light mb-6 leading-relaxed">
                      {activeContent.description}
                    </p>

                    <div className="space-y-3.5 mb-8">
                      {activeContent.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm md:text-base font-medium">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Key Focus</span>
                      <span className="text-lg font-bold text-red-600">{activeContent.stat}</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Card / Clean Image Showcase with NO text on image */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] group">
                    <img
                      src={activeContent.image}
                      alt={activeContent.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = activeContent.fallbackImage;
                      }}
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

