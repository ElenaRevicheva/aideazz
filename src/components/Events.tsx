"use client";

import { useContractEvents } from "thirdweb/react";
import { MARKETPLACE } from "@/consts/contracts";

export default function Events() {
  const { data: events, isLoading } = useContractEvents(MARKETPLACE);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Recent Events</h2>
      {isLoading && <p>Loading events...</p>}
      <ul className="space-y-2 text-sm">
        {events?.map((e, index) => (
          <li key={index} className="bg-gray-800/30 p-2 rounded">
            <span className="font-semibold">{e.eventName}</span>{" "}
            {e.transaction.transactionHash.slice(0, 10)}...
          </li>
        ))}
      </ul>
    </div>
  );
}
