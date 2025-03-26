import {
  getAllValidAuctions,
  getAllValidListings,
} from "thirdweb/extensions/marketplace";
import { NFT as NFTType, ThirdwebContract } from "thirdweb";
import React, { Suspense } from "react";
<<<<<<< HEAD
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from '@/consts/contracts';;
=======
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts
";
>>>>>>> ab8af70838e18916f690150eb29d8c5de2aff935
import NFTGrid, { NFTGridLoading } from "../NFT/NFTGrid";

type Props = {
	marketplace: ThirdwebContract;
	collection: ThirdwebContract;
	overrideOnclickBehavior?: (nft: NFTType) => void;
	emptyText: string;
};

export default async function ListingGrid(props: Props) {
  const listingsPromise = getAllValidListings({
    contract: MARKETPLACE,
  });
  const auctionsPromise = getAllValidAuctions({
    contract: MARKETPLACE,
  });

  const [listings, auctions] = await Promise.all([
    listingsPromise,
    auctionsPromise,
  ]);

  // Retrieve all NFTs from the listings
  const tokenIds = Array.from(
    new Set([
      ...listings
        .filter(
          (l) => l.assetContractAddress === NFT_COLLECTION_ADDRESS
        )
        .map((l) => l.tokenId),
      ...auctions
        .filter(
          (a) => a.assetContractAddress === NFT_COLLECTION_ADDRESS
        )
        .map((a) => a.tokenId),
    ])
  );

  const nftData = tokenIds.map((tokenId) => {
    return {
      tokenId: tokenId,
      directListing: listings.find(
        (listing) => listing.tokenId === tokenId
      ),
      auctionListing: auctions.find(
        (listing) => listing.tokenId === tokenId
      ),
    };
  });

  return (
    <Suspense fallback={<NFTGridLoading />}>
      <NFTGrid
        nftData={nftData}
        emptyText={props.emptyText}
        overrideOnclickBehavior={props.overrideOnclickBehavior}
      />
    </Suspense>
  );
}
