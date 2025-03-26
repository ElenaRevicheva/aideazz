"use client";

import { TransactionButton, useActiveAccount } from "@thirdweb-dev/react";
import { makeOffer, type NFT } from "@thirdweb-dev/sdk";
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

export default function MakeOfferButton({ nft }: { nft: NFT }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      disabled={!account}
      transaction={() => {
        if (!account) throw new Error("No connected wallet");

        return makeOffer({
          contract: MARKETPLACE,
          assetContractAddress: NFT_COLLECTION.address,
          tokenId: nft.id,
          totalPrice: BigInt(0.002 * 1e18),
        });
      }}
      onTransactionSent={() => {
        toast.loading("Making offer...", {
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
        toast.error("Offer failed", {
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
