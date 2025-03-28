"use client";

import React from "react";
import {
  useContract,
  useActiveListings,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "@/consts/contracts";

export const NFTGrid = () => {
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const {
    data: listings,
    isLoading,
    error,
  } = useActiveListings(contract);

  if (isLoading) return <div>Loading AI Agents...</div>;
  if (error) return <div>Error loading listings: {error.message}</div>;
  if (!listings || listings.length === 0) return <div>No AI Agents listed yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <div key={listing.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
          <img
            src={listing.asset.image}
            alt={listing.asset.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold">{listing.asset.name}</h2>
          <p className="text-gray-600 text-sm mb-2">{listing.asset.description}</p>
          <p className="text-indigo-600 font-bold">
            {listing.currencyValuePerToken.displayValue}{" "}
            {listing.currencyValuePerToken.symbol}
          </p>
        </div>
      ))}
    </div>
  );
};
