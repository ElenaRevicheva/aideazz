"use client";

import {
  useActiveWallet,
  useContract,
} from "@thirdweb-dev/react";
import { NFT_COLLECTION } from "@/consts/contracts";
import { client, polygon } from "@/lib/client";

export default function AuctionListingButton() {
  const wallet = useActiveWallet();
  const { contract } = useContract(NFT_COLLECTION, { client, chain: polygon });

  const handleClick = async () => {
    if (!wallet || !contract) return;

    try {
      const txResult = await contract.auction.createListing({
        assetContractAddress: NFT_COLLECTION,
        buyoutPricePerToken: "0.01",
        currencyContractAddress: "0x0000000000000000000000000000000000000000",
        listingDurationInSeconds: 86400,
        quantity: 1,
        startTimestamp: new Date(),
      });

      console.log("Auction created:", txResult);
    } catch (err) {
      console.error("Error creating auction:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
    >
      Create Auction
    </button>
  );
}
