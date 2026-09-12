import Navbar from "@/src/components/Navbar";
import { Link } from "react-router-dom";
import Footer from "@/src/components/Footer";
import { useEvents } from "@/src/hooks/useEvents";
import EventCard from "@/src/components/EventCard";

export default function AllEvents() {
  const { events, loading, error } = useEvents();

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-[100vw] pt-[159px] pb-[30px] md:pt-[195px] md:pb-32 px-[3%] relative">
        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-700 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
              All Events
            </h1>
            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed mb-[60px] md:mb-16 max-w-3xl mx-auto">
              Discover Lokmat’s flagship events, awards, summits and forums <br className="hidden md:block" /> celebrating excellence, influential voices and meaningful conversations across India and beyond.
            </p>
            
            <div className="w-full text-left">
              {loading ? (
                <div className="animate-pulse flex flex-col gap-8 w-full">
                  <div className="h-64 bg-gray-100 rounded-2xl w-full"></div>
                  <div className="h-64 bg-gray-100 rounded-2xl w-full"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-600 py-10">Failed to load events.</div>
              ) : events.length === 0 ? (
                <div className="text-center text-gray-400 py-10">No events currently available.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
                   {events.map((event, index) => (
                       <EventCard key={event.id} event={event} index={index} />
                   ))}
                </div>
              )}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
