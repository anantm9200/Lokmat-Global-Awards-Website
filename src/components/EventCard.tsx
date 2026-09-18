import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { LokmatEvent } from "@/src/types";
import { formatDate } from "@/src/lib/utils";
import OptimizedImage from "@/src/components/OptimizedImage";
import { getLocationLogo } from "@/src/locationLogos";

interface EventCardProps {
  event: LokmatEvent;
  index?: number;
  hideLocationYear?: boolean;
  hideTag?: boolean;
  showCityYearOnly?: boolean;
}

export function getEventCityYear(event: { id?: string; location?: string; title?: string }): string {
  const str = `${event.id || ''} ${event.location || ''} ${event.title || ''}`.toLowerCase();
  
  if (str.includes("hong-kong") || str.includes("hong kong") || str.includes("macau")) {
    return "Hong Kong, 2025";
  }
  if (str.includes("mauritius")) {
    return "Mauritius, 2026";
  }
  if (str.includes("cairo") || str.includes("egypt")) {
    return "Cairo, 2026";
  }
  if (str.includes("london")) {
    return "London, 2025";
  }
  if (str.includes("singapore") || event.id === "1") {
    return "Singapore, 2024";
  }
  if (str.includes("baku")) {
    return "Baku, 2024";
  }
  if (str.includes("dubai")) {
    return "Dubai, 2023";
  }
  if (event.title && event.title.includes(" – ")) {
    const parts = event.title.split(" – ");
    return (parts[1] || parts[0]).replace(/\s*&\s*Macau/gi, "").trim();
  }
  return (event.title || "").replace(/\s*&\s*Macau/gi, "").trim();
}

const EventCard: React.FC<EventCardProps> = ({ event, index = 0, hideLocationYear = false, hideTag = false, showCityYearOnly = false }) => {
  const logo = event.logoUrl || getLocationLogo(event.location || event.title);

  return (
    <Link to={`/event/${event.id}`} className="block w-full h-full" onClick={() => window.scrollTo(0,0)}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col xl:flex-row gap-6 p-6 w-full h-full items-stretch bg-white border border-gray-200 hover:border-red-600 transition-colors rounded-[20px] cursor-pointer"
      >
      {/* Visual Anchor */}
      <div className="w-full xl:w-[45%] overflow-hidden rounded-[14px] bg-gray-50 relative border border-gray-100 shadow-sm flex-shrink-0 min-h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-t from-[black]/30 to-transparent z-10" />
        <motion.div 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 w-full h-full"
        >
          <OptimizedImage 
            src={event.imageUrl} 
            alt={event.title}
            className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </motion.div>
        {!hideTag && event.category && (
          <div className="absolute top-4 left-4 z-20">
            <span className={`px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-white/95 backdrop-blur-md shadow-sm ${event.category.includes('Upcoming') ? 'text-red-600 animate-pulse' : 'text-[#111111]'}`}>
              {event.category}
            </span>
          </div>
        )}
        {logo && (
          <div className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-white/95 p-1.5 shadow-md backdrop-blur-md flex items-center justify-center border border-gray-100">
            <img src={logo} alt={`${event.location} Logo`} className="w-full h-full object-contain" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center space-y-4 pb-16 xl:pb-0 relative">
        <div className="space-y-3">
          <h3 className="text-xl lg:text-2xl font-bold leading-tight text-[#111111] group-hover:text-red-600 transition-colors duration-300">
            {showCityYearOnly ? (
              <span>{getEventCityYear(event)}</span>
            ) : (() => {
              const parts = event.title.split(' – ');
              const eventName = parts[0];
              const eventPlaceYear = parts[1];
              return (
                <span className="inline-flex flex-wrap items-baseline gap-x-2">
                  <span>{eventName}</span>
                  {!hideLocationYear && eventPlaceYear && (
                    <span className="font-normal text-gray-500 text-base lg:text-lg">
                      – {eventPlaceYear.replace(/\s*&\s*Macau/gi, "")}
                    </span>
                  )}
                </span>
              );
            })()}
          </h3>
          <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-4">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 pt-2 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <span className="text-base">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="text-base">{event.location?.replace(/\s*&\s*Macau/gi, "")}</span>
          </div>
        </div>
      </div>
      
      {/* Decorative arrow */}
      <div className="absolute bottom-6 right-6 flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border border-red-600 text-red-600 group-hover:border-red-600 group-hover:bg-red-600 flex items-center justify-center group-hover:text-white bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 cursor-pointer">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

export default EventCard;
