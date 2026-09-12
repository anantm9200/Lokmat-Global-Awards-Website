import { motion } from "motion/react";
import Navbar from "@/src/components/Navbar";
import HeroSection from "@/src/components/HeroSection";
import EventCard from "@/src/components/EventCard";
import AlternativeEventCard from "@/src/components/AlternativeEventCard";
import AboutSection from "@/src/components/AboutSection";
import PartnerLogos from "@/src/components/PartnerLogos";
import ImpactSection from "@/src/components/ImpactSection";
import TestimonialsSection from "@/src/components/TestimonialsSection";
import PartnersCtaSection from "@/src/components/PartnersCtaSection";
import Footer from "@/src/components/Footer";
import { Link } from "react-router-dom";
import { useEvents } from "@/src/hooks/useEvents";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const { events, loading, error } = useEvents();
  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />
      <HeroSection />
      
      <AboutSection />
      
      <PartnerLogos />
      
      <main className="bg-white w-[100vw] px-[3%] pt-[30px] pb-[30px] md:pt-[60px] md:pb-[60px]">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-[60px] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
              Lokmat Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Economic Convention</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mt-6"></div>
          </motion.div>
        </div>

        {/* Dynamic Events List */}
        <div className="flex flex-col relative w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
              <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Loading masterworks</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 bg-gray-50 rounded-2xl border border-red-600/30">
              <AlertCircle className="w-12 h-12 text-red-600" />
              <p className="text-gray-600 max-w-md">{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-32 text-gray-500 font-light text-xl">
              No events scheduled yet.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[60px] md:mb-[158px]">
                {events
                  .filter(e => e.title.includes("Lokmat Global Economic Convention"))
                  .slice(0, 2)
                  .map(event => (
                    <EventCard key={event.id} event={event} hideLocationYear={true} />
                  ))}
              </div>

              <div className="flex flex-col md:flex-row items-baseline justify-between mb-[60px] gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
                    Lokmat <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">One World</span> Summit & Awards
                  </h2>
                  <div className="w-24 h-1 bg-red-600 mt-6"></div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events
                  .filter(e => !e.title.includes("Lokmat Global Economic Convention") && !e.category.toLowerCase().includes("upcoming"))
                  .slice(0, 4)
                  .map(event => (
                    <AlternativeEventCard key={event.id} event={event} />
                  ))}
              </div>
            </>
          )}
        </div>
      </main>

      <ImpactSection />

      <TestimonialsSection />

      <PartnersCtaSection />
      
      <Footer />
    </div>
  );
}
