"use client";

import { NFT } from "thirdweb/react";
import { useParams } from "next/navigation";
import { useNFTQuery } from "thirdweb/react";
import { NFT_COLLECTION } from "@/consts/contracts";
import Image from "next/image";

export default function NFTPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: nft, isLoading } = useNFTQuery(NFT_COLLECTION, id);

  if (isLoading) return <p>Loading NFT...</p>;
  if (!nft) return <p>NFT not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <Image
          src={nft.metadata.image || "/fallback.png"}
          alt={nft.metadata.name || "NFT"}
          width={500}
          height={500}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{nft.metadata.name}</h1>
          <p className="text-gray-700 mb-4">{nft.metadata.description}</p>
          <ul className="text-sm text-gray-500">
            <li><strong>Token ID:</strong> {nft.id}</li>
            <li><strong>Owner:</strong> {nft.owner}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
