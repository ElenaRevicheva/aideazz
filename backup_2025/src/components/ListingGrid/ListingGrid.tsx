"use client";

import { useContract, useContractRead } from "@thirdweb-dev/react";
import { MARKETPLACE } from "@/consts/contracts";
import Link from "next/link";

export default function ListingGrid() {
  const { contract: marketplace } = useContract(MARKETPLACE.address);
  const { data: listings, isLoading } = useContractRead(
    marketplace,
    "getActiveListings"
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {isLoading ? (
        <p>Loading listings...</p>
      ) : (
        listings?.map((listing: any) => (
          <Link
            key={listing.id}
            href={`/buy/${listing.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={listing.asset.image}
              alt={listing.asset.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              {listing.asset.name}
            </h3>
            <p className="text-gray-600">
              Price: {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
              {listing.buyoutCurrencyValuePerToken.symbol}
            </p>
          </Link>
        ))
      )}
    </div>
  );
}
