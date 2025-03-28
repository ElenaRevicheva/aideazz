"use client";

import {
  useActiveWallet,
  useContract,
} from "@thirdweb-dev/react";
import { MARKETPLACE } from "@/consts/contracts";
import { client, polygon } from "@/lib/client";
import { useEffect, useState } from "react";
import NFT from "./NFT";
import { Listing } from "@thirdweb-dev/sdk";

export default function ListingGrid() {
  const wallet = useActiveWallet();
  const { contract: marketplace } = useContract(MARKETPLACE, {
    client,
    chain: polygon,
  });

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      if (!marketplace) return;
      setLoading(true);
      try {
        const activeListings = await marketplace.directListings.getAll();
        setListings(activeListings);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
      setLoading(false);
    };

    fetchListings();
  }, [marketplace]);

  if (loading) return <p>Loading listings...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {listings.map((listing) => (
        <NFT key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
