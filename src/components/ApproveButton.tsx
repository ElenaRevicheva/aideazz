"use client";

import { TransactionButton, useActiveAccount } from "@thirdweb-dev/react";
import { NFT_COLLECTION } from "@/consts/contracts";
import toastStyle from "@/util/toastConfig";
import toast from "react-hot-toast";

export default function ApproveButton({ tokenId }: { tokenId: string }) {
  const account = useActiveAccount();

  return (
    <TransactionButton
      contract={NFT_COLLECTION}
      action={(contract) => contract.erc721.setApprovalForAll(account?.address || "", true)}
      onTransactionSent={() => {
        toast.loading("Approving NFT...", {
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={() => {
        toast.success("Approved NFT successfully!", {
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onError={() => {
        toast.error("Approval failed", {
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
      Approve
    </TransactionButton>
  );
}
