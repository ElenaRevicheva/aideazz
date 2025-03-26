"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
// ❌ Removed broken import: approveERC721Transfer
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

        // ❗ Placeholder until approve function is available in SDK
        throw new Error("Approval function not implemented in SDK.");
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
