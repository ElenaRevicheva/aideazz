"use client";

import { useListingsQuery } from "thirdweb/react";
import { MARKETPLACE } from "@/consts/contracts";
import { ListingType } from "thirdweb/constants/marketplace";
import Link from "next/link";

export default function ListingGrid() {
  const { data: listings, isLoading } = useListingsQuery(MARKETPLACE);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {isLoading ? (
        <p>Loading listings...</p>
      ) : (
        listings?.map((listing) => (
          <Link
            key={listing.id}
            href={`/${listing.type === ListingType.Auction ? "auction" : "buy"}/${listing.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={listing.asset.image}
              alt={listing.asset.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{listing.asset.name}</h3>
            <p className="text-gray-600">
              Price:{" "}
              {listing.currencyValuePerToken.displayValue}{" "}
              {listing.currencyValuePerToken.symbol}
            </p>
          </Link>
        ))
      )}
    </div>
  );
}
