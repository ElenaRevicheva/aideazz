"use client";

import { TransactionButton, useActiveAccount } from "@thirdweb-dev/react";
import { createListing } from "@thirdweb-dev/sdk";
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts";
import type { NFT } from "@thirdweb-dev/sdk";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

export default function DirectListingButton({ nft }: { nft: NFT }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      disabled={!account}
      transaction={() => {
        if (!account) throw new Error("No connected wallet");

        return createListing({
          contract: MARKETPLACE,
          assetContractAddress: NFT_COLLECTION.address,
          tokenId: nft.id,
          pricePerToken: BigInt(0.01 * 1e18).toString(),
          startTimestamp: new Date(),
          endTimestamp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
        });
      }}
      onTransactionSent={() => {
        toast.loading("Creating listing...", {
          id: "direct-listing",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={() => {
        toast.success("Listing created!", {
          id: "direct-listing",
          style: toastStyle,
          position: "bottom-center",
        });
        revalidatePath("/");
      }}
      onError={() => {
        toast.error("Failed to create listing", {
          id: "direct-listing",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
      Create Direct Listing
    </TransactionButton>
  );
}
