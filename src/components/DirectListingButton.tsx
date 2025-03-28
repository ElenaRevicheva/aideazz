"use client";

import {
  useActiveWallet,
  useContract,
} from "@thirdweb-dev/react";
import { NFT_COLLECTION } from "@/consts/contracts";
import { client, polygon } from "@/lib/client";

export default function DirectListingButton() {
  const wallet = useActiveWallet();
  const { contract } = useContract(NFT_COLLECTION, { client, chain: polygon });

  const handleClick = async () => {
    if (!wallet || !contract) return;

    try {
      const txResult = await contract.direct.createListing({
        assetContractAddress: NFT_COLLECTION,
        buyoutPricePerToken: "0.01",
        currencyContractAddress: "0x0000000000000000000000000000000000000000",
        listingDurationInSeconds: 86400,
        quantity: 1,
        startTimestamp: new Date(),
      });

      console.log("Direct listing created:", txResult);
    } catch (err) {
      console.error("Error creating listing:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Create Direct Listing
    </button>
  );
}
