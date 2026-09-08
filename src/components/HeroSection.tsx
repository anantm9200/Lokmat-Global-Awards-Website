import { motion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useEvents } from "@/src/hooks/useEvents";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Link } from "react-router-dom";
import { formatDate } from "@/src/lib/utils";

const image1 = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800";
const image2 = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800";
const image4 = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { events } = useEvents();
  // Latest events section
  const latestEvents = events.slice(0, 6);
  const [, setHoveredEventId] = useState<string | null>(null);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1.1, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  // Authentic Event Images for Hero Slider
  const carouselImages = [
    {
      src: "https://static.wixstatic.com/media/548938_199ab3c60a2c4f0facd965e8b6acd840~mv2.jpg",
      fallback: image1,
      title: "Mauritius, 2026"
    },
    {
      src: "https://static.wixstatic.com/media/548938_4cac77e950a84d069f5f29b1cfbbb7b0~mv2.jpg",
      fallback: image1,
      title: "London, 2025"
    },
    {
      src: "https://static.wixstatic.com/media/548938_64f88fd0bc6244ae8fa8cbbd867a0ac6~mv2.jpg",
      fallback: image4,
      title: "Singapore, 2024"
    },
    {
      src: "https://static.wixstatic.com/media/548938_ded036dc37f0424680a37bc2eb2e5426~mv2.jpg",
      fallback: image2,
      title: "London, 2025"
    },
    {
      src: "https://static.wixstatic.com/media/548938_199ab3c60a2c4f0facd965e8b6acd840~mv2.jpg",
      fallback: image1,
      title: "Mauritius, 2026"
    },
    {
      src: "https://static.wixstatic.com/media/548938_bcfbc37d13e846ebb239ae504fb62d47~mv2.jpg",
      fallback: image4,
      title: "London, 2025"
    },
    {
      src: "https://static.wixstatic.com/media/548938_81ae385140b74ece88a4c4618649c5e3~mv2.jpg",
      fallback: image1,
      title: "Singapore, 2024"
    },
    {
      src: "https://static.wixstatic.com/media/548938_d907db88d2c64adb82b755a951dc4759~mv2.jpg",
      fallback: image1,
      title: "London, 2025"
    },
    {
      src: "https://static.wixstatic.com/media/548938_d6e6fb602cde4cb8ab4673a9b1a75c4e~mv2.jpg",
      fallback: image4,
      title: "Baku, 2024"
    },
    {
      src: "https://static.wixstatic.com/media/548938_1f8b314b7b1b40ab956ebbc4904144f0~mv2.jpg",
      fallback: image1,
      title: "London, 2025"
    },
    {
      src: "https://static.wixstatic.com/media/548938_228ca21f330843d9acda383849850676~mv2.jpg",
      fallback: image1,
      title: "Singapore, 2024"
    },
    {
      src: "https://static.wixstatic.com/media/548938_69e1c744da164a2bba0b000a0a4ae7da~mv2.jpg",
      fallback: image2,
      title: "London, 2025"
    },
    {
      src: "https://static.wixstatic.com/media/548938_c0cfacfe865741be8c013808da91a8b2~mv2.jpg",
      fallback: image2,
      title: "London, 2025"
    },
    {
      src: "https://static.wixstatic.com/media/548938_9f9a35752cfa4086917eba5290e5a523~mv2.jpg",
      fallback: image2,
      title: "Singapore, 2024"
    },
    {
      src: "https://static.wixstatic.com/media/548938_801555c0b96f487f8435536325b6902e~mv2.jpg",
      fallback: image4,
      title: "Baku, 2024"
    },
    {
      src: "https://static.wixstatic.com/media/548938_9548fde182f34469ae7b8aa41b781a81~mv2.jpg",
      fallback: image2,
      title: "Hong Kong, 2025"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-between bg-[#FAFAFA] pt-[81px] sm:pt-[97px] pb-8 sm:pb-10 px-[3%] overflow-hidden">
      {/* Completely Structured, Balanced Checkered Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <svg 
          className="absolute inset-0 w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-structured-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 H 0 V 40"
                fill="none"
                stroke="rgba(0, 0, 0, 0.075)"
                strokeWidth="1"
                shapeRendering="crispEdges"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-structured-grid)" />
        </svg>

        {/* Ambient atmospheric lighting */}
        <div className="absolute top-1/6 left-1/5 w-[500px] h-[500px] bg-red-500/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-orange-500/5 rounded-full filter blur-[140px] pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full flex flex-col justify-between flex-1 h-full">
        
        {/* Top Header Deck: Masterhead & Description with bottom alignment */}
        <div className="w-full mb-5 sm:mb-7 pt-[4.5%]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-12 pb-2 sm:pb-3">
            
            {/* Left: Eyebrow + Master Title in 1 line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-end"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[12.5px] font-bold uppercase tracking-[0.2em] mb-3 self-start">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                OUR LANDMARK EVENT IPS
              </div>

              <h1 className="text-[2.07rem] sm:text-[2.55rem] md:text-[3.2rem] lg:text-[3.76rem] xl:text-[4.35rem] font-bold tracking-tight text-[#111111] flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap leading-none">
                <div className="relative flex items-center shrink-0">
                  <img 
                    src="/lokmat-logo.png" 
                    alt="LOKMAT" 
                    className="h-11 sm:h-[48px] md:h-[55px] lg:h-[61px] xl:h-[70px] w-auto object-contain object-left"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const fallback = document.getElementById('lokmat-fallback-text');
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <span id="lokmat-fallback-text" className="text-[#111111] hidden font-bold">LOKMAT</span>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 pb-0.5 whitespace-nowrap">
                  Global Convention
                </span>
              </h1>
            </motion.div>

            {/* Right: Curated Description aligned at bottom (+10% font size) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:max-w-md xl:max-w-lg flex flex-col justify-end"
            >
              <p className="text-gray-600 text-[15px] sm:text-[17px] lg:text-[18px] font-normal leading-relaxed">
                A curated platform for Lokmat’s flagship events and awards, celebrating leadership, culture, talent, enterprise and public impact across India, globe and beyond.
              </p>
            </motion.div>

          </div>
        </div>

        {/* Centerpiece: Full-Width Horizontal Visual Gallery with negative space above and unclipped bottom shadow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full my-auto py-0"
        >
          {/* Panoramic Edge-to-Edge Embla Carousel respecting 3% margin */}
          <div className="relative w-full">
            <div 
              className="w-full overflow-hidden cursor-grab active:cursor-grabbing" 
              ref={emblaRef}
            >
              {/* Added generous bottom padding (pb-8 sm:pb-10) so the drop shadow is fully visible and not cut off */}
              <div className="flex touch-pan-y flex-row items-center pt-2 pb-8 sm:pb-10">
                {carouselImages.map((imgObj, index) => (
                  <div 
                    key={index} 
                    className="flex-[0_0_auto] min-w-0 px-2.5 sm:px-3.5"
                  >
                    <motion.div 
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden rounded-2xl sm:rounded-3xl w-[412px] sm:w-[528px] md:w-[600px] lg:w-[660px] h-[308px] sm:h-[354px] md:h-[396px] lg:h-[429px] shadow-[0_16px_36px_rgba(0,0,0,0.13)] border-[3.5px] border-white group bg-gray-100"
                    >
                      <img 
                        src={imgObj.src} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105" 
                        alt={imgObj.title} 
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = imgObj.fallback;
                        }}
                      />
                      
                      {/* Gradient scrim for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                      {/* Top Brand Pill */}
                      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[9.5px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20">
                          Lokmat GLOCON
                        </span>
                      </div>
                      
                      {/* Bottom Location & Edition Badge */}
                      <div className="absolute bottom-3.5 left-4 z-10 text-white">
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-md flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          {imgObj.title}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Full-Width Latest Events Deck shifted below by 15-20px with reduced spacing from slider */}
        {latestEvents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full border-t border-gray-200 mt-4 sm:mt-5 pt-4 sm:pt-5 pb-2"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-2.5">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500">
                Latest Events & Flagship Conclaves
              </h3>
              <Link 
                to="/upcoming"
                className="text-[11px] text-red-600 hover:text-red-700 font-bold tracking-wider uppercase flex items-center gap-1 group transition-colors"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {latestEvents.map((event) => (
                <Link 
                  key={event.id}
                  to={`/event/${event.id}`}
                  className="group bg-white border border-gray-100 rounded-xl p-3 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-red-500/40 hover:-translate-y-0.5 min-h-[118px] sm:min-h-[125px] h-full"
                  onMouseEnter={() => setHoveredEventId(event.id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                >
                  <div className="flex flex-col gap-0.5 w-full">
                    <span className={`text-[8.5px] font-mono uppercase tracking-widest ${event.category.includes('Upcoming') ? 'text-red-600 font-bold animate-pulse' : 'text-gray-500'}`}>
                      {event.category}
                    </span>
                    <h4 className="text-xs font-semibold text-[#111111] group-hover:text-red-600 transition-colors duration-300 line-clamp-2 leading-snug">
                      {event.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between w-full mt-2 pt-1.5 border-t border-gray-100">
                    <span className="text-[9.5px] text-gray-400 font-medium truncate pr-1">
                      {formatDate(event.date)} | {event.location.split(',')[0]}
                    </span>
                    <div className="w-5 h-5 flex-shrink-0 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-50 text-gray-400 group-hover:text-red-600 transition-all transform group-hover:scale-105">
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}


