"use client";

import { useNFT } from "thirdweb/react";
import { NFT_COLLECTION } from "@/consts/contracts";
import Image from "next/image";

export default function NFTCard({ tokenId }: { tokenId: string }) {
  const { data: nft, isLoading } = useNFT(NFT_COLLECTION, tokenId);

  if (isLoading) return <p>Loading NFT...</p>;
  if (!nft) return <p>NFT not found</p>;

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <Image
        src={nft.metadata.image}
        alt={nft.metadata.name}
        width={400}
        height={400}
        className="rounded-lg"
      />
      <h2 className="text-lg font-semibold mt-4">{nft.metadata.name}</h2>
      <p className="text-sm opacity-75">{nft.metadata.description}</p>
    </div>
  );
}
