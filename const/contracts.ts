
import { contract } from "thirdweb";
import { polygon } from "./chains";
import { client } from "../lib/client";

// 🛒 Marketplace contract deployed on Polygon
export const MARKETPLACE = contract({
  address: "0xC9988B2616b92D4577d5C15D29eC87421b3E1AE5",
  chain: polygon,
  client,
});

// 🎨 NFT Collection for AI Agents (can be updated later)
export const NFT_COLLECTION = contract({
  address: "0x0000000000000000000000000000000000000000",
  chain: polygon,
  client,
});

// 🌐 Network & Explorer
export const NETWORK = polygon;
export const ETHERSCAN_URL = "https://polygonscan.com";
