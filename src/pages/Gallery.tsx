import Navbar from "@/src/components/Navbar";
import { useState, useEffect } from "react";
import Footer from "@/src/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, X, ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";
import { getOptimizedImageUrl, getRawImageUrl } from "@/src/utils/imageOptimizer";

const GALLERY_IMAGES = [
  // Mauritius 2026
  "https://static.wixstatic.com/media/548938_b93acbc5b20c47cb9a60b33f494ddd69~mv2.jpg",
  "https://static.wixstatic.com/media/548938_60f5c988a13d40f9b1a83cd023f0ea19~mv2.jpg",
  "https://static.wixstatic.com/media/548938_be23b27ab71249bfb2e17b73b8c9144c~mv2.jpg",
  "https://static.wixstatic.com/media/548938_199ab3c60a2c4f0facd965e8b6acd840~mv2.jpg",
  "https://static.wixstatic.com/media/548938_8ff50397db974348beb21275c51dc349~mv2.jpg",
  "https://static.wixstatic.com/media/548938_fa6faeac32df4ea7a4f1c79aabc9a39f~mv2.png",

  // Cairo 2026
  "https://static.wixstatic.com/media/548938_e7d3e1979a4744b79da66690874091b9~mv2.jpg",
  "https://static.wixstatic.com/media/548938_e5cba0d41a6d4055abe0f39a47e999af~mv2.jpg",
  "https://static.wixstatic.com/media/548938_eded7d8862064d0a888ef87d52bc2c76~mv2.png",
  "https://static.wixstatic.com/media/548938_53279ca9f3904e328d12683065dd528c~mv2.png",

  // London 2025
  "https://static.wixstatic.com/media/548938_01de16ecda2648ee8f744a76a35e1a11~mv2.jpg",
  "https://static.wixstatic.com/media/548938_1a80b09511e349ce901734792adee261~mv2.jpg",
  "https://static.wixstatic.com/media/548938_df252ce18e1b452fa31ce152c358856a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_aea6244b1b4647ab81f194a1e49b41cd~mv2.jpg",
  "https://static.wixstatic.com/media/548938_1024fa5c4e6b41709f36a98f7d398d3a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_677525051cc843be800ff94bdefbc0ef~mv2.jpg",

  // Hong Kong 2025
  "https://static.wixstatic.com/media/548938_c154eed85ef3434684d993283d8b3f5c~mv2.jpg",
  "https://static.wixstatic.com/media/548938_367cb30d4c8d4dea8166c59be45d0e9e~mv2.jpg",
  "https://static.wixstatic.com/media/548938_fab36fabbc74484b9d4f9a66702fef69~mv2.jpg",
  "https://static.wixstatic.com/media/548938_c24b4439409d464396d71f6de15c588c~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_30e8b7fde488472a881490e41fe8e18a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_8eae2d53c2e0476a8b9a9251a04a4c75~mv2.jpg",

  // Baku 2024
  "https://static.wixstatic.com/media/548938_7c6fc72928a346979bc09fc548fb6f2c~mv2.jpg",
  "https://static.wixstatic.com/media/548938_178658f08f6d487697300102e2df05ed~mv2.jpg",
  "https://static.wixstatic.com/media/548938_df3137aca94d4ffdb8ec6f3730c99f92~mv2.jpg",
  "https://static.wixstatic.com/media/548938_dcbacbf1445148c099f17fee8dcd08d1~mv2.png",
  "https://static.wixstatic.com/media/548938_e72e0a23d7194c1cb1497c0c0fc99b6c~mv2.jpg",

  // Singapore 2024
  "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
  "https://static.wixstatic.com/media/548938_c3071a65c719496794c0badcec2dfe63~mv2.jpg",
  "https://static.wixstatic.com/media/548938_bd414512485f4f8d829f43bf08dddcd7~mv2.jpg",
  "https://static.wixstatic.com/media/548938_4f37d9ddf20743fe9a52e3db9eacc36d~mv2.jpg",
  "https://static.wixstatic.com/media/548938_67cac5d58a9e41628c58f9bf88989ffe~mv2.jpg",

  // Dubai 2023
  "https://static.wixstatic.com/media/548938_e27482ebd1ef499db675193aa77055e0~mv2.jpg",
  "https://static.wixstatic.com/media/548938_2f1808df0b0b4e80a0ba733650a0db15~mv2.jpg",
  "https://static.wixstatic.com/media/548938_6dd00c145aac47b6bdf40b683f982968~mv2.jpg",
  "https://static.wixstatic.com/media/548938_a14443078d4b410191b30a24d8839c04~mv2.jpg",
  "https://static.wixstatic.com/media/548938_ec71c951ee4a481fa68dcb6d95d01b33~mv2.jpg",
  "https://static.wixstatic.com/media/548938_7bb51081bba74cdf921b3bc4cb4935a0~mv2.jpg",

  // About & Historical
  "https://static.wixstatic.com/media/548938_b2dd1ed30f5f4454ae182a8598f0553e~mv2.jpg"
];

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Official Photo Gallery & Event Portfolios | Lokmat Glocon";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Browse photographic archives, red carpet showcases, and summit galleries from Lokmat Glocon's premier international award nights and economic conclaves.");
    }
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, GALLERY_IMAGES.length));
  };

  const visibleImages = GALLERY_IMAGES.slice(0, visibleCount);
  const [isZoomed, setIsZoomed] = useState(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % visibleImages.length);
      setIsZoomed(false);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + visibleImages.length) % visibleImages.length);
      setIsZoomed(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, visibleImages.length]);

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-[100vw] pt-[159px] pb-[30px] md:pt-[195px] md:pb-32 px-[3%] relative">
        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-700 text-center mb-[60px] md:mb-14">
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Visual Portfolio</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Gallery</span>
            </h1>
        </div>
        
        <div className="w-full mx-auto">
            {/* Masonry Layout preserving original image aspect ratios */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
                {visibleImages.map((src, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: (idx % 12) * 0.03 }}
                        onClick={() => openLightbox(idx)}
                        className="break-inside-avoid rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
                    >
                        <img 
                            src={getOptimizedImageUrl(src, { width: 600, height: 450, quality: 78 })} 
                            alt={`Gallery image ${idx + 1}`} 
                            className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <Maximize2 className="w-5 h-5 text-gray-900" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {visibleCount < GALLERY_IMAGES.length && (
                <div className="mt-[60px] md:mt-16 flex justify-center">
                    <button 
                        onClick={loadMore}
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 border border-gray-300 text-[#111111] rounded-2xl overflow-hidden font-bold tracking-widest uppercase text-sm hover:scale-105 hover:border-[#111111] hover:bg-gray-50 transition-all duration-300 shadow-sm"
                    >
                        <span className="relative z-10">Load More</span>
                        <ArrowDown className="relative z-10 w-4 h-4 transition-transform group-hover:translate-y-1" />
                    </button>
                </div>
            )}
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && visibleImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none"
            onClick={closeLightbox}
          >
            {/* Top Bar Controls */}
            <div
              className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between z-50 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Counter indicator */}
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium tracking-wider backdrop-blur-sm pointer-events-auto">
                {lightboxIndex + 1} / {visibleImages.length}
              </div>

              {/* Action Buttons: Zoom Toggle, Open Original, Close */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  title={isZoomed ? "Fit to screen" : "View 100% original size"}
                  aria-label={isZoomed ? "Fit to screen" : "View original size"}
                >
                  {isZoomed ? (
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
                  href={getRawImageUrl(visibleImages[lightboxIndex])}
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
                  onClick={closeLightbox}
                  aria-label="Close modal"
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Prev Button */}
            {visibleImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-2 sm:left-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 p-2.5 sm:p-3 rounded-full transition-colors z-50 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Next Button */}
            {visibleImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
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
                isZoomed
                  ? "max-w-[96vw] max-h-[84vh] sm:max-h-[86vh] overflow-auto rounded-xl p-2 cursor-zoom-out"
                  : "max-w-[96vw] max-h-[84vh] sm:max-h-[86vh] cursor-zoom-in"
              }`}
            >
              <img
                src={getRawImageUrl(visibleImages[lightboxIndex])}
                alt={`Expanded gallery photo ${lightboxIndex + 1}`}
                decoding="async"
                referrerPolicy="no-referrer"
                onClick={() => setIsZoomed((prev) => !prev)}
                className={`rounded-xl shadow-2xl transition-transform duration-200 ${
                  isZoomed
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

