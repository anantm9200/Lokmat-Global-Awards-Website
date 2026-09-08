import Navbar from "@/src/components/Navbar";
import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useEvents } from "@/src/hooks/useEvents";
import { ArrowLeft, Calendar, MapPin, Share2, Clock, Users, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import Footer from "@/src/components/Footer";
import { motion } from "motion/react";
import { formatDate } from "@/src/lib/utils";
import EventCard from "@/src/components/EventCard";
import AwardWinnersSection from "@/src/components/AwardWinnersSection";
import { getLocationLogo } from "@/src/locationLogos";

const getEventLogoImage = (event: { location?: string; title?: string; logoUrl?: string }) => {
  if (event.logoUrl) return event.logoUrl;
  return getLocationLogo(event.location || event.title || "");
};

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { events, loading, error } = useEvents();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const event = events.find((e) => {
    if (!id) return false;
    if (e.id === id) return true;
    const target = id.toLowerCase().trim();
    const eventId = e.id.toLowerCase();
    if (eventId === target) return true;

    // Singapore aliases
    if ((target === "singapore-2024" || target === "singapore") && (eventId === "1" || eventId === "singapore-2024")) return true;
    if (target === "1" && (eventId === "1" || eventId === "singapore-2024")) return true;

    // Direct city name aliases
    const loc = (e.location || "").toLowerCase().replace(/\s+/g, "-");
    if (target === loc || eventId.includes(target) || target.includes(eventId)) return true;
    if (target.includes("mauritius") && (eventId.includes("mauritius") || loc.includes("mauritius"))) return true;
    if (target.includes("cairo") && (eventId.includes("cairo") || loc.includes("cairo"))) return true;
    if (target.includes("london") && (eventId.includes("london") || loc.includes("london"))) return true;
    if ((target.includes("hong-kong") || target.includes("macau")) && (eventId.includes("hong-kong") || loc.includes("hong") || loc.includes("macau"))) return true;
    if (target.includes("baku") && (eventId.includes("baku") || loc.includes("baku"))) return true;
    if (target.includes("dubai") && (eventId.includes("dubai") || loc.includes("dubai"))) return true;

    return false;
  });

  useEffect(() => {
    if (event) {
      document.title = `${event.title} | Lokmat Premium Events`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", `${event.description.substring(0, 155)}... Discover summits hosted by Lokmat.`);
      }
    }
  }, [event]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const otherEventsList = events.filter((e) => e.id !== id && e.category.toLowerCase().includes("upcoming")).slice(0, 2);

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Start */}
      <main className="flex-1 w-[100vw] pt-[127px] pb-24 md:pt-[147px] md:pb-32 px-[3%] relative">
        
        {loading ? (
           <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
             <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Loading event details</p>
           </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <p className="text-red-600 font-mono text-sm tracking-widest uppercase">Error Loading Event</p>
           </div>
        ) : !event ? (
           <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <h2 className="text-4xl font-bold tracking-tight">Event not found</h2>
             <Link to="/" className="text-red-600 flex items-center gap-2 hover:underline">
               <ArrowLeft className="w-4 h-4" /> Back to Home
             </Link>
           </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">

            {/* Event Title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full mb-8"
            >
              {(() => {
                const parts = event.title.split(' – ');
                const eventName = parts[0];
                const eventPlaceYear = parts[1] || `${event.location}, ${event.date}`;
                return (
                  <div className="w-full flex flex-col md:flex-row md:items-baseline justify-between gap-3 md:gap-8 pb-3 border-b border-gray-100">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                      {eventName}
                    </h1>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-gray-500 whitespace-nowrap md:text-right shrink-0">
                      {eventPlaceYear}
                    </div>
                  </div>
                );
              })()}
            </motion.div>

            {/* Top Media */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full rounded-3xl overflow-hidden aspect-[16/7.7] relative border border-gray-100 shadow-sm mb-12 bg-black group"
              style={{ aspectRatio: "16 / 7.7" }}
            >
              {event.videoUrl ? (
                <>
                  <video 
                    ref={videoRef}
                    src={event.videoUrl} 
                    autoPlay 
                    loop 
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-contain md:object-cover cursor-pointer"
                    onClick={toggleMute}
                  />
                  <button 
                    onClick={toggleMute}
                    className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                </>
              ) : (
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 rounded-sm text-xs font-bold tracking-widest uppercase bg-white/95 text-[#111111] backdrop-blur-md shadow-sm">
                  {event.category}
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full items-stretch">
              {/* Left Column - Event Logo Card (1:1 Aspect Ratio) */}
              <div className="w-full lg:w-auto flex flex-col order-2 lg:order-1 shrink-0 items-center justify-center">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] aspect-square h-full max-h-[320px] w-full max-w-[320px] lg:w-auto flex items-center justify-center overflow-hidden p-6">
                  <img
                    src={getEventLogoImage(event)}
                    alt={`${event.title} Logo`}
                    className={`w-full h-full aspect-square object-contain transition-transform duration-300 hover:scale-105 ${
                      event.id === "mauritius-2026" ? "max-h-[240px] max-w-[240px] p-2" : ""
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = "https://static.wixstatic.com/media/548938_9e17a561cd3a45d49344c302d18c3e59~mv2.png";
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Details (Expanded width by ~5%) */}
              <div className="w-full lg:flex-1 flex flex-col justify-between order-1 lg:order-2">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-6 mt-2">
                    {event.description}
                  </div>
                </motion.div>
                
                {/* Event Key Date & Location Badges */}
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-semibold text-gray-700">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-semibold text-gray-700">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* 2-Column Award & Winners Section after content and before Event Gallery */}
            <AwardWinnersSection event={event} />

            {/* Event Gallery */}
            <div className="w-full mt-12 pt-10 border-t border-gray-200">
              <h4 className="text-2xl font-bold mb-6 tracking-tight text-[#111111]">Event Gallery</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(event?.gallery || [
                  "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
                  "https://static.wixstatic.com/media/548938_16da964fa0a64825b25b0d428948b731~mv2.jpg",
                  "https://static.wixstatic.com/media/548938_bd414512485f4f8d829f43bf08dddcd7~mv2.jpg",
                  "https://static.wixstatic.com/media/548938_4f37d9ddf20743fe9a52e3db9eacc36d~mv2.jpg",
                  "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
                  "https://static.wixstatic.com/media/548938_67cac5d58a9e41628c58f9bf88989ffe~mv2.jpg"
                ]).map((img, idx) => (
                  <img key={idx} src={img} alt={`Gallery ${idx + 1}`} loading="lazy" referrerPolicy="no-referrer" className="w-full aspect-[4/3] object-cover rounded-xl shadow-sm hover:opacity-90 transition-opacity cursor-pointer bg-gray-100" />
                ))}
              </div>
            </div>
            
            {/* Explore More Events Section */}
            {otherEventsList.length > 0 && (
              <div className="mt-32 border-t border-gray-200 pt-16">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-3xl font-bold tracking-tight">Explore More Events</h3>
                  <Link to="/all-events" className="text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-red-600 transition-colors flex items-center gap-2">
                    View All <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherEventsList.map((otherEvent) => (
                    <EventCard key={otherEvent.id} event={otherEvent} />
                  ))}
                </div>
              </div>
            )}
            
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
