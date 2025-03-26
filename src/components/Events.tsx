"use client";

import { useContractEvents } from "thirdweb/react";
import { MARKETPLACE } from "@/consts/contracts";

export default function Events() {
  const { data: events, isLoading } = useContractEvents({
    contract: MARKETPLACE,
    onEvents: () => {},
  });

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Marketplace Events</h2>
      {isLoading ? (
        <p>Loading events...</p>
      ) : (
        <ul className="list-disc list-inside">
          {events?.map((event, index) => (
            <li key={index}>
              <strong>{event.eventName}</strong> —{" "}
              {JSON.stringify(event.data ?? {}, null, 2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
