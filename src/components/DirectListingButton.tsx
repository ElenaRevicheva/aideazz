"use client";
import { useRouter } from "next/navigation";
import { NFT as NFTType } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { createListing } from "thirdweb/extensions/marketplace";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from '@/consts/contracts';;
=======
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts
";
>>>>>>> ab8af70838e18916f690150eb29d8c5de2aff935
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

export default function DirectListingButton({
	nft,
	pricePerToken,
}: {
	nft: NFTType;
	pricePerToken: string;
}) {
	const router = useRouter();
	return (
		<TransactionButton
			transaction={() => {
				return createListing({
					contract: MARKETPLACE,
					assetContractAddress: NFT_COLLECTION_ADDRESS,
					tokenId: nft.id,
					pricePerToken,
				});
			}}
			onTransactionSent={() => {
				toast.loading("Listing...", {
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onError={(error) => {
				toast(`Listing Failed!`, {
					icon: "❌",
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onTransactionConfirmed={(txResult) => {
				toast("Listed Successfully!", {
					icon: "🥳",
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
				router.push(
					`/token/${NFT_COLLECTION_ADDRESS}/${nft.id.toString()}`
				);
			}}
		>
			List for Sale
		</TransactionButton>
	);
}
