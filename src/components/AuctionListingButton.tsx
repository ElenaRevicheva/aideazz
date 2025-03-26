"use client";
import { NFT as NFTType } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { createAuction } from "thirdweb/extensions/marketplace";
<<<<<<< HEAD
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from '@/consts/contracts';;
=======
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts
";
>>>>>>> ab8af70838e18916f690150eb29d8c5de2aff935
import toastStyle from "@/util/toastConfig";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

export default function AuctionListingButton({
	nft,
	minimumBidAmount,
	buyoutBidAmount,
}: {
	nft: NFTType;
	minimumBidAmount: string;
	buyoutBidAmount: string;
}) {
	const router = useRouter();
	return (
		<TransactionButton
			transaction={() => {
				return createAuction({
					contract: MARKETPLACE,
					assetContractAddress: NFT_COLLECTION_ADDRESS,
					tokenId: nft.id,
					minimumBidAmount,
					buyoutBidAmount,
				});
			}}
			onTransactionSent={() => {
				toast.loading("Listing...", {
					id: "auction",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onError={(error) => {
				toast(`Listing Failed!`, {
					icon: "❌",
					id: "auction",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onTransactionConfirmed={(txResult) => {
				toast("Listed Successfully!", {
					icon: "🥳",
					id: "auction",
					style: toastStyle,
					position: "bottom-center",
				});
				router.push(
					`/token/${NFT_COLLECTION_ADDRESS}/${nft.id.toString()}`
				);
			}}
		>
			List for Auction
		</TransactionButton>
	);
}
