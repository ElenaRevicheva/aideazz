"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { createAuction } from "thirdweb/extensions/marketplace";
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

// Local NFT type
type NFT = {
  id: string;
};

export default function AuctionListingButton({ nft }: { nft: NFT }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      transaction={() => {
        if (!account) throw new Error("No connected wallet");

        return createAuction({
          contract: MARKETPLACE,
          assetContractAddress: NFT_COLLECTION.address,
          tokenId: BigInt(nft.id),
          buyoutBidAmount: BigInt(0.01 * 1e18).toString(), // ✅ Corrected key
          minimumBidAmount: BigInt(0.001 * 1e18).toString(),
          startTimestamp: new Date(),
          endTimestamp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
      }}
      onTransactionSent={() => {
        toast.loading("Creating auction listing...", {
          id: "auction",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={() => {
        toast.success("Auction listing created!", {
          id: "auction",
          style: toastStyle,
          position: "bottom-center",
        });
        revalidatePath("/");
      }}
      onError={() => {
        toast.error("Failed to create auction", {
          id: "auction",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
      Create Auction
    </TransactionButton>
  );
}
