import React, { useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import { Link } from "react-router-dom";
import Footer from "@/src/components/Footer";
import { motion } from "motion/react";
import OptimizedImage from "@/src/components/OptimizedImage";

export default function Articles() {
  // AIO, GEO, and SEO Best Practices: Dynamic Title and Description Updates
  useEffect(() => {
    document.title = "Insights & Press Articles | Lokmat Events";
    
    // Update Meta Description dynamically for SEO/AIO scrapers
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Browse the latest press coverage, editorial articles, and cultural insights from Lokmat's events and national awards conclaves.");
    }
  }, []);

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-[100vw] pt-[159px] pb-[30px] md:pt-[195px] md:pb-32 px-[3%] relative">
        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-700 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
              Articles
            </h1>
            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed mb-[60px] md:mb-16 max-w-3xl mx-auto">
              Read the latest stories, insights and perspectives from Lokmat’s events, <br className="hidden md:block" /> awards and leadership platforms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left">
                {/* Placeholder contents */}
                {[
                  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1557425955-df376b5903c8?w=800&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?w=800&auto=format&fit=crop&q=60"
                ].map((imgUrl, idx) => {
                    const i = idx + 1;
                    return (
                    <div key={i} className="group border border-gray-200 rounded-xl p-6 flex flex-col transition-colors duration-300 hover:border-red-200 hover:bg-neutral-50 h-full cursor-pointer">
                          <div className="h-48 rounded-lg mb-6 w-full overflow-hidden">
                              <OptimizedImage src={imgUrl} alt={`Article ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Category</h3>
                          <h2 className="text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-red-600 mb-4">
                              How Lokmat is Shaping the Future of Regional Journalism {i}
                          </h2>
                          <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 flex-1">
                              An exploration into the evolution of news media and how regional stories are finding a global platform through innovative content strategies.
                          </p>
                          <div className="mt-auto text-sm font-medium text-gray-500">
                              Oct 24, 2026 • 5 min read
                          </div>
                    </div>
                )})}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
