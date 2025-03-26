"use client";

import { useListings } from "thirdweb/react";
import { MARKETPLACE } from "@/consts/contracts";
import { ListingType } from "thirdweb/constants/marketplace";
import Link from "next/link";

export default function ListingGrid() {
  const { data: listings, isLoading } = useListings(MARKETPLACE);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {isLoading && <p>Loading listings...</p>}
      {listings?.map((listing) => (
        <Link
          href={`/listing/${listing.id}`}
          key={listing.id}
          className="rounded-lg border border-gray-300 p-4 shadow-md hover:shadow-xl transition"
        >
          <p className="font-semibold">{listing.asset.name}</p>
          <img
            src={listing.asset.image}
            alt={listing.asset.name}
            className="w-full h-48 object-cover mt-2 rounded"
          />
          <p className="text-sm mt-2">
            Price:{" "}
            {listing.type === ListingType.Auction
              ? `${listing.buyoutCurrencyValuePerToken.displayValue} (auction)`
              : `${listing.currencyValuePerToken.displayValue} ${listing.currencyValuePerToken.symbol}`}
          </p>
        </Link>
      ))}
    </div>
  );
}
