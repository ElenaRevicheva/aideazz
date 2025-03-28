// src/components/Events.tsx
"use client";

import { useContractEvents, useContract } from "@thirdweb-dev/react";
import { MARKETPLACE } from "@/consts/contracts";

export default function Events() {
  const { contract } = useContract(MARKETPLACE.address);
  const { data: events, isLoading } = useContractEvents(contract);

  return (
    <div className="p-4 border rounded-md mt-4">
      <h2 className="text-xl font-bold mb-2">📜 Contract Events</h2>
      {isLoading && <p>Loading events...</p>}
      {!isLoading && !events?.length && <p>No events found.</p>}
      {!isLoading &&
        events?.map((event, i) => (
          <div
            key={i}
            className="bg-gray-100 text-sm p-2 rounded my-2 overflow-auto"
          >
            <strong>{event.eventName}</strong>
            <pre>{JSON.stringify(event.data, null, 2)}</pre>
          </div>
        ))}
    </div>
  );
}
