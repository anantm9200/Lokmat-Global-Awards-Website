import React, { useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import VisionMissionSection from "@/src/components/VisionMissionSection";
import AboutBrandSection from "@/src/components/AboutBrandSection";
import GlobalEconomicFootprintsSection from "@/src/components/GlobalEconomicFootprintsSection";
import GlobalMapSection from "@/src/components/GlobalMapSection";
import { motion } from "motion/react";
import { Award, Shield, Target, Globe, Users, Star, ArrowUpRight, Sparkles, Linkedin } from "lucide-react";

export default function About() {
  // AIO, GEO, and SEO Best Practices: Dynamic Title and Description Updates
  useEffect(() => {
    document.title = "About Our Legacy | Lokmat GLOCON";
    
    // Update Meta Description dynamically for SEO/AIO scrapers
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore the prestigious 50+ year history of Lokmat Network's events, conventions, and awards. Learn about our core values, leadership team, and global milestones.");
    }

    // Add dynamic geo region specific meta for About page
    const geoRegion = document.querySelector('meta[name="geo.region"]');
    if (geoRegion) {
      geoRegion.setAttribute("content", "IN-MH");
    }
  }, []);

  const values = [
    {
      icon: Award,
      title: "Excellence",
      desc: "We set the highest benchmarks for execution, speaker curations, and recognition. Only the truly exceptional are honored.",
    },
    {
      icon: Shield,
      title: "Integrity",
      desc: "Our selection panels and award processes are governed by rigorous transparency, objective criteria, and respected external juries.",
    },
    {
      icon: Target,
      title: "Dynamic Impact",
      desc: "We don't just host events; we build platforms that trigger dialogue, shape public policies, and champion lasting social change.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      desc: "Expanding regional pride onto global centers of influence like London, Singapore, Dubai, Cairo, and Baku, connecting the Indian diaspora.",
    }
  ];

  const leaders = [
    {
      name: "Dr. Vijay Darda",
      role: "Member of Parliament, Rajya Sabha (1998-2016)\nChairman, Editorial Board, Lokmat Media Group",
      image: "https://static.wixstatic.com/media/548938_ef75f912b1584b51abead72fa116b3d8~mv2.png",
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Rajendra Darda",
      role: "Editor-in-Chief, Lokmat Group",
      image: "https://static.wixstatic.com/media/548938_40f79978f3b74c4da7155ad39d1d92c5~mv2.png",
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Devendra Darda",
      role: "Managing Director",
      image: "https://static.wixstatic.com/media/548938_a1749081fb1b4ce9a1be889262c70f80~mv2.png",
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Rishi Darda",
      role: "Editorial & Jt. Managing Director",
      image: "https://static.wixstatic.com/media/548938_83f4d2ea168e42ca86aaa8b9b7fd4e53~mv2.png",
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Karan Darda",
      role: "Executive Director & Editorial Director",
      image: "https://static.wixstatic.com/media/548938_08276cddde434b3a93e170a02bc22bba~mv2.png",
      linkedin: "https://www.linkedin.com",
    }
  ];

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full pt-[159px] pb-0 md:pt-[195px] md:pb-0 relative">
        {/* Hero Header */}
        <div className="w-full px-[3%] text-center mb-[30px] md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Who We Are</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Our Vision & Legacy
            </h1>
          </motion.div>
        </div>

        {/* About the Brand Section */}
        <AboutBrandSection />

        {/* Primary Interactive Vision & Mission Section */}
        <VisionMissionSection />

        {/* Vision & Values Section */}
        <section className="pt-[30px] pb-[30px] md:py-20 bg-white border-t border-b border-gray-100">
          <div className="w-full px-[3%]">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Guided by Purpose</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Values</span>
              </h2>
              <p className="text-gray-500 font-light mt-4 text-base md:text-lg">
                Behind every global convention, high-profile summit, and prestigious awards ceremony is a set of guiding principles we hold sacred.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="p-8 rounded-2xl border border-gray-200 bg-[#FAFAFA] hover:bg-white hover:border-red-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#111111] group-hover:text-red-600 transition-colors duration-300">
                      {v.title}
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed text-sm">
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Strategic Global Presence / Economic Footprints */}
        <GlobalEconomicFootprintsSection />

        {/* Leadership Section */}
        <section className="pt-[30px] pb-[30px] md:pt-24 md:pb-20 bg-white border-t border-gray-100">
          <div className="w-full px-[3%]">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Governing Board</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
                Our Visionary <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Leadership</span>
              </h2>
              <p className="text-gray-500 font-light mt-4 text-base md:text-lg">
                The distinguished executive stewards driving the intellectual depth, global operations, and regional integrity of the Lokmat portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
              {leaders.map((leader, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white border border-gray-200 p-3.5 sm:p-4 rounded-xl flex flex-col justify-between hover:border-red-200 hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    {/* Image in 3:4 ratio */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-100">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Name & Designation */}
                    <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-0.5 leading-snug">
                      {leader.name}
                    </h3>
                    <div className="text-red-600 text-[11px] font-bold uppercase tracking-wider leading-snug space-y-1">
                      {leader.role.split("\n").map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>

                  {/* LinkedIn Icon Action */}
                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">LinkedIn</span>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${leader.name}'s LinkedIn Profile`}
                      className="w-8 h-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:scale-105 transition-all duration-300 shadow-sm"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* World Map Section pointing to Asia, Europe, Africa */}
        <GlobalMapSection />
      </main>
      
      <Footer />
    </div>
  );
}
