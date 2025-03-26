import { TransactionButton } from "thirdweb/react";
import { setApprovalForAll } from "thirdweb/extensions/erc721";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from '@/consts/contracts';;
=======
import { NFT_COLLECTION, MARKETPLACE } from "@/consts/contracts
";
>>>>>>> ab8af70838e18916f690150eb29d8c5de2aff935
import toastStyle from "@/util/toastConfig";

export default function ApprovalButton() {
  return (
    <TransactionButton
      transaction={() => {
        return setApprovalForAll({
          contract: NFT_COLLECTION,
          operator: MARKETPLACE_ADDRESS,
          approved: true,
        });
      }}
      onTransactionSent={() => {
        toast.loading("Approving...", {
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onError={(error) => {
        toast(`Approval Failed!`, {
          icon: "❌",
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={(txResult) => {
        toast("Approval successful.", {
          icon: "👍",
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
