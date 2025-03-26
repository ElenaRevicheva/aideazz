"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
// Removed: approveERC721Transfer (doesn't exist)
import { NFT_COLLECTION, MARKETPLACE } from "@/consts/contracts";
// 🔥 Removed broken import: `NFT` from "thirdweb/sdk"
import toastStyle from "@/util/toastConfig";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

type NFT = {
  id: string;
  // You can expand this if needed later
};

export default function ApproveButton({ nft }: { nft: NFT }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      transaction={() => {
        if (!account) throw new Error("No connected wallet");

        // Placeholder while waiting for SDK approval method
        throw new Error("Approval not implemented");
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
      onError={() => {
        toast.error("Approval not available", {
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
