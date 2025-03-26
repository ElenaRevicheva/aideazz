"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { makeOffer } from "thirdweb/extensions/marketplace";
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts";
import { NFT } from "thirdweb/sdk";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

export default function MakeOfferButton({ nft }: { nft: NFT }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      transaction={() => {
        if (!account) throw new Error("No connected wallet");
        return makeOffer({
          contract: MARKETPLACE,
          assetContractAddress: NFT_COLLECTION.address,
          tokenId: nft.id,
          totalPrice: BigInt(0.005 * 1e18),
        });
      }}
      onTransactionSent={() => {
        toast.loading("Submitting offer...", {
          id: "offer",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={() => {
        toast.success("Offer submitted!", {
          id: "offer",
          style: toastStyle,
          position: "bottom-center",
        });
        revalidatePath("/");
      }}
      onError={() => {
        toast.error("Failed to submit offer", {
          id: "offer",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
      Make Offer
    </TransactionButton>
  );
}
