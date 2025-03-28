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

export default function MakeOfferButton({ listingId }: Props) {
  const wallet = useActiveWallet();
  const { contract: marketplace } = useContract(MARKETPLACE, {
    client,
    chain: polygon,
  });

  const handleClick = async () => {
    if (!wallet || !marketplace) return;

    try {
      const txResult = await marketplace.directListings.makeOffer({
        listingId,
        quantityDesired: 1,
        pricePerToken: "0.009",
        currencyAddress: "0x0000000000000000000000000000000000000000",
      });

      console.log("Offer made:", txResult);
    } catch (err) {
      console.error("Error making offer:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
    >
      Make Offer
    </button>
  );
}
