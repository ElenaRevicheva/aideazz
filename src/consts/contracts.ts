import { polygon } from "thirdweb/chains";
import client from "../lib/client";

// 🎨 NFT Collection config
export const NFT_COLLECTION = {
  address: "0x0000000000000000000000000000000000000000" as `0x${string}`, // ✅ Replace with your real contract
  chain: polygon,
  client,
};

// 🛒 Marketplace config
export const MARKETPLACE = {
  address: "0xC9988B2616b92D4577d5C15D29eC87421b3E1AE5" as `0x${string}`,
  chain: polygon,
  client,
};

// 🌐 Network info
export const NETWORK = polygon;
export const ETHERSCAN_URL = "https://polygonscan.com";
