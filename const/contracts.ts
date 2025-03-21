import { polygon } from "./chains";

// Define your MarketplaceV3 contract
export const MARKETPLACE_CONTRACTS = [
  {
    address: "0xC9988B2616b92D4577d5C15D29eC87421b3E1AE5",
    chain: polygon,
  },
];

// Corrected format for Thirdweb SDK usage
export const MARKETPLACE = {
  address: "0xC9988B2616b92D4577d5C15D29eC87421b3E1AE5",
  chain: polygon,
};

// If you don't have an NFT contract deployed yet, use a placeholder
export const NFT_COLLECTION = {
  address: "0x0000000000000000000000000000000000000000", // Replace later
  chain: polygon,
};

export const NETWORK = polygon;
export const ETHERSCAN_URL = "https://polygonscan.com";
