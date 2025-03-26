"use client";

import NFTGrid from "@/components/NFTGrid";
import ListingGrid from "@/components/ListingGrid";

export default function MarketplacePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Listings</h1>
      <ListingGrid />
      <h2 className="text-2xl font-semibold mt-12 mb-4">Explore NFTs</h2>
      <NFTGrid />
    </main>
  );
}
