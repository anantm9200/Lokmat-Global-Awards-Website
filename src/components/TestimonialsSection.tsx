import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ExternalLink } from "lucide-react";

interface TestimonialDoc {
  id: string;
  name: string;
  designation: string;
  image: string;
}

const testimonialDocs: TestimonialDoc[] = [
  {
    id: "doc-1",
    name: "Gautam Adani",
    designation: "Chairman, Adani Group",
    image: "https://static.wixstatic.com/media/548938_ea4af470ce28422085569bdc00372c32~mv2.jpeg",
  },
  {
    id: "doc-2",
    name: "Anil Agarwal",
    designation: "Founder and Chairman, Vedanta Resources Ltd.",
    image: "https://static.wixstatic.com/media/548938_2b48a88bbf344fc8954797f2e8d28070~mv2.jpeg",
  },
  {
    id: "doc-3",
    name: "Devendra Fadnavis",
    designation: "Chief Minister, Maharashtra",
    image: "https://static.wixstatic.com/media/548938_fbcae05000ae425bbf99bec67d9915bc~mv2.jpeg",
  },
  {
    id: "doc-4",
    name: "Nitin Gadkari",
    designation: "Minister Road and Highways Transport, Govt of India",
    image: "https://static.wixstatic.com/media/548938_578521094b6a40849875f817e222c45f~mv2.jpeg",
  },
  {
    id: "doc-5",
    name: "Piyush Goyal",
    designation: "Minister of Commerce & Industry, Govt of India",
    image: "https://static.wixstatic.com/media/548938_d4c3569faac243a29361278a7cd62c48~mv2.jpeg",
  },
  {
    id: "doc-6",
    name: "Vikram Doraiswami",
    designation: "High Commissioner",
    image: "https://static.wixstatic.com/media/548938_d12c8f34d42a4453bdec205253fe7c0b~mv2.jpeg",
  },
  {
    id: "doc-7",
    name: "Sanjay Hinduja",
    designation: "Hinduja Group",
    image: "https://static.wixstatic.com/media/548938_1d099968bdd4416d9d800c9233a26b32~mv2.jpeg",
  },
  {
    id: "doc-8",
    name: "Sajjan Jindal",
    designation: "Chairman, JSW Group",
    image: "https://static.wixstatic.com/media/548938_d509b04fd1124c7fb694b394ba35d02e~mv2.jpeg",
  },
];

export default function TestimonialsSection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1.2, stopOnInteraction: false, stopOnMouseEnter: false })]
  );

  const handleOpenImage = (imageUrl: string) => {
    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="border-t border-gray-100 bg-[#FAFAFA] pt-[30px] pb-[30px] md:py-24 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-[100vw] px-[3%] relative z-10">
        {/* Section Title - Matching exact font style, size, and gradient underline across the site */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 md:mb-14 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 block">
              Endorsements & Accolades
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
              Testimonials & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Letters of Appreciation</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mt-6"></div>
          </motion.div>
        </div>

        {/* Sliding A4 Gallery Container */}
        <div className="relative -mx-[3%] px-[3%]">
          {/* Gradient Blur Overlay Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

          {/* Continuous Embla Marquee Carousel with ample vertical padding for full shadow visibility */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing py-8 -my-4" ref={emblaRef}>
            <div className="flex touch-pan-y gap-5 sm:gap-7 items-center px-3">
              {/* Primary Item Set */}
              {testimonialDocs.map((doc, idx) => (
                <div
                  key={`${doc.id}-${idx}`}
                  className="flex-[0_0_auto] w-[220px] sm:w-[260px] md:w-[280px] lg:w-[310px] p-2"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    onClick={() => handleOpenImage(doc.image)}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(220,38,38,0.12)] transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* A4 Format Image Container (Aspect ratio 210/297) */}
                    <div className="relative w-full aspect-[210/297] bg-gray-100 overflow-hidden">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Clean Hover Overlay - Just "View Now" */}
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <span className="inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                          <span>View Now</span>
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Card Footer Summary - Name and Designation only */}
                    <div className="p-4 bg-white border-t border-gray-100 flex flex-col justify-center min-h-[72px]">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                        {doc.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-500 mt-1 line-clamp-1 font-medium">
                        {doc.designation}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Duplicate Set for Seamless Infinite Scrolling */}
              {testimonialDocs.map((doc, idx) => (
                <div
                  key={`dup-${doc.id}-${idx}`}
                  className="flex-[0_0_auto] w-[220px] sm:w-[260px] md:w-[280px] lg:w-[310px] p-2"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    onClick={() => handleOpenImage(doc.image)}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(220,38,38,0.12)] transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* A4 Format Image Container (Aspect ratio 210/297) */}
                    <div className="relative w-full aspect-[210/297] bg-gray-100 overflow-hidden">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Clean Hover Overlay - Just "View Now" */}
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <span className="inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                          <span>View Now</span>
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Card Footer Summary - Name and Designation only */}
                    <div className="p-4 bg-white border-t border-gray-100 flex flex-col justify-center min-h-[72px]">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                        {doc.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-500 mt-1 line-clamp-1 font-medium">
                        {doc.designation}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

