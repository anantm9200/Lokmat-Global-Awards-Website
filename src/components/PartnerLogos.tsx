import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const partners = [
  { name: "Partner 1", url: "https://static.wixstatic.com/media/548938_e5bc3898a4bd4aa1af88fd1c02565ae9~mv2.png" },
  { name: "Partner 2", url: "https://static.wixstatic.com/media/548938_c2dfb610190f4c27875b3fe277f64816~mv2.png" },
  { name: "Partner 3", url: "https://static.wixstatic.com/media/548938_73c476cde17344c09345682b855b9633~mv2.png" },
  { name: "Partner 4", url: "https://static.wixstatic.com/media/548938_31c29b44426542be941d9bda4d512253~mv2.png" },
  { name: "Partner 5", url: "https://static.wixstatic.com/media/548938_eacc13f8c5494f6b82d0a293131f6354~mv2.png" },
  { name: "Partner 6", url: "https://static.wixstatic.com/media/548938_af0dcb328c2b4a19ad2f6bcbebf8ee82~mv2.png" },
  { name: "Partner 7", url: "https://static.wixstatic.com/media/548938_e564d9ef32294059889e62037116b2a4~mv2.png" },
  { name: "Partner 8", url: "https://static.wixstatic.com/media/548938_bb886bd6531143f0a03f24808a2fbe19~mv2.png" },
  { name: "Partner 9", url: "https://static.wixstatic.com/media/548938_0260c4471e42458a97008f7678c51a17~mv2.png" },
  { name: "Partner 10", url: "https://static.wixstatic.com/media/548938_be353438d08f41e19f7cc83cecb79b87~mv2.png" },
  { name: "Partner 11", url: "https://static.wixstatic.com/media/548938_5bdbf6089a31412a8fac0159ef9f0382~mv2.png" },
  { name: "Partner 12", url: "https://static.wixstatic.com/media/548938_809220904ab642b1ad8d691fe1af1006~mv2.png" },
  { name: "Partner 13", url: "https://static.wixstatic.com/media/548938_9bcc7ca48d474849a624a5218ba45f2c~mv2.png" },
  { name: "Partner 14", url: "https://static.wixstatic.com/media/548938_4f50d6a72ebb407586e2f8b7aeb8a60e~mv2.png" },
  { name: "Partner 16", url: "https://static.wixstatic.com/media/548938_e7495a8bdde14f54bdd2bc9cc122a855~mv2.png" },
  { name: "Partner 17", url: "https://static.wixstatic.com/media/548938_8e6c1821f3e9431e97486f6b61e126e5~mv2.png" },
  { name: "Partner 18", url: "https://static.wixstatic.com/media/548938_8a22c7bb4f1e49b383e46bc46038b270~mv2.png" },
];

export default function PartnerLogos() {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: false })
  ]);

  return (
    <section className="bg-white pt-[30px] pb-[30px] lg:py-[115px] border-b border-gray-100">
      <div className="w-[100vw] px-[3%]">
        <div className="text-center mb-[42px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Network</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
              Trusted By <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Global Partners</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative">
          {/* Gradient Edges for Blur Effect */}
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Slider */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y items-center">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_auto] min-w-[62px] md:min-w-[90px] px-[2px] md:px-[5px] opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 flex items-center justify-center"
                >
                  <img 
                    src={partner.url} 
                    alt={partner.name} 
                    className="h-[133px] md:h-[200px] w-auto object-contain pointer-events-none" 
                    loading="eager" 
                    decoding="async"
                  />
                </div>
              ))}
              {/* Duplicate for seamless infinite scrolling */}
              {partners.map((partner, index) => (
                <div 
                  key={`dup-${index}`} 
                  className="flex-[0_0_auto] min-w-[62px] md:min-w-[90px] px-[2px] md:px-[5px] opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 flex items-center justify-center"
                >
                  <img 
                    src={partner.url} 
                    alt={partner.name} 
                    className="h-[133px] md:h-[200px] w-auto object-contain pointer-events-none" 
                    loading="eager" 
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
