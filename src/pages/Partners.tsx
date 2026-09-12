import React, { useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import PartnersCtaSection from "@/src/components/PartnersCtaSection";

export default function Partners() {
  // AIO, GEO, and SEO Best Practices: Dynamic Title and Description Updates
  useEffect(() => {
    document.title = "Our Corporate Partners & Sponsorships | Lokmat Events";
    
    // Update Meta Description dynamically for SEO/AIO scrapers
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore elite corporate sponsorship opportunities with Lokmat Premium Events. Review past sponsors, and submit dynamic inquiry decks.");
    }
  }, []);

  // 5 Rows of 9 Logos (45 total) with dummy logo image URLs directly on the white cards
  const logoRows = [
    // Row 1: Left to Right
    [
      { id: 1, logoUrl: "https://static.wixstatic.com/media/548938_3517354234f44387ba169417543cf6aa~mv2.png" },
      { id: 2, logoUrl: "https://static.wixstatic.com/media/548938_ac970b8bb38e4c06ab62afe4ff7852ed~mv2.png" },
      { id: 3, logoUrl: "https://static.wixstatic.com/media/548938_6bd5e52ef4af4570954008648d3e04ce~mv2.png" },
      { id: 4, logoUrl: "https://static.wixstatic.com/media/548938_3b4bed0127944aa5b33d11cdbbac24e9~mv2.png" },
      { id: 5, logoUrl: "https://static.wixstatic.com/media/548938_f11314907d6b495eb5fa71cc5919d826~mv2.png" },
      { id: 6, logoUrl: "https://static.wixstatic.com/media/548938_d101fac150394c7aa0ed80ac6cf4f7f1~mv2.png" },
      { id: 7, logoUrl: "https://static.wixstatic.com/media/548938_1b5fc06a89f445c19f137d6f136d821d~mv2.png" },
      { id: 8, logoUrl: "https://static.wixstatic.com/media/548938_b2d63f4e816840b6a54d382ba524d946~mv2.png" },
      { id: 9, logoUrl: "https://static.wixstatic.com/media/548938_066d9e0bba424ec085faa8d5702baedd~mv2.png" }
    ],
    // Row 2: Right to Left
    [
      { id: 10, logoUrl: "https://static.wixstatic.com/media/548938_a32168812d604607983bdb00b6be345c~mv2.png" },
      { id: 11, logoUrl: "https://static.wixstatic.com/media/548938_30583cbfcfa1499888e13050088d1bc0~mv2.png" },
      { id: 12, logoUrl: "https://static.wixstatic.com/media/548938_daac95562a664c70806356d98de4706d~mv2.png" },
      { id: 13, logoUrl: "https://static.wixstatic.com/media/548938_1855926bd974441699a371c893aa674b~mv2.png" },
      { id: 14, logoUrl: "https://static.wixstatic.com/media/548938_d0167cb40e5e41e7aa72dc5ee6c21446~mv2.png" },
      { id: 16, logoUrl: "https://static.wixstatic.com/media/548938_c1dbcb7fd9cd467e8c753a0d050330a8~mv2.png" },
      { id: 18, logoUrl: "https://static.wixstatic.com/media/548938_53bba9e61e714df2914fa032f50cb7d7~mv2.png" }
    ],
    // Row 3: Left to Right
    [
      { id: 19, logoUrl: "https://static.wixstatic.com/media/548938_7431ab3eafec4e5495559925affbb0bf~mv2.png" },
      { id: 20, logoUrl: "https://static.wixstatic.com/media/548938_8e6c1821f3e9431e97486f6b61e126e5~mv2.png" },
      { id: 21, logoUrl: "https://static.wixstatic.com/media/548938_cf4b4a2b7bc047bb8c4c9bcae8d87ac4~mv2.png" },
      { id: 22, logoUrl: "https://static.wixstatic.com/media/548938_e7e4285de95f4934bd93de609beeb489~mv2.png" },
      { id: 24, logoUrl: "https://static.wixstatic.com/media/548938_be1dd259880d4f4bbf933642df723212~mv2.png" },
      { id: 25, logoUrl: "https://static.wixstatic.com/media/548938_f55f51e524dd47e5980b09c2096cb21e~mv2.png" },
      { id: 26, logoUrl: "https://static.wixstatic.com/media/548938_db9c122f70084373adf1c2fc5d22ec6b~mv2.jpg" },
      { id: 27, logoUrl: "https://static.wixstatic.com/media/548938_a6ebe3ea618b415db60f9054b9b6f4b1~mv2.png" }
    ],
    // Row 4: Right to Left
    [
      { id: 28, logoUrl: "https://static.wixstatic.com/media/548938_2ac54ad5eb724f4eaa5327674d372e89~mv2.png" },
      { id: 29, logoUrl: "https://static.wixstatic.com/media/548938_f6d1731ab80042139b041bfd39f34d13~mv2.png" },
      { id: 30, logoUrl: "https://static.wixstatic.com/media/548938_eeae537d5c474c4d94abd4f2dc932875~mv2.png" },
      { id: 31, logoUrl: "https://static.wixstatic.com/media/548938_7fa4c84f5adc4938a9add3b390b4a311~mv2.png" },
      { id: 32, logoUrl: "https://static.wixstatic.com/media/548938_b05446a40948498f8bae0b350d42fcee~mv2.png" },
      { id: 33, logoUrl: "https://static.wixstatic.com/media/548938_9319c14e1a8740ff8e35f51dafa0a18b~mv2.png" },
      { id: 34, logoUrl: "https://static.wixstatic.com/media/548938_56b600bf754c48f78eb215375f2d9110~mv2.png" },
      { id: 35, logoUrl: "https://static.wixstatic.com/media/548938_e40ae1eadad44c1c98c0f0fdd89c1a14~mv2.png" },
      { id: 36, logoUrl: "https://static.wixstatic.com/media/548938_b59c743a87fb4025969a0c56ca525ea5~mv2.png" }
    ],
    // Row 5: Left to Right
    [
      { id: 37, logoUrl: "https://static.wixstatic.com/media/548938_ad4e3038aa0b4d5a89906d6b0617a29d~mv2.png" },
      { id: 38, logoUrl: "https://static.wixstatic.com/media/548938_ecc926099deb4b88a175c76ac28230c3~mv2.png" },
      { id: 39, logoUrl: "https://static.wixstatic.com/media/548938_a6342a8a08564a48bbf552c82aceb4bb~mv2.png" },
      { id: 40, logoUrl: "https://static.wixstatic.com/media/548938_f21bca8c35fd498694392926bc1e0099~mv2.png" },
      { id: 41, logoUrl: "https://static.wixstatic.com/media/548938_3644eefd24634ef2a2f69ab939784c19~mv2.png" },
      { id: 42, logoUrl: "https://static.wixstatic.com/media/548938_b5a08c1b7950490cb8ec4c15d74d96d0~mv2.png" },
      { id: 43, logoUrl: "https://static.wixstatic.com/media/548938_1e22db883b9c49349ef3a7c6709bda44~mv2.png" },
      { id: 44, logoUrl: "https://static.wixstatic.com/media/548938_f077571078144f82888b7c3f0690a0fb~mv2.png" },
      { id: 45, logoUrl: "https://static.wixstatic.com/media/548938_4261a3583924442f9baf592533ea0e71~mv2.jpg" }
    ]
  ];

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-[100vw] pt-[143px] pb-0 md:pt-[175px] md:pb-0 relative">
        
        {/* Past Sponsors Showcase */}
        <section className="pt-8 pb-[30px] md:pb-20 bg-[#FAFAFA]">
          <div className="w-[100vw] px-[3%]">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Proven Trust</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight text-[#111111]">
                Our Past <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Aligned Brands</span>
              </h2>
            </div>

            <div 
              className="space-y-2 w-full overflow-x-hidden overflow-y-visible py-4 bg-transparent"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
              }}
            >
              {logoRows.map((row, rIdx) => {
                const isLeftToRight = rIdx % 2 === 0;
                const animClass = isLeftToRight ? "animate-marquee-reverse" : "animate-marquee";
                const tripleRow = [...row, ...row, ...row];

                return (
                  <div key={rIdx} className="relative w-full bg-transparent py-2">
                    <div className={`flex gap-7 py-3 bg-transparent ${animClass}`}>
                      {tripleRow.map((brand, bIdx) => (
                        <div
                          key={bIdx}
                          className="w-[196px] sm:w-[224px] md:w-[252px] lg:w-[280px] aspect-[4/3] bg-white border border-gray-200 rounded-xl p-4 shadow-xs hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden z-0 hover:z-20 relative"
                        >
                          <img
                            src={brand.logoUrl}
                            alt="Partner Logo"
                            className="max-h-[70%] max-w-[80%] object-contain rounded-lg transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Create Your Next Big Moment CTA Section */}
        <PartnersCtaSection />
      </main>

      <Footer />
    </div>
  );
}
