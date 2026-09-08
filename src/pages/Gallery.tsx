import Navbar from "@/src/components/Navbar";
import { useState, useEffect } from "react";
import Footer from "@/src/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const GALLERY_IMAGES = [
  // Mauritius 2026
  "https://static.wixstatic.com/media/548938_b93acbc5b20c47cb9a60b33f494ddd69~mv2.jpg",
  "https://static.wixstatic.com/media/548938_60f5c988a13d40f9b1a83cd023f0ea19~mv2.jpg",
  "https://static.wixstatic.com/media/548938_be23b27ab71249bfb2e17b73b8c9144c~mv2.jpg",
  "https://static.wixstatic.com/media/548938_199ab3c60a2c4f0facd965e8b6acd840~mv2.jpg",
  "https://static.wixstatic.com/media/548938_8ff50397db974348beb21275c51dc349~mv2.jpg",
  "https://static.wixstatic.com/media/548938_bcc5199fa79b4acd8231eeaeac061ee3~mv2.jpg",

  // Cairo 2026
  "https://static.wixstatic.com/media/548938_e7d3e1979a4744b79da66690874091b9~mv2.jpg",
  "https://static.wixstatic.com/media/548938_e5cba0d41a6d4055abe0f39a47e999af~mv2.jpg",
  "https://static.wixstatic.com/media/548938_4726a3324014489a9fc72f013ab14bfe~mv2.jpg",
  "https://static.wixstatic.com/media/548938_fb341ebfdd434a53bb8b88849b274423~mv2.jpg",

  // London 2025
  "https://static.wixstatic.com/media/548938_01de16ecda2648ee8f744a76a35e1a11~mv2.jpg",
  "https://static.wixstatic.com/media/548938_1a80b09511e349ce901734792adee261~mv2.jpg",
  "https://static.wixstatic.com/media/548938_df252ce18e1b452fa31ce152c358856a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_aea6244b1b4647ab81f194a1e49b41cd~mv2.jpg",
  "https://static.wixstatic.com/media/548938_1024fa5c4e6b41709f36a98f7d398d3a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_677525051cc843be800ff94bdefbc0ef~mv2.jpg",

  // Macau & Hong Kong 2024
  "https://static.wixstatic.com/media/548938_c154eed85ef3434684d993283d8b3f5c~mv2.jpg",
  "https://static.wixstatic.com/media/548938_30e8b7fde488472a881490e41fe8e18a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_fab36fabbc74484b9d4f9a66702fef69~mv2.jpg",
  "https://static.wixstatic.com/media/548938_007934490b504024afc2cc6ccc472252~mv2.jpg",
  "https://static.wixstatic.com/media/548938_29614dff8fbb4da69212e1af35d7961e~mv2.jpg",
  "https://static.wixstatic.com/media/548938_11904c4021e84c8ead2f68bd201bbe9c~mv2.jpg",

  // Baku 2024
  "https://static.wixstatic.com/media/548938_7c6fc72928a346979bc09fc548fb6f2c~mv2.jpg",
  "https://static.wixstatic.com/media/548938_178658f08f6d487697300102e2df05ed~mv2.jpg",
  "https://static.wixstatic.com/media/548938_df3137aca94d4ffdb8ec6f3730c99f92~mv2.jpg",
  "https://static.wixstatic.com/media/548938_60d5ac560b6c4236a2aba9cd75a4c542~mv2.jpg",
  "https://static.wixstatic.com/media/548938_e72e0a23d7194c1cb1497c0c0fc99b6c~mv2.jpg",

  // Singapore 2024
  "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
  "https://static.wixstatic.com/media/548938_16da964fa0a64825b25b0d428948b731~mv2.jpg",
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
    document.title = "Official Photo Gallery & Event Portfolios | Lokmat Events";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Browse historical photo portfolios and media coverage from Lokmat's flagship award nights, international conclaves, and summits.");
    }
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, GALLERY_IMAGES.length));
  };

  const visibleImages = GALLERY_IMAGES.slice(0, visibleCount);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % visibleImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + visibleImages.length) % visibleImages.length);
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

      <main className="flex-1 w-[100vw] pt-[159px] pb-24 md:pt-[195px] md:pb-32 px-[3%] relative">
        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-700 text-center mb-12 md:mb-14">
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
                            src={src} 
                            alt={`Gallery image ${idx + 1}`} 
                            className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
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
                <div className="mt-16 flex justify-center">
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
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-black/40 hover:bg-black/80 p-3 rounded-full transition-colors z-50"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white bg-black/40 hover:bg-black/80 p-3 rounded-full transition-colors z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white bg-black/40 hover:bg-black/80 p-3 rounded-full transition-colors z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="max-w-6xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={visibleImages[lightboxIndex]}
                alt={`Expanded gallery photo ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute bottom-6 text-white/70 text-sm font-medium tracking-wider">
              {lightboxIndex + 1} / {visibleImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

