"use client";

import { useNFT } from "@thirdweb-dev/react";
import { NFT_COLLECTION } from "@/consts/contracts";
import { useParams } from "next/navigation";

export default function NFTComponent() {
  const params = useParams();
  const { data: nft, isLoading } = useNFT(NFT_COLLECTION, params?.nftId as string);

  if (isLoading) return <div>Loading NFT...</div>;
  if (!nft) return <div>NFT not found</div>;

  return (
    <div className="mt-8">
      <img
        src={nft.metadata.image}
        alt={nft.metadata.name}
        className="w-full max-w-sm mx-auto rounded"
      />
      <h2 className="text-2xl font-semibold text-center mt-4">{nft.metadata.name}</h2>
      <p className="text-center text-gray-600 mt-2">{nft.metadata.description}</p>
    </div>
  );
}
