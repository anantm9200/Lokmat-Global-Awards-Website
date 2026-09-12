import React, { useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import { Link } from "react-router-dom";
import Footer from "@/src/components/Footer";
import { useEvents } from "@/src/hooks/useEvents";
import { formatDate } from "@/src/lib/utils";
import OptimizedImage from "@/src/components/OptimizedImage";

export default function UpcomingEvents() {
  const { events, loading, error } = useEvents();
  const upcomingEventsList = events.filter((e) => e.category.includes("Upcoming"));

  // AIO, GEO, and SEO Best Practices: Dynamic Title and Description Updates
  useEffect(() => {
    document.title = "Upcoming Elite Summits & Conclaves | Lokmat Events";
    
    // Update Meta Description dynamically for SEO/AIO scrapers
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore the official schedules, locations, and details of upcoming Lokmat Premium Events, Conclaves, and prestigious National Awards ceremonies.");
    }
  }, []);

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-[100vw] pt-[159px] pb-[30px] md:pt-[195px] md:pb-32 px-[3%] relative">
        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-700 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
              Upcoming Events
            </h1>
            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed mb-[60px] md:mb-16 max-w-3xl mx-auto">
              Explore upcoming Lokmat events, awards, conclaves and forums <br className="hidden md:block" /> designed for influential audiences, powerful conversations and national visibility.
            </p>
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {loading ? (
                <div className="animate-pulse col-span-1 md:col-span-2 flex flex-col gap-8 w-full">
                    <div className="h-48 bg-gray-100 rounded-2xl w-full animate-pulse"></div>
                    <div className="h-48 bg-gray-100 rounded-2xl w-full animate-pulse"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-600 py-10 col-span-1 md:col-span-2">Failed to load events.</div>
              ) : upcomingEventsList.length === 0 ? (
                <div className="text-center text-gray-400 py-10 col-span-1 md:col-span-2">No upcoming events currently available.</div>
              ) : (
                upcomingEventsList.map((event) => (
                    <div key={event.id} className="group border border-gray-200 bg-white rounded-2xl p-6 flex flex-col gap-8 transition-colors duration-300 hover:border-red-200 hover:shadow-xl w-full">
                       <Link to={`/event/${event.id}`} className="w-full aspect-[16/7.7] bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 font-mono text-sm relative overflow-hidden" style={{ aspectRatio: "16 / 7.7" }}>
                          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest shadow-md animate-pulse">Open</div>
                          <OptimizedImage src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                       </Link>
                       
                       <div className="flex-1 flex flex-col justify-start gap-4">
                           <div className="flex items-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
                               <span>{formatDate(event.date)}</span>
                               <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                               <span>{event.location.split(',')[0]}</span>
                           </div>
                           <Link to={`/event/${event.id}`}>
                               <h2 className="text-2xl md:text-3xl font-bold leading-tight transition-colors duration-300 group-hover:text-red-600">
                                   {(() => {
                                     const parts = event.title.split(' – ');
                                     const eventName = parts[0];
                                     const eventPlaceYear = parts[1];
                                     return (
                                       <span className="inline-flex flex-wrap items-baseline gap-x-2">
                                         <span>{eventName}</span>
                                         {eventPlaceYear && (
                                           <span className="font-normal text-gray-500 text-lg md:text-xl">
                                             – {eventPlaceYear}
                                           </span>
                                         )}
                                       </span>
                                     );
                                   })()}
                               </h2>
                           </Link>
                           <p className="text-gray-500 font-light leading-relaxed mb-4 line-clamp-3">
                               {event.description}
                           </p>
                           <Link to={`/event/${event.id}`} className="inline-flex max-w-max px-8 py-4 bg-[#111111] text-white rounded-2xl font-bold tracking-widest uppercase text-sm hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-md mt-auto">
                               View Event
                           </Link>
                       </div>
                    </div>
                ))
              )}
            </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
