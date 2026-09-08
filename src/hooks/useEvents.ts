import { useEffect, useState } from "react";
import { LokmatEvent } from "@/src/types";
import { staticEvents } from "@/src/eventsData";

export function useEvents() {
  const [events, setEvents] = useState<LokmatEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = () => {
    setLoading(true);
    try {
      // Load user-added events from localStorage
      const localData = localStorage.getItem("lokmat_custom_events");
      const customEvents: LokmatEvent[] = localData ? JSON.parse(localData) : [];
      
      // Combine static events and user-added custom events
      // Avoid duplicate IDs if any
      const customIds = new Set(customEvents.map(e => e.id));
      const filteredStatic = staticEvents.filter(e => !customIds.has(e.id));
      
      const allEvents = [...customEvents, ...filteredStatic];
      
      // Sort by event year descending (latest to oldest), then by createdAt descending
      const getYear = (e: LokmatEvent) => {
        const match = e.date.match(/\b\d{4}\b/) || e.title.match(/\b\d{4}\b/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const sortedEvents = allEvents.sort((a, b) => {
        const yearA = getYear(a);
        const yearB = getYear(b);
        if (yearB !== yearA) return yearB - yearA;
        return b.createdAt - a.createdAt;
      });

      setEvents(sortedEvents);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while loading events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (eventData: Omit<LokmatEvent, "id" | "createdAt">) => {
    try {
      const newEvent: LokmatEvent = {
        ...eventData,
        id: "custom-" + Math.random().toString(36).substring(2, 9),
        createdAt: Date.now(),
      };
      
      const localData = localStorage.getItem("lokmat_custom_events");
      const customEvents: LokmatEvent[] = localData ? JSON.parse(localData) : [];
      
      const updatedCustom = [newEvent, ...customEvents];
      localStorage.setItem("lokmat_custom_events", JSON.stringify(updatedCustom));
      
      setEvents((prev) => [newEvent, ...prev]);
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  };

  return { events, loading, error, addEvent, refetch: fetchEvents };
}
