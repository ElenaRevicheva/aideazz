"use client";

import {
  useActiveWallet,
  useContract,
} from "@thirdweb-dev/react";
import { MARKETPLACE } from "@/consts/contracts";
import { client, polygon } from "@/lib/client";

interface Props {
  listingId: string;
}

export default function BuyListingButton({ listingId }: Props) {
  const wallet = useActiveWallet();
  const { contract: marketplace } = useContract(MARKETPLACE, {
    client,
    chain: polygon,
  });

  const handleBuy = async () => {
    if (!wallet || !marketplace) return;

    try {
      const txResult = await marketplace.directListings.buyFromListing({
        listingId,
        quantity: 1,
        buyer: wallet.address,
      });

      console.log("Purchase successful:", txResult);
    } catch (err) {
      console.error("Buy failed:", err);
    }
  };

  return (
    <button
      onClick={handleBuy}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Buy Now
    </button>
  );
}
