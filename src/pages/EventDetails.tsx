import Navbar from "@/src/components/Navbar";
import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useEvents } from "@/src/hooks/useEvents";
import { ArrowLeft, Calendar, MapPin, Share2, Clock, Users, ArrowUpRight, Volume2, VolumeX, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";
import Footer from "@/src/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { formatDate } from "@/src/lib/utils";
import EventCard from "@/src/components/EventCard";
import AwardWinnersSection from "@/src/components/AwardWinnersSection";
import { getLocationLogo } from "@/src/locationLogos";
import { getOptimizedImageUrl, getRawImageUrl } from "@/src/utils/imageOptimizer";

const getEventLogoImage = (event: { id?: string; location?: string; title?: string; logoUrl?: string }) => {
  const loc = (event.location || "").toLowerCase();
  const title = (event.title || "").toLowerCase();
  const id = (event.id || "").toLowerCase();

  if (loc.includes("london") || title.includes("london") || id.includes("london")) {
    return "https://static.wixstatic.com/media/548938_f73683c6cb494dae9d199c55838ddf01~mv2.png";
  }
  if (loc.includes("hong kong") || loc.includes("macau") || title.includes("hong kong") || title.includes("macau") || id.includes("hong-kong")) {
    return "https://static.wixstatic.com/media/548938_b6ac96c297934e36b9e0d49f52e67036~mv2.png";
  }
  if (loc.includes("dubai") || title.includes("dubai") || id.includes("dubai")) {
    return "https://static.wixstatic.com/media/548938_a60af7ec1b614f34a373233455bbd3d7~mv2.png";
  }
  if (loc.includes("singapore") || title.includes("singapore") || id.includes("singapore") || id === "1") {
    return "https://static.wixstatic.com/media/548938_d803581c573846a8bf97d7f6bf982637~mv2.png";
  }
  if (loc.includes("baku") || title.includes("baku") || id.includes("baku")) {
    return "https://static.wixstatic.com/media/548938_a5d6be6c6d8e45638fcb7df2bd13c34a~mv2.png";
  }
  if (loc.includes("cairo") || loc.includes("egypt") || title.includes("cairo") || title.includes("egypt") || id.includes("cairo")) {
    return "https://static.wixstatic.com/media/548938_37c105393e5d487895641e750062cf92~mv2.png";
  }
  if (loc.includes("mauritius") || title.includes("mauritius") || id.includes("mauritius")) {
    return "https://static.wixstatic.com/media/548938_438b462f94964b7db67be6832c7f0c8a~mv2.jpeg";
  }

  if (event.logoUrl) return event.logoUrl;
  return getLocationLogo(event.location || event.title || "");
};

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { events, loading, error } = useEvents();
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxZoomed, setIsLightboxZoomed] = useState(false);
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
      document.title = `${event.title} | Lokmat Glocon`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", `${event.description.substring(0, 155)}... Curated and presented by Lokmat Glocon.`);
      }
    }
  }, [event]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const galleryImages = event?.gallery && event.gallery.length > 0 ? event.gallery : [
    "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
    "https://static.wixstatic.com/media/548938_c3071a65c719496794c0badcec2dfe63~mv2.jpg",
    "https://static.wixstatic.com/media/548938_bd414512485f4f8d829f43bf08dddcd7~mv2.jpg",
    "https://static.wixstatic.com/media/548938_4f37d9ddf20743fe9a52e3db9eacc36d~mv2.jpg",
    "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
    "https://static.wixstatic.com/media/548938_67cac5d58a9e41628c58f9bf88989ffe~mv2.jpg"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setIsLightboxZoomed(false);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
        setIsLightboxZoomed(false);
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
        setIsLightboxZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryImages.length]);

  const getEventVideoUrl = (ev: typeof event) => {
    if (!ev) return undefined;
    if (ev.id === "mauritius-2026" || (ev.location && ev.location.toLowerCase().includes("mauritius"))) {
      return "https://video.wixstatic.com/video/548938_8a22ddc8c7be4ff3a6a94689dbd39479/1080p/mp4/file.mp4";
    }
    return ev.videoUrl;
  };

  const otherEventsList = events.filter((e) => e.id !== id && e.category.toLowerCase().includes("upcoming")).slice(0, 2);

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Start */}
      <main className="flex-1 w-[100vw] pt-[127px] pb-[30px] md:pt-[147px] md:pb-32 px-[3%] relative">
        
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
                const eventPlaceYear = (parts[1] || `${event.location}, ${event.date}`).replace(/\s*&\s*Macau/gi, "");
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
              className="w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/11] sm:aspect-[16/7.7] relative border border-gray-100 shadow-sm mb-8 sm:mb-12 bg-black group"
            >
              {getEventVideoUrl(event) ? (
                <>
                  <video 
                    ref={videoRef}
                    src={getEventVideoUrl(event)} 
                    autoPlay 
                    loop 
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={toggleMute}
                  />
                  <button 
                    onClick={toggleMute}
                    className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </button>
                </>
              ) : (
                <img 
                  src={getOptimizedImageUrl(event.imageUrl, { width: 1200, height: 750, quality: 80 })} 
                  alt={event.title} 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
              {/* Category / Past Convention Tag - Hidden on mobile */}
              <div className="hidden sm:block absolute top-6 left-6 z-20">
                <span className="px-4 py-2 rounded-sm text-xs font-bold tracking-widest uppercase bg-white/95 text-[#111111] backdrop-blur-md shadow-sm">
                  {event.category}
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full items-stretch">
              {/* Left Column - Event Logo Card (1:1 Rounded Corner Card with 3:4 Vertical Logo) */}
              <div className="w-full lg:w-auto flex flex-col order-2 lg:order-1 shrink-0 items-center justify-center">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] max-w-full aspect-square flex items-center justify-center p-6 sm:p-7 shrink-0">
                  <div className="h-full aspect-[3/4] max-w-full flex items-center justify-center">
                    <img
                      src={getEventLogoImage(event)}
                      alt={`${event.title} Logo`}
                      className="w-full h-full aspect-[3/4] object-contain transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = getLocationLogo(event.location || event.title || "");
                      }}
                    />
                  </div>
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
                    <span>{event.location?.replace(/\s*&\s*Macau/gi, "")}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* 2-Column Award & Winners Section after content and before Event Gallery */}
            <AwardWinnersSection event={event} />

            {/* Event Gallery */}
            <div className="w-full mt-[60px] pt-0 md:mt-12 md:pt-10 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold tracking-tight text-[#111111]">Event Gallery</h4>
                <span className="text-xs font-medium text-gray-400">Click to expand</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <img
                      src={getOptimizedImageUrl(img, { width: 500, height: 375, quality: 78 })}
                      alt={`Gallery ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 active:bg-black/35 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Explore More Events Section */}
            {otherEventsList.length > 0 && (
              <div className="mt-[60px] pt-0 md:mt-32 border-t border-gray-200 md:pt-16">
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

      {/* Lightbox Modal for clear image view on mobile & desktop */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none"
            onClick={() => {
              setLightboxIndex(null);
              setIsLightboxZoomed(false);
            }}
          >
            {/* Top Bar Controls */}
            <div
              className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between z-50 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Counter indicator */}
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium tracking-wider backdrop-blur-sm pointer-events-auto">
                {lightboxIndex + 1} / {galleryImages.length}
              </div>

              {/* Action Buttons: Zoom Toggle, Open Original, Close */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsLightboxZoomed((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  title={isLightboxZoomed ? "Fit to screen" : "View 100% original size"}
                  aria-label={isLightboxZoomed ? "Fit to screen" : "View original size"}
                >
                  {isLightboxZoomed ? (
                    <>
                      <ZoomOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Fit Screen</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-4 h-4" />
                      <span className="hidden sm:inline">Original Size</span>
                    </>
                  )}
                </button>

                <a
                  href={getRawImageUrl(galleryImages[lightboxIndex])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  title="Open original uncompressed image in new tab"
                  aria-label="Open original image in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Original</span>
                </a>

                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    setIsLightboxZoomed(false);
                  }}
                  aria-label="Close modal"
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Prev Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
                  setIsLightboxZoomed(false);
                }}
                className="absolute left-2 sm:left-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 p-2.5 sm:p-3 rounded-full transition-colors z-50 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Next Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
                  setIsLightboxZoomed(false);
                }}
                className="absolute right-2 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 p-2.5 sm:p-3 rounded-full transition-colors z-50 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Expanded Image Stage */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative flex items-center justify-center transition-all ${
                isLightboxZoomed
                  ? "max-w-[96vw] max-h-[84vh] sm:max-h-[86vh] overflow-auto rounded-xl p-2 cursor-zoom-out"
                  : "max-w-[96vw] max-h-[84vh] sm:max-h-[86vh] cursor-zoom-in"
              }`}
            >
              <img
                src={getRawImageUrl(galleryImages[lightboxIndex])}
                alt={`Expanded gallery image ${lightboxIndex + 1}`}
                decoding="async"
                referrerPolicy="no-referrer"
                onClick={() => setIsLightboxZoomed((prev) => !prev)}
                className={`rounded-xl shadow-2xl transition-transform duration-200 ${
                  isLightboxZoomed
                    ? "max-w-none w-auto h-auto object-none"
                    : "max-w-[92vw] max-h-[82vh] sm:max-w-[94vw] sm:max-h-[85vh] w-auto h-auto object-contain"
                }`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
