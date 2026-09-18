import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { LokmatEvent } from "@/src/types";
import { formatDate } from "@/src/lib/utils";
import OptimizedImage from "@/src/components/OptimizedImage";

interface Props {
  event: LokmatEvent;
  hideTag?: boolean;
}

const AlternativeEventCard: React.FC<Props> = ({ event, hideTag = true }) => {
  return (
    <Link to={`/event/${event.id}`} className="group block h-full" onClick={() => window.scrollTo(0,0)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1"
      >
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <OptimizedImage 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-4 left-4 z-20 flex gap-2 flex-wrap">
             <div className="flex items-center gap-1.5 text-white text-xs font-medium bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                <Calendar className="w-3 h-3" />
                {formatDate(event.date)}
             </div>
             <div className="flex items-center gap-1.5 text-white text-xs font-medium bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                <MapPin className="w-3 h-3" />
                {event.location}
             </div>
          </div>
          {!hideTag && (
            <div className="absolute top-4 right-4 z-20">
               <span className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-md">
                  {event.category.replace("Past ", "").replace("Upcoming ", "")}
               </span>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors line-clamp-3 leading-tight">
            {(() => {
              const parts = event.title.split(' – ');
              const eventName = parts[0];
              const eventPlaceYear = parts[1];
              return (
                <span className="inline-flex flex-wrap items-baseline gap-x-2">
                  <span>{eventName}</span>
                  {eventPlaceYear && (
                    <span className="font-normal text-gray-500 text-sm">
                      – {eventPlaceYear}
                    </span>
                  )}
                </span>
              );
            })()}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-3 flex-grow">
            {event.description}
          </p>
          <div className="flex items-center text-red-600 font-semibold text-xs gap-2 uppercase tracking-widest mt-6">
            View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
export default AlternativeEventCard;
