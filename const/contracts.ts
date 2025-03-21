import { polygon } from "./chains";
import { client } from "../lib/client";

// 🛒 Your deployed marketplace contract on Polygon
export const MARKETPLACE = {
  address: "0xC9988B2616b92D4577d5C15D29eC87421b3E1AE5",
  chain: polygon,
  client,
};

// 🎨 Dummy NFT collection (replace with actual collection if you have one)
export const NFT_COLLECTION = {
  address: "0x0000000000000000000000000000000000000000", // ← Update this once you deploy an NFT Collection contract for your agent
  chain: polygon,
  client,
};

// 🌐 Network & explorer config
export const NETWORK = polygon;
export const ETHERSCAN_URL = "https://polygonscan.com";
