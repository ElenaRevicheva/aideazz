"use client";

import React from "react";
import { NFT as NFTType } from "thirdweb";
import { DirectListing, EnglishAuction } from "thirdweb/extensions/marketplace";
import { NFT } from "./NFT"; // ✅ using named export now

type Props = {
  nftData: { tokenId: bigint }[];
  listings?: DirectListing[];
  auctions?: EnglishAuction[];
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
};

export default function NFTGrid({
  nftData,
  overrideOnclickBehavior,
  emptyText,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {nftData.length > 0 ? (
        nftData.map((nft, idx) => (
          <NFT
            key={idx}
            tokenId={nft.tokenId}
            overrideOnclickBehavior={overrideOnclickBehavior}
          />
        ))
      ) : (
        <p className="col-span-full mt-8 text-center text-white/60">{emptyText}</p>
      )}
    </div>
  );
}

// ✅ Optional loading placeholder if needed
export function NFTGridLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className="w-full aspect-square animate-pulse rounded-lg bg-white/[.04]"
        />
      ))}
    </div>
  );
}
