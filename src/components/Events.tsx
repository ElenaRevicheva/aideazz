"use client";

import { useContractEvents } from "@thirdweb-dev/react";
import { MARKETPLACE } from "@/consts/contracts";

export default function Events() {
  const { data: events, isLoading } = useContractEvents(MARKETPLACE);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recent Marketplace Events</h2>
      {isLoading ? (
        <p>Loading events...</p>
      ) : (
        <ul className="space-y-2">
          {events?.map((event, index) => (
            <li key={index} className="border rounded p-3">
              <p className="text-sm font-semibold">Event: {event.eventName}</p>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(event.data, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
