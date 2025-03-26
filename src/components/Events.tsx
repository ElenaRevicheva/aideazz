"use client";
import { useContractEvents } from "thirdweb/react";
import { transferEvent } from "thirdweb/extensions/erc721";
<<<<<<< HEAD
import { ETHERSCAN_URL, NFT_COLLECTION } from "@/consts/contracts";
=======
import { ETHERSCAN_URL, NFT_COLLECTION } from "@/consts/contracts
";
>>>>>>> ab8af70838e18916f690150eb29d8c5de2aff935
import Link from "next/link";

export default function Events({ tokenId }: { tokenId: bigint }) {
  const { data: transferEvents } = useContractEvents({
    contract: NFT_COLLECTION,
    events: [transferEvent({ tokenId })],
  });

  return (
    <div className="flex flex-col flex-wrap gap-4 mt-3 divide-y">
      {transferEvents?.map((event, index) => (
        <div
          key={event.transactionHash}
          className="flex justify-between items-center flex-1 gap-1 border-white/20 py-2 min-w-[128px] min-h-[32px]"
        >
          <div className="flex flex-col gap-1">
            <p className="text-white/60">Event</p>
            <p className="font-semibold text-white">Transfer</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-white/60">From</p>
            <p className="font-semibold text-white">
              {event.args.from.slice(0, 4)}
							...
              {event.args.from.slice(-2)}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-white/60">To</p>
            <p className="font-semibold text-white">
              {event.args.to.slice(0, 4)}
							...
              {event.args.to.slice(-2)}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              className="w-6 h-6 p-2"
              href={`${ETHERSCAN_URL}/tx/${event.transactionHash}`}
              target="_blank"
            >
							↗
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
