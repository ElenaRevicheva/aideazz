// app/buy/page.tsx

import { Suspense } from "react";
import { NFTGridLoading } from "@/components/NFT/NFTGrid";
import ListingGrid from "@/components/ListingGrid/ListingGrid";

// ✅ Import MARKETPLACE and NFT_COLLECTION using correct alias
import { MARKETPLACE, NFT_COLLECTION } from "@/consts/contracts";

export default function Buy() {
  return (
    <Suspense fallback={<NFTGridLoading />}>
      <ListingGrid
        marketplace={MARKETPLACE}
        collection={NFT_COLLECTION}
        emptyText={
          "Looks like there are no listed NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />
    </Suspense>
  );
}
