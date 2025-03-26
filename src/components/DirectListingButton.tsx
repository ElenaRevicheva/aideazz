"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { createListing } from "thirdweb/extensions/marketplace";
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts";
import { NFT } from "thirdweb/sdk";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

export default function DirectListingButton({ nft }: { nft: NFT }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      transaction={() => {
        if (!account) throw new Error("No connected wallet");
        return createListing({
          contract: MARKETPLACE,
          assetContractAddress: NFT_COLLECTION.address,
          tokenId: nft.id,
          pricePerToken: BigInt(0.01 * 1e18),
          startTimestamp: BigInt(Math.floor(Date.now() / 1000)),
          endTimestamp: BigInt(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60),
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
        toast.error("Failed to create listing", {
          id: "direct",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
      Create Listing
    </TransactionButton>
  );
}
