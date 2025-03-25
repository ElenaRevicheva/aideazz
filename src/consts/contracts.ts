import { polygon } from "./chains";
import client from "../lib/client"; // ✅ default import

// 🛒 Marketplace contract config
export const MARKETPLACE = {
  address: "0xC9988B2616b92D4577d5C15D29eC87421b3E1AE5",
  chain: polygon,
  client,
};

// 🎨 Dummy NFT collection config (replace with your real one later)
export const NFT_COLLECTION = {
  address: "0x0000000000000000000000000000000000000000",
  chain: polygon,
  client,
};

// 🌐 Chain + Explorer
export const NETWORK = polygon;
export const ETHERSCAN_URL = "https://polygonscan.com";
