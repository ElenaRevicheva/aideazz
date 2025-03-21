import { polygon } from "./chains";

// Your real deployed marketplace contract on Polygon
export const MARKETPLACE_CONTRACTS = [
  {
    address: "0xC9988B2616b92D4577d5C15D29eC87421b3E1AE5",
    chain: polygon,
  },
];

// 🧪 Temporary dummy values to prevent build errors on Fleek
export const MARKETPLACE = "0x0000000000000000000000000000000000000000";
export const NFT_COLLECTION = "0x0000000000000000000000000000000000000000";
export const NETWORK = polygon;
export const ETHERSCAN_URL = "https://polygonscan.com";
