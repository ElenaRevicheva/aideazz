"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { approveERC721Transfer } from "thirdweb/extensions/marketplace";
import { NFT_COLLECTION, MARKETPLACE } from "@/consts/contracts";
import { NFT } from "thirdweb/sdk";
import toastStyle from "@/util/toastConfig";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

export default function ApproveButton({ nft }: { nft: NFT }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      transaction={() => {
        if (!account) throw new Error("No connected wallet");
        return approveERC721Transfer({
          contract: NFT_COLLECTION,
          operator: MARKETPLACE.address,
          tokenId: nft.id,
        });
      }}
      onTransactionSent={() => {
        toast.loading("Approving transfer...", {
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={() => {
        toast.success("Transfer approved!", {
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onError={(error) => {
        toast.error("Approval failed", {
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
      Approve Transfer
    </TransactionButton>
  );
}
