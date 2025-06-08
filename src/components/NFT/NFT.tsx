"use client";

import React, { useEffect, useState } from "react";
import { useActiveAccount, MediaRenderer } from "thirdweb/react";
import { NFT_COLLECTION } from "@/consts/contracts";
import client from "@/lib/client";
import { NFT as NFTType } from "thirdweb";
import { getNFT } from "thirdweb/extensions/erc721";

type NFTProps = {
  tokenId: bigint;
  overrideOnclickBehavior?: (nft: NFTType) => void;
};

export const NFT = ({ tokenId, overrideOnclickBehavior }: NFTProps) => {
  const account = useActiveAccount();
  const [nft, setNft] = useState<NFTType>();

  useEffect(() => {
    if (!account) return;

    getNFT({
      contract: NFT_COLLECTION,
      tokenId,
    })
      .then(setNft)
      .catch((err: unknown) => {
        console.error("Failed to fetch NFT", err);
      });
  }, [account, tokenId]);

  if (!nft) {
    return (
      <div className="w-full aspect-square animate-pulse rounded-lg bg-white/[.04]" />
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden border rounded-lg cursor-pointer group border-white/10 bg-white/[.02] hover:border-white/20"
      onClick={() => overrideOnclickBehavior?.(nft)}
    >
      <MediaRenderer
        client={client}
        src={nft.metadata.image}
        className="w-full aspect-square object-cover"
      />
      <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-60 backdrop-blur">
        <p className="text-sm font-medium truncate">{nft.metadata.name}</p>
        <p className="text-xs text-white/60">Token #{nft.id.toString()}</p>
      </div>
    </div>
  );
};

// ✅ This is the line that fixes your build
export default NFT;
