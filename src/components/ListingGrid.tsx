"use client";

import { useEffect, useState } from "react";
import { MARKETPLACE } from "@/consts/contracts";
import { getAllListings } from "thirdweb/extensions/marketplace";
import { ListingType } from "thirdweb/constants/marketplace";
import Link from "next/link";

// ✅ Inferred Listing type
type Listing = Awaited<ReturnType<typeof getAllListings>>[0];

export default function ListingGrid() {
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listings = await getAllListings({ contract: MARKETPLACE });
        setListings(listings);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchListings();
  }, []);

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
              Price: {listing.currencyValuePerToken.displayValue}{" "}
              {listing.currencyValuePerToken.symbol}
            </p>
          </Link>
        ))
      )}
    </div>
  );
}
