"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { makeOffer } from "thirdweb/extensions/marketplace-erc721";
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

export default function MakeOfferButton({ nft }: { nft: { id: string } }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      disabled={!account}
      transaction={() => {
        if (!account) throw new Error("No account");

        return makeOffer({
          contract: MARKETPLACE,
          assetContractAddress: NFT_COLLECTION.address,
          tokenId: nft.id,
          price: "2000000000000000", // 0.002 MATIC in wei as a string
        });
      }}
      onTransactionSent={() =>
        toast.loading("Making offer...", {
          id: "offer",
          style: toastStyle,
          position: "bottom-center",
        })
      }
      onTransactionConfirmed={() => {
        toast.success("Offer made!", {
          id: "offer",
          style: toastStyle,
          position: "bottom-center",
        });
        revalidatePath("/");
      }}
      onError={() =>
        toast.error("Offer failed!", {
          id: "offer",
          style: toastStyle,
          position: "bottom-center",
        })
      }
    >
      Make Offer
    </TransactionButton>
  );
}
