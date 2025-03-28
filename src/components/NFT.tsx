"use client";

import { Listing } from "@thirdweb-dev/sdk";
import Image from "next/image";

interface NFTProps {
  listing: Listing;
}

export default function NFT({ listing }: NFTProps) {
  const metadata = listing.asset;

  return (
    <div className="border rounded-lg shadow-md p-4">
      {metadata.image && typeof metadata.image === "string" && (
        <Image
          src={metadata.image}
          alt={metadata.name || "NFT"}
          width={300}
          height={300}
          className="rounded-lg mb-4"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{metadata.name}</h2>
      <p className="text-sm text-gray-600">{metadata.description}</p>
      <p className="mt-2 text-green-600 font-bold">
        Price: {listing.buyoutPricePerToken} MATIC
      </p>
    </div>
  );
}
