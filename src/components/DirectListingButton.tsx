"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { createListing } from "thirdweb/extensions/marketplace";
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

// 💡 Use a simple local type for NFT
type NFT = {
  id: string;
};

export default function DirectListingButton({ nft }: { nft: NFT }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      transaction={() => {
        if (!account) throw new Error("No connected wallet");

        return createListing({
          contract: MARKETPLACE,
          assetContractAddress: NFT_COLLECTION.address,
          tokenId: BigInt(nft.id),
          pricePerToken: BigInt(0.01 * 1e18).toString(),
          startTimestamp: new Date(),
          endTimestamp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          quantity: BigInt(1),
        });
      }}
      onTransactionSent={() => {
        toast.loading("Creating direct listing...", {
          id: "direct",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={() => {
        toast.success("Direct listing created!", {
          id: "direct",
          style: toastStyle,
          position: "bottom-center",
        });
        revalidatePath("/");
      }}
      onError={() => {
        toast.error("Failed to create direct listing", {
          id: "direct",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
      Create Direct Listing
    </TransactionButton>
  );
}
