import { Wallet } from "ethers";

const wallet = Wallet.createRandom();

console.log("🔐 AVALANCHE_PRIVATE_KEY:", wallet.privateKey);
console.log("📬 AVALANCHE_PUBLIC_ADDRESS:", wallet.address);
