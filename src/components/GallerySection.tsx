import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const image1 = "https://static.wixstatic.com/media/548938_8ff50397db974348beb21275c51dc349~mv2.jpg";
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

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false })]
  );

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
                <div className="relative overflow-hidden rounded-xl w-[600px] h-[400px] group shadow-sm bg-gray-100">
                  <img 
                    src={src} 
                    alt={`Gallery image ${index + 1}`} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
