"use client";

import { useEffect, useState } from "react";
import { MARKETPLACE } from "@/consts/contracts";
import { getAllEvents } from "thirdweb/extensions/marketplace";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const allEvents = await getAllEvents({
          contract: MARKETPLACE,
        });
        setEvents(allEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Marketplace Events</h2>
      {isLoading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="border rounded p-4 text-sm">
              <strong>{event.eventName}</strong>: {JSON.stringify(event)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
