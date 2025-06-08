"use client";

import React, { useEffect, useState } from "react";
import { NFT as NFTType } from "thirdweb";
import { getNFTs } from "thirdweb/extensions/erc721";
import { NFT_COLLECTION } from "@/consts/contracts";
import NFTGrid, { NFTGridLoading } from "@/components/NFT/NFTGrid";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";

export default function BuyPage() {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<NFTType[]>([]);

  useEffect(() => {
    async function fetchNFTs() {
      try {
        const fetched = await getNFTs({ contract: NFT_COLLECTION });
        setNfts(fetched);
      } catch (err) {
        console.error("❌ Failed to fetch NFTs:", err);
        toast.error("Could not load NFTs", {
          position: "bottom-center",
          style: toastStyle,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchNFTs();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Browse AI Agents</h1>

      {loading ? (
        <NFTGridLoading />
      ) : (
        <NFTGrid
          nftData={nfts.map((nft) => ({ tokenId: nft.id }))}
          emptyText="No NFTs found. Check back later!"
        />
      )}
    </div>
  );
}

