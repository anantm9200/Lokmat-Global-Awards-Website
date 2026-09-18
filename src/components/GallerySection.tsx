import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink, Maximize2 } from "lucide-react";
import { getOptimizedImageUrl, getRawImageUrl } from "@/src/utils/imageOptimizer";

const image1 = "https://static.wixstatic.com/media/548938_199ab3c60a2c4f0facd965e8b6acd840~mv2.jpg";
const image2 = "https://static.wixstatic.com/media/548938_01de16ecda2648ee8f744a76a35e1a11~mv2.jpg";
const image3 = "https://static.wixstatic.com/media/548938_c154eed85ef3434684d993283d8b3f5c~mv2.jpg";
const image4 = "https://static.wixstatic.com/media/548938_7c6fc72928a346979bc09fc548fb6f2c~mv2.jpg";
const image5 = "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg";
const image6 = "https://static.wixstatic.com/media/548938_e27482ebd1ef499db675193aa77055e0~mv2.jpg";
const image7 = "https://static.wixstatic.com/media/548938_b2dd1ed30f5f4454ae182a8598f0553e~mv2.jpg";

export default function GallerySection() {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false })]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setIsZoomed(false);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
        setIsZoomed(false);
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden flex flex-col">
      <div className="w-[100vw] px-[3%] mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
            Curated <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent pr-2">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </motion.div>
      </div>

      <div className="relative w-full">
        {/* Edge Blur Overlays */}
        <div className="absolute top-0 left-0 w-16 md:w-32 lg:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-32 lg:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y flex-row">
            {images.map((src, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-2 lg:px-4"
              >
                <div 
                  onClick={() => {
                    setLightboxIndex(index);
                    setIsZoomed(false);
                  }}
                  className="relative overflow-hidden rounded-xl w-[600px] h-[400px] group shadow-sm bg-gray-100 cursor-pointer"
                >
                  <img 
                    src={getOptimizedImageUrl(src, { width: 640, height: 420, quality: 78 })} 
                    alt={`Gallery image ${index + 1}`} 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 p-3 rounded-full bg-white/95 text-gray-900 shadow-lg">
                      <Maximize2 className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none"
            onClick={() => {
              setLightboxIndex(null);
              setIsZoomed(false);
            }}
          >
            {/* Top Bar Controls */}
            <div
              className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between z-50 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium tracking-wider backdrop-blur-sm pointer-events-auto">
                {lightboxIndex + 1} / {images.length}
              </div>

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
                  href={getRawImageUrl(images[lightboxIndex])}
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
                    setIsZoomed(false);
                  }}
                  aria-label="Close modal"
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Prev Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
                  setIsZoomed(false);
                }}
                className="absolute left-2 sm:left-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 p-2.5 sm:p-3 rounded-full transition-colors z-50 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
                  setIsZoomed(false);
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
                isZoomed
                  ? "max-w-[96vw] max-h-[84vh] sm:max-h-[86vh] overflow-auto rounded-xl p-2 cursor-zoom-out"
                  : "max-w-[96vw] max-h-[84vh] sm:max-h-[86vh] cursor-zoom-in"
              }`}
            >
              <img
                src={getRawImageUrl(images[lightboxIndex])}
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
    </section>
  );
}
