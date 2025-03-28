"use client";

import {
  useActiveWallet,
  useContract,
  useNFTs,
} from "@thirdweb-dev/react";
import { polygon, client } from "@/lib/client";
import { NFT_COLLECTION } from "@/consts/contracts";

export default function ApproveButton() {
  const account = useActiveWallet();
  const { contract } = useContract(NFT_COLLECTION, { client, chain: polygon });
  const { data: nfts, isLoading } = useNFTs(contract);

  const handleClick = async () => {
    if (!account || !contract) return;
    // Example logic for approval action:
    console.log(`Account ${account.address} wants to approve something...`);
    // Add contract interaction here if needed
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Approve
    </button>
  );
}
