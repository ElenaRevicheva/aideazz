"use client";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import {
	DirectListing,
	EnglishAuction,
	buyFromListing,
	buyoutAuction,
} from "thirdweb/extensions/marketplace";
<<<<<<< HEAD
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from '@/consts/contracts';;
=======
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts
";
>>>>>>> ab8af70838e18916f690150eb29d8c5de2aff935
import toastStyle from "@/util/toastConfig";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

export default function BuyListingButton({
	auctionListing,
	directListing,
}: {
	auctionListing?: EnglishAuction;
	directListing?: DirectListing;
}) {
	const account = useActiveAccount();
	return (
		<TransactionButton
			disabled={
				account?.address === auctionListing?.creatorAddress ||
				account?.address === directListing?.creatorAddress ||
				(!directListing && !auctionListing)
			}
			transaction={() => {
				if (!account) throw new Error("No account");
				if (auctionListing) {
					return buyoutAuction({
						contract: MARKETPLACE,
						auctionId: auctionListing.id,
					});
				} else if (directListing) {
					return buyFromListing({
						contract: MARKETPLACE,
						listingId: directListing.id,
						recipient: account.address,
						quantity: BigInt(1),
					});
				} else {
					throw new Error("No valid listing found for this NFT");
				}
			}}
			onTransactionSent={() => {
				toast.loading("Purchasing...", {
					id: "buy",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onError={(error) => {
				toast(`Purchase Failed!`, {
					icon: "❌",
					id: "buy",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onTransactionConfirmed={(txResult) => {
				toast("Purchased Successfully!", {
					icon: "🥳",
					id: "buy",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
		>
			Buy Now
		</TransactionButton>
	);
}
